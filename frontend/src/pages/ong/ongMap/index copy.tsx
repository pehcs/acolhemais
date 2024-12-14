import 'leaflet/dist/leaflet.css';
import createMap  from '../../../components/map/map.tsx';
import getUserLocation from '../../../components/map/geolocation.tsx';
import React, { useEffect } from 'react';

export default function OngMap() {

  // uxar a localização atual
  useEffect(() => {
    const fetchLocation = async () => {
        const [latitude, longitude] = await getUserLocation();
    };

    fetchLocation();
  }, []);

  const Map = createMap({ lat: latitude, lng: longitude });

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
        style={{
          width: '80%',
          height: '25vh',
          borderRadius: '1vh',
          border: '2px solid #AFB1B6',
        }}
      >
        <Map></Map>
      </div>

      <div>
        <button>pular</button>
        <button>continuar</button>
      </div>
      
    </div>
  );
}
