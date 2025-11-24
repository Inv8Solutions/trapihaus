"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationPickerProps {
	onLocationSelect: (lat: number, lng: number) => void;
	initialLat?: number;
	initialLng?: number;
}

function LocationMarker({ onLocationSelect, initialLat, initialLng }: LocationPickerProps) {
	const [position, setPosition] = useState<L.LatLng | null>(
		initialLat && initialLng ? L.latLng(initialLat, initialLng) : null
	);

	const map = useMapEvents({
		click(e) {
			setPosition(e.latlng);
			onLocationSelect(e.latlng.lat, e.latlng.lng);
		},
	});

	useEffect(() => {
		if (initialLat && initialLng && !position) {
			const initialPosition = L.latLng(initialLat, initialLng);
			setPosition(initialPosition);
			map.setView(initialPosition, map.getZoom());
		}
	}, [initialLat, initialLng, map, position]);

	return position === null ? null : <Marker position={position} />;
}

export default function LocationPicker({ onLocationSelect, initialLat = 16.4023, initialLng = 120.596 }: LocationPickerProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
				<div className="text-gray-500 font-lexend">Loading map...</div>
			</div>
		);
	}

	return (
		<div className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
			<MapContainer
				center={[initialLat, initialLng]}
				zoom={13}
				style={{ height: "100%", width: "100%" }}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LocationMarker
					onLocationSelect={onLocationSelect}
					initialLat={initialLat}
					initialLng={initialLng}
				/>
			</MapContainer>
		</div>
	);
}
