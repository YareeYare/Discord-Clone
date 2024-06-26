import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { currentProfile } from "@/lib/current-profile"
import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
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
			<div className="flex-1 h-screen">Future Messages</div>
			<ChatInput
				name={channel.name}
				type="channel"
				apiUrl="/api/socket/messages"
				query={{
					channelId: params.channelId,
					serverId: params.serverId
				}}
			/>
		</div>
	)
}

export default ChannelIdPage
