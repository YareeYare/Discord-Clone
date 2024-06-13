import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from '@clerk/nextjs/server';

const f = createUploadthing();
 
const handleAuth = () => {
	const { userId } = auth();
	if( !userId ) throw new Error("Unauthorized")
	return { userId: userId }
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		// Set permissions and file types for this FileRoute
		.middleware(() => {
			return handleAuth();
			// This code runs on your server before upload
			// const user = await auth(req);
 
			// If you throw, the user will not be able to upload
			// if (!user) throw new UploadThingError("Unauthorized");
 
			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			// return { userId: user.id };
		})
		.onUploadComplete(() => {
			// This code RUNS ON YOUR SERVER after upload
			// console.log("Upload complete for userId:", metadata.userId);
 
			// console.log("file url", file.url);
 
			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			// return { uploadedBy: metadata.userId };
		}),

	messageFile: f(["image", "pdf", "video", "audio"])
		.middleware(() => handleAuth())
		.onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;