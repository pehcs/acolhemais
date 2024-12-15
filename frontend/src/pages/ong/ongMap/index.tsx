import 'leaflet/dist/leaflet.css';
import Map  from './map/map.tsx';
import getUserLocation from './map/geolocation.tsx';
import { useEffect, useState } from 'react';

type Point = {
  latitude: number;
  longitude: number;
}

export default function OngMap() {

  const [point, setPoint] = useState<Point>({ latitude: 0, longitude: 0 });


  useEffect(() => {
    (async () => {
      const [latitude, longitude] = await getUserLocation();
      setPoint({ latitude, longitude });
    })();
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
        style={{
          width: '80%',
          height: '25vh',
          borderRadius: '1vh',
          border: '2px solid #AFB1B6',
        }}
      >
         <Map latitude={point.latitude} longitude={point.longitude} />
      </div>

      <div>
        <button>pular</button>
        <button>continuar</button>
      </div>
      
    </div>
  );
}
