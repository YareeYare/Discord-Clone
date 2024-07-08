
import qs from "query-string"

import { useSocket } from "@/components/providers/socket-provider"
import { useInfiniteQuery } from "@tanstack/react-query"

interface ChatQueryProps {
	queryKey: string
	apiUrl: string
	paramKey: "channelId" | "conversationId"
	paramValue: string
}

export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }: ChatQueryProps) => {
	const { isConnected } = useSocket()

	// pageParam is our cursor for infinite loading, i will modify my api for that
	const fetchMessages = async ({ pageParam = undefined }) => {
		const url = qs.stringifyUrl({
			url: apiUrl,
			query: {
				cursor: pageParam,
				[paramKey]: paramValue
				// [] is an object literal
				// By using [paramKey]: paramValue, you're creating a dynamic key-value pair in the 
				// object. If paramKey is "channelId", it will create { channelId: paramValue }. If it's 
				// "conversationId", it will create { conversationId: paramValue }.
			}
		}, { skipNull: true }) // ensures that any null values in the query object are skipped.

		const res = await fetch(url)
		return res.json()
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		queryKey: [queryKey],
		queryFn: fetchMessages, // query Function
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage?.nextCursor,
		refetchInterval: isConnected ? false : 1000,
		// used to control how often the query should automatically refetch data. BUT since we have socket.io, we can make it conditional.
		// The purpose of this setup is to implement a polling mechanism when the connection is not established.
		// When there's no connection, the query will keep trying to fetch data every second.
		// Once a connection is established, it stops the automatic refetching.
	})

	return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status }

}