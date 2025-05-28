import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapaLeaflet({
  onUbicacionConfirmada,
}: {
  onUbicacionConfirmada: (coords: { lat: number; lng: number }) => void;
}) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const ubicacion = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(ubicacion);
        onUbicacionConfirmada(ubicacion);
      },
      () => {
        alert("Debes permitir acceso a la ubicación para firmar asistencia.");
      }
    );
  }, [onUbicacionConfirmada]);

  if (!coords) {
    return <p className="text-center mt-4">Obteniendo ubicación...</p>;
  }

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  return (
    <div className="w-full h-[300px] rounded border overflow-hidden">
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={18}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lng]} icon={markerIcon}>
          <Popup>Tu ubicación</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
