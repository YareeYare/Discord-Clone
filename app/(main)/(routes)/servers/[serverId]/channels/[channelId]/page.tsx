import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessages } from "@/components/chat/chat-messages"
import { MediaRooms } from "@/components/media-room"
import { currentProfile } from "@/lib/current-profile"
import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { ChannelType } from "@prisma/client"
import { redirect } from "next/navigation"

interface ChannelIdPageProps {
	params: {
		serverId: string
		channelId: string
	}
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {

	const profile = await currentProfile()

	if( !profile ) {
		return auth().redirectToSignIn()
	}

	const channel = await db.channel.findUnique({
		where: {
			id: params.channelId
		}
	})

	const member = await db.member.findFirst({
		where: {
			serverId: params.serverId,
			profileId: profile.id
		}
	})

	if( !channel || !member ) {
		redirect('/')
	}

	return (
		<div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
			<ChatHeader
				name={channel.name}
				serverId={channel.serverId}
				type="channel"
			/>
			{channel.type === ChannelType.TEXT&& (
				<>
					<ChatMessages
						member={member}
						name={channel.name}
						chatId={channel.id}
						type="channel"
						apiUrl="/api/messages" // This is where we fetch our messages from.
						socketUrl="/api/socket/messages" // This is where we are triggering new messages.
						socketQuery={{
							channelId: channel.id,
							serverId: channel.serverId
						}}
						paramKey="channelId"
						paramValue={channel.id}
					/>

					<ChatInput
						name={channel.name}
						type="channel"
						apiUrl="/api/socket/messages"
						query={{
							channelId: params.channelId,
							serverId: params.serverId
						}}
					/>
				</>
			)}

			{channel.type === ChannelType.AUDIO && (
				<MediaRooms
					chatId={channel.id}
					video={false}
					audio={true}
				/>
			)}

			{channel.type === ChannelType.VIDEO && (
				<MediaRooms
					chatId={channel.id}
					video={true}
					audio={true}
				/>
			)}


		</div>
	)
}

export default ChannelIdPage
