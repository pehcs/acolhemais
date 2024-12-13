import 'leaflet/dist/leaflet.css';
import createMap  from '../../../components/map/map.tsx';


export default function OngMap() {
  const Map = createMap({ lat: -8.061533458553534, lng: -34.87065511707905 });

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

      <button type="button">button</button>

    </div>
  );
}
