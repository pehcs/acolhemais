import 'leaflet/dist/leaflet.css';
import Map  from '../../../components/ui/map/map.tsx';
import getUserLocation from '../../../components/ui/map/geolocation.tsx';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import getLatLonFromCep from '../../../components/ui/map/input.tsx'


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

  useEffect(() => {
    const input = document.getElementById('cepInput') as HTMLInputElement;

    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const cep = input.value.trim();
        const location = await getLatLonFromCep(cep);
        if (location) {
          const { lat, lon } = location;
          setPoint({ latitude: lat, longitude: lon });
        } else {
          console.log("Não foi possível obter a localização para o CEP fornecido.");
        }
      }
    };

    input.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      
      <div data-spec="navbar">
        <h1>navbar here</h1>
      </div>

      <h1>Onde a ONG se localiza?</h1>

      <img 
        src="/images/img-6.svg" 
        alt="Menina procurando algo com uma lupa."
        style={{ 
        width: "26vh",
        }} 
      />
      
      <Input type="text" id="cepInput" placeholder="Digite o CEP e pressione Enter"/>

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
        <Button>pular</Button>
        <Button>continuar</Button>
      </div>
      
    </div>
  );
}
