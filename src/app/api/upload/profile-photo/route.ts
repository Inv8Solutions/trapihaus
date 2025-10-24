import { NextRequest, NextResponse } from "next/server";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseApp } from "@/lib/auth/firebaseClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side file upload endpoint
 * Bypasses CORS issues by handling upload on the server
 */
export async function POST(request: NextRequest) {
	try {
		// Parse form data
		const formData = await request.formData();
		const file = formData.get("file") as File;
		const userId = formData.get("userId") as string;

		// Validate inputs
		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		if (!userId) {
			return NextResponse.json({ error: "No userId provided" }, { status: 400 });
		}

		// Validate file type
		if (!file.type.startsWith("image/")) {
			return NextResponse.json({ error: "File must be an image" }, { status: 400 });
		}

		// Validate file size (2MB)
		const maxSize = 2 * 1024 * 1024;
		if (file.size > maxSize) {
			return NextResponse.json({ error: "Image must be less than 2MB" }, { status: 400 });
		}

		// Convert File to ArrayBuffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);

		// Upload to Firebase Storage
		const storage = getStorage(getFirebaseApp());
		const timestamp = Date.now();
		const fileExtension = file.name.split(".").pop();
		const filename = `profile-${timestamp}.${fileExtension}`;
		const storageRef = ref(storage, `users/${userId}/profile/${filename}`);

		await uploadBytes(storageRef, buffer, {
			contentType: file.type,
			customMetadata: {
				uploadedAt: new Date().toISOString(),
			},
		});

		// Get download URL
		const downloadURL = await getDownloadURL(storageRef);

		return NextResponse.json({
			success: true,
			url: downloadURL,
			filename,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ error: "Failed to upload file", details: error instanceof Error ? error.message : String(error) },
			{ status: 500 }
		);
	}
}
