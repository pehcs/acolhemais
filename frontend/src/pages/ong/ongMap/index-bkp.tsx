import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function OngMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Inicializa o mapa
      const map = L.map(mapRef.current).setView([-8.061533458553534, -34.87065511707905], 13);


      // Adiciona o tile layer (OpenStreetMap neste caso)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors',
      }).addTo(map);

      // Cleanup do mapa ao desmontar o componente
      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div>
      
      <div data-spec="navbar">
        <h1>navbar here</h1>
      </div>

      <h1>Onde você vive?</h1>

      <img 
        src="/images/img-6.svg" 
        alt="Menina procurando algo com uma lupa."
        style={{ 
        width: "26vh",
        }} 
      />

      <p>Endereço ou CEP</p>
      
      <input type="text" />

      <div
        ref={mapRef}
        style={{
          width: '80%',
          height: '25vh',
          borderRadius: '1vh',
          border: '2px solid #AFB1B6',
        }}
      />

      <button type="button">button</button>

    </div>
  );
}
