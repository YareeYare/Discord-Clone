"use client"

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css"
import Image from "next/image";
import { X } from "lucide-react";

interface FileUploadProps {
	onChange: (url?: string) => void;
	value: string;
	endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
	onChange,
	value,
	endpoint
}: FileUploadProps ) => {

	const fileType = value?.split(".").pop()

	if( value && fileType !== "pdf" ) {
		return (
			<div className="relative h-24 w-24">
				<Image
					src={value}
					alt="Uploaded Image"
					className="rounded-full"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				<button
					onClick={() => onChange("")}
					className="bg-rose-500 text-white p-1  rounded-full absolute top-0 right-0 shadow-lg"
					
				>
					<X className="h-4 w-4"/>
				</button>
			</div>
		)
	}

	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].url)
			}}
			onUploadError={(error: Error) => {
				console.log(error)
			}}
		/>
	)
}