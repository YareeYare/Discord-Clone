import { Server as NetServer } from "http"
import { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"

import { NextApiResponseServerIo } from "@/types"

export const config = {
	api: {
		bodyParser: false
	}
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
	if( !res.socket.server.io ) {
		const path = "/api/socket/io"
		const httpServer: NetServer = res.socket.server as any
		try{
			const io = new ServerIO(httpServer, {
				path: path,
				addTrailingSlash: false
			})
			res.socket.server.io = io
		} catch ( error ) {
			console.log("Socket.IO initialization error:", error);
		}

	}

	res.end()
}

export default ioHandler