"use client";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

type Props = {
  coords: [number, number];
};

export default function CityMap({ coords }: Props) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current!,
      style: `https://api.maptiler.com/maps/toner-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
      center: coords,
      zoom: 11,
      attributionControl: false,
    });

    const el = document.createElement("div");
    el.className = "w-12 h-12 bg-[#722F37] rounded-full border-2 border-white ";

    new maplibregl.Marker({ element: el }).setLngLat(coords).addTo(map);

    return () => map.remove();
  }, [coords]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
