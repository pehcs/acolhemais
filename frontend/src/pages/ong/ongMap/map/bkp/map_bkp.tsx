import { useRef, useEffect } from 'react';
import L from 'leaflet';

interface MapProps {
  lat: number;
  lng: number;
}

const createMap = ({ lat, lng }: MapProps) => {
  return () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (mapRef.current) {
        const map = L.map(mapRef.current).setView([lat, lng], 50);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        }).addTo(map);

        return () => {
          map.remove();
        };
      }
    }, [lat, lng]);

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
  };
};

export default createMap;
