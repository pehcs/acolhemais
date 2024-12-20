import L from 'leaflet';
import {useEffect} from 'react';
import useMap from "@/hooks/useMap.tsx";

type MapProps = {
    latitude: number;
    longitude: number;
};

function Map({latitude, longitude}: MapProps) {
    const {updatePoint} = useMap();
    useEffect(() => {
        const map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        let marker: L.Marker | null = null;
        marker = L.marker([latitude, longitude]).addTo(map);
        map.on('click', (e: L.LeafletMouseEvent) => {
            const {lat, lng} = e.latlng;
            updatePoint({latitude: lat, longitude: lng});
            if (marker) {
                marker.setLatLng([lat, lng]);
            } else {
                marker = L.marker([lat, lng]).addTo(map);
            }
            latitude = lat;
            longitude = lng;
        });

        return () => {
            map.remove();
        };
    }, [latitude, longitude, updatePoint]);

    return <div id="map" className="h-full w-full"/>;
}

export default Map;