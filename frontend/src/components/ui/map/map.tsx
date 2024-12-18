import L from 'leaflet';
import { useEffect} from 'react';
import { addMarkerOnClick } from './marker';

type MapProps = {
  latitude: number;
  longitude: number;
};

function Map({ latitude, longitude }: MapProps) {
  useEffect(() => { 
    const map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    addMarkerOnClick(map, latitude, longitude);

    return () => {
      map.remove(); 
    };
  }, [latitude, longitude]);

  return <div id="map" className="h-full w-full" />;
}

export default Map;