"use client";

import { useEffect, useRef } from "react";

interface PropertyMapProps {
	latitude: number;
	longitude: number;
	propertyName: string;
}

export default function PropertyMap({ latitude, longitude, propertyName }: PropertyMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);

	useEffect(() => {
		// Only run on client side
		if (typeof window === "undefined" || !mapRef.current) return;

		// Dynamically import Leaflet to avoid SSR issues
		import("leaflet").then((L) => {
			// Clean up existing map instance
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
			}

			// Ensure mapRef.current is not null
			if (!mapRef.current) return;

			// Create the map
			const map = L.map(mapRef.current, {
				center: [latitude, longitude],
				zoom: 15,
				scrollWheelZoom: false,
				dragging: true,
				zoomControl: true,
			});

			mapInstanceRef.current = map;

			// Add OpenStreetMap tiles
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				maxZoom: 19,
			}).addTo(map);

			// Create custom marker icon
			const defaultIcon = L.icon({
				iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
				iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
				shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41],
			});

			// Add marker at the property location
			L.marker([latitude, longitude], { icon: defaultIcon })
				.addTo(map)
				.bindPopup(`<strong>${propertyName}</strong>`)
				.openPopup();

			// Clean up on unmount
			return () => {
				if (mapInstanceRef.current) {
					mapInstanceRef.current.remove();
					mapInstanceRef.current = null;
				}
			};
		});
	}, [latitude, longitude, propertyName]);

	return (
		<div 
			ref={mapRef} 
			className="w-full h-[400px] rounded-2xl border border-gray-200 bg-gray-100"
			style={{ zIndex: 0 }}
		/>
	);
}
