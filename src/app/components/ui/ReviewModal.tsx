"use client";

import { useState } from "react";
import { createReview } from "@/lib/services/reviews";

interface ReviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	reservationId: string;
	listingId: string;
	propertyName: string;
	propertyLocation: string;
	userId: string;
	userName: string;
	userEmail: string;
	userAvatar?: string;
	onSuccess: () => void;
}

export default function ReviewModal({
	isOpen,
	onClose,
	reservationId,
	listingId,
	propertyName,
	propertyLocation,
	userId,
	userName,
	userEmail,
	userAvatar,
	onSuccess,
}: ReviewModalProps) {
	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [comment, setComment] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (rating === 0) {
			setError("Please select a rating");
			return;
		}

		if (comment.trim().length < 10) {
			setError("Please write at least 10 characters");
			return;
		}

		try {
			setSubmitting(true);
			setError(null);

			await createReview({
				userId,
				userName,
				userEmail,
				userAvatar,
				listingId,
				reservationId,
				rating,
				comment: comment.trim(),
				propertyName,
				propertyLocation,
			});

			onSuccess();
			onClose();
			setRating(0);
			setComment("");
		} catch (err) {
			console.error("Error submitting review:", err);
			setError(err instanceof Error ? err.message : "Failed to submit review");
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = () => {
		if (!submitting) {
			setRating(0);
			setComment("");
			setError(null);
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
			<div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl">
				{/* Header */}
				<div className="flex items-start justify-between mb-6">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 font-lexend">Leave a Review</h2>
						<p className="text-sm text-gray-600 mt-1">{propertyName}</p>
						<p className="text-xs text-gray-500">{propertyLocation}</p>
					</div>
					<button
						onClick={handleClose}
						disabled={submitting}
						className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					{/* Rating */}
					<div className="mb-6">
						<label className="block text-sm font-semibold text-gray-700 mb-3">
							Your Rating
						</label>
						<div className="flex items-center gap-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									key={star}
									type="button"
									onClick={() => setRating(star)}
									onMouseEnter={() => setHoveredRating(star)}
									onMouseLeave={() => setHoveredRating(0)}
									className="transition-transform hover:scale-110"
								>
									<svg
										className={`w-10 h-10 ${
											star <= (hoveredRating || rating)
												? "text-yellow-400 fill-current"
												: "text-gray-300"
										}`}
										viewBox="0 0 20 20"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								</button>
							))}
							{rating > 0 && (
								<span className="ml-3 text-lg font-semibold text-gray-700">
									{rating} {rating === 1 ? "Star" : "Stars"}
								</span>
							)}
						</div>
					</div>

					{/* Comment */}
					<div className="mb-6">
						<label className="block text-sm font-semibold text-gray-700 mb-2">
							Your Review
						</label>
						<textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Share your experience with this property..."
							rows={5}
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
							disabled={submitting}
						/>
						<p className="text-xs text-gray-500 mt-1">
							{comment.length} characters (minimum 10)
						</p>
					</div>

					{/* Error */}
					{error && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					{/* Actions */}
					<div className="flex gap-3">
						<button
							type="button"
							onClick={handleClose}
							disabled={submitting}
							className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={submitting || rating === 0 || comment.trim().length < 10}
							className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{submitting ? "Submitting..." : "Submit Review"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
