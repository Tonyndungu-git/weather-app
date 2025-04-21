'use client'; // 👈 This ensures the component is rendered on the client side only

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  lat: number;
  lon: number;
}

const Map: React.FC<MapProps> = ({ lat, lon }) => {
  useEffect(() => {
    // Only run if `window` exists
    if (typeof window !== "undefined" && lat !== undefined && lon !== undefined) {
      const map = L.map("map").setView([lat, lon], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();
    }
  }, [lat, lon]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default Map;
