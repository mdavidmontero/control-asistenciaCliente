import { useEffect, useState } from "react";

export default function MapaIframe({
  onUbicacionConfirmada,
}: {
  onUbicacionConfirmada: (coords: { lat: number; lng: number }) => void;
}) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [mapLoaded, setMapLoaded] = useState(false);

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
  }, []);

  const handleLoad = () => setMapLoaded(true);

  if (!coords)
    return <p className="text-center mt-4">Obteniendo ubicación...</p>;

  const mapUrl = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=18&output=embed`;

  return (
    <div className="w-full h-[300px] rounded border overflow-hidden relative">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <span className="text-gray-600">Cargando mapa...</span>
        </div>
      )}
      <iframe
        title="Google Maps"
        width="100%"
        height="100%"
        frameBorder="0"
        src={mapUrl}
        allowFullScreen
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
}
