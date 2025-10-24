import { NextRequest, NextResponse } from "next/server";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseApp } from "@/lib/auth/firebaseClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side listing photo upload endpoint
 * Bypasses CORS issues by handling upload on the server
 */
export async function POST(request: NextRequest) {
	try {
		// Parse form data
		const formData = await request.formData();
		const file = formData.get("file") as File;
		const userId = formData.get("userId") as string;
		const listingId = formData.get("listingId") as string | null;

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

		// Validate file size (5MB for listing photos)
		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			return NextResponse.json({ error: "Image must be less than 5MB" }, { status: 400 });
		}

		// Convert File to ArrayBuffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);

		// Upload to Firebase Storage
		const storage = getStorage(getFirebaseApp());
		const timestamp = Date.now();
		const fileExtension = file.name.split(".").pop();
		const filename = `listing-${timestamp}.${fileExtension}`;
		
		// Store in: listings/{userId}/{filename}
		// Simplified path - no listingId needed for temp uploads
		const storagePath = `listings/${userId}/${filename}`;
		
		const storageRef = ref(storage, storagePath);

		await uploadBytes(storageRef, buffer, {
			contentType: file.type,
			customMetadata: {
				uploadedAt: new Date().toISOString(),
				userId,
				...(listingId && { listingId }),
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
		console.error("Error details:", {
			message: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined,
			name: error instanceof Error ? error.name : undefined,
		});
		return NextResponse.json(
			{ 
				error: "Failed to upload file", 
				details: error instanceof Error ? error.message : String(error),
				...(process.env.NODE_ENV === 'development' && error instanceof Error && { stack: error.stack })
			},
			{ status: 500 }
		);
	}
}
