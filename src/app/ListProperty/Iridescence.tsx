"use client";

import SharedIridescence from "../browse/Iridescence";

interface LocalIridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
}

export default function Iridescence({
  color = [0.06, 0.47, 0.91], // tuned blue-ish default
  speed = 0.9,
  amplitude = 0.09,
  mouseReact = true,
}: LocalIridescenceProps) {
  return (
    <div className="w-full h-full relative overflow-hidden isolate">
      <SharedIridescence color={color} speed={speed} amplitude={amplitude} mouseReact={mouseReact} />
    </div>
  );
}
