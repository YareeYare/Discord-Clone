"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { io as ClientIO, Socket } from "socket.io-client"

type SocketContextType = {
	socket: Socket | null
	isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false
})

export const useSocket = () => {
	return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		let socketInstance: Socket | null = null

		try {
			// Initialize socket
			socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
				path: "/api/socket/io",
				addTrailingSlash: false
			})

			// Event listeners
			socketInstance.on("connect", () => {
				setIsConnected(true)
			})

			socketInstance.on("disconnect", () => {
				setIsConnected(false)
			})

			setSocket(socketInstance)
		} catch (error) {
			console.error("Socket initialization error:", error)
			if (socketInstance) {
				socketInstance.disconnect()
			}
		}

		// Cleanup function
		return () => {
			if (socketInstance) {
				socketInstance.disconnect()
			}
		}

	}, [])

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	)
}