// import { useEffect, useRef } from "react";
// import { MapContainer, Marker, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { useUbicacionStore } from "@/store/ubicacionStore";

// type Props = {
//   onUbicacionConfirmada?: (coords: { lat: number; lng: number }) => void;
// };

// export default function MapaLeaflet({ onUbicacionConfirmada }: Props) {
//   const coords = useUbicacionStore((state) => state.coords);
//   const cargarUbicacion = useUbicacionStore((state) => state.cargarUbicacion);
//   const markerRef = useRef<L.Marker | null>(null);

//   useEffect(() => {
//     if (!coords) {
//       cargarUbicacion();
//     } else {
//       onUbicacionConfirmada?.(coords);
//     }
//   }, [coords, cargarUbicacion, onUbicacionConfirmada]);

//   if (!coords)
//     return <p className="text-center text-gray-500">Cargando mapa...</p>;

//   const icon = L.icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//   });

//   return (
//     <MapContainer
//       center={[coords.lat, coords.lng]}
//       zoom={15}
//       style={{ height: "300px", width: "100%", borderRadius: "12px" }}
//       scrollWheelZoom={false}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />
//       <Marker position={[coords.lat, coords.lng]} icon={icon} ref={markerRef} />
//     </MapContainer>
//   );
// }
