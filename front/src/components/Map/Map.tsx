import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Postavite ikonu markera (opcionalno)
const customMarkerIcon = new L.Icon({
  iconUrl: 'photos/marker.png', // Putanja do ikone markera
  iconSize: [42, 44],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  // Postavite početne koordinate i razinu zumiranja
  const position: [number, number] = [43.8236072, 18.3759143];
  const zoomLevel = 16;

  return (
    <MapContainer
      center={position}
      zoom={zoomLevel}
      style={{
        height: '400px',
        width: '100%',
      }}
    >
      {/* Dodajte ploču sa kartom */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* Dodajte marker na kartu */}
      <Marker position={position} icon={customMarkerIcon}>
        {/* Dodajte iskačući prozor */}
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
