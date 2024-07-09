import { useEffect, useState } from "react";

type ChatScrollProps = {
	chatRef: React.RefObject<HTMLDivElement>
	bottomRef: React.RefObject<HTMLDivElement>
	shouldLoadMore: boolean;
	loadMore: () => void;
	count: number;
}

export const useChatScroll = ({ chatRef, bottomRef, shouldLoadMore, loadMore, count }: ChatScrollProps) => {
	const [hasInitialised, setHasInitialised] = useState(false)

	// Load more messages when user scrolls to the top of the chat
	useEffect(() => {
		const topDiv = chatRef?.current

		const handleScroll = () => {
			const scrollTop = topDiv?.scrollTop

			if( scrollTop === 0 && shouldLoadMore ){
				loadMore()
			}
		}

		topDiv?.addEventListener("scroll", handleScroll)

		return () => {
			topDiv?.removeEventListener("scroll", handleScroll)
		}
	},[shouldLoadMore, loadMore, chatRef])

	// Scroll to the bottom of the chat when the chat is first loaded
	useEffect(() => {
		const bottomDiv = bottomRef?.current
		const topDiv = chatRef?.current

		const shouldAutoScroll  = () => {
			if( !hasInitialised && bottomDiv ) {
				setHasInitialised(true)
				return true
			}

			if( !topDiv ) {
				return false
			}

			const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
			return distanceFromBottom <= 100;
		}

		if( shouldAutoScroll() ){
			setTimeout(() => {
				bottomRef.current?.scrollIntoView({
					behavior: "smooth"
				})
			}, 100)
		}
	},[bottomRef, chatRef, hasInitialised, count])

}