import React, { useRef, useEffect } from 'react';
import L from 'leaflet';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Inicializa o mapa com as coordenadas fornecidas
      const map = L.map(mapRef.current).setView([-8.061533458553534, -34.87065511707905], 13);

      // Adiciona o tile layer (OpenStreetMap neste caso)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(map);

      // Cleanup do mapa ao desmontar o componente
      return () => {
        map.remove();
      };
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default Map;
