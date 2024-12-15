import L from 'leaflet';

export const addMarkerOnClick = (map: L.Map, latitude: number, longitude: number) => {
  let marker: L.Marker | null = null;

  marker = L.marker([latitude, longitude]).addTo(map);
  map.on('click', (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;    
        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map); // Cria um novo marcador   
        }
    });
};
