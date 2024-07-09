import { NextResponse } from "next/server"
import { DirectMessage } from "@prisma/client"

import { currentProfile } from "@/lib/current-profile"
import db from "@/lib/db"

// MESSAGES_BATCH = How many messages we want to fetch at a time
const MESSAGES_BATCH = 10

export async function GET( req: Request ) {
	try {
		const profile = await currentProfile()

		const { searchParams } = new URL( req.url )

		if( !profile ) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const cursor = searchParams.get("cursor")
		const conversationId = searchParams.get("conversationId")
		
		if( !conversationId ) {
			return new NextResponse("Conversation ID missing", { status: 400 })
		}

		let messages: DirectMessage[] = []

		if( cursor ) {
			messages = await db.directMessage.findMany({
				take: MESSAGES_BATCH,
				skip: 1,
				cursor: { // cursor is builtin in prisma
					id: cursor
				},
				where: {
					conversationId: conversationId
				},
				include: {
					member: {
						include: {
							profile: true
						}
					}
				},
				orderBy: {
					createdAt: "desc"
				}
			})

		} else {
			messages = await db.directMessage.findMany({
				take: MESSAGES_BATCH,
				where: {
					conversationId: conversationId
				},
				include: {
					member: {
						include: {
							profile: true
						}
					}
				},
				orderBy: {
					createdAt: "desc"
				}
			})
		}

		let nextCursor = null
		// if messages.length < MESSAGES_BATCH that means we have reached the end of our messages. that's why nextCursor = null

		if( messages.length === MESSAGES_BATCH ) {
			nextCursor = messages[MESSAGES_BATCH - 1].id
		}

		return NextResponse.json({
			items: messages,
			nextCursor: nextCursor
		})
		
	} catch ( error ) {
		console.log("[DIRECT_MESSAGES_GET]", error)
		return new NextResponse("Internal Error", { status: 500 })
	}
}