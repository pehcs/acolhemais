import {useState} from "react";
import getUserLocation from "@/components/ui/map/utils/geolocation.tsx";
import getLatLonFromCep from "@/components/ui/map/utils/getCoordinatesByCep.tsx";
import AddressLatLon from "@/components/ui/map/@types/AddressLatLon.ts";

export default function useMap() {
    const [coordinates, setCoordinates] = useState<AddressLatLon>({latitude: 0, longitude: 0, address: ""});

    const updateCep = (cep: string) => {
        (async () => {
            try {
                if (!cep || cep.trim() === "") {
                    const [latitude, longitude] = await getUserLocation();
                    setCoordinates({latitude, longitude, address: ""});
                    return;
                }

                const isCep = (input: string) => /^\d{8}$|^\d{5}-\d{3}$/.test(input);
                if (isCep(cep)) {
                    const location = await getLatLonFromCep(cep);
                    if (location) {
                        setCoordinates(location);
                    } else {
                        throw new Error("Não foi possível encontrar o CEP fornecido.");
                    }
                }
            } catch (err: any) {
                console.error("Erro ao obter localização:", err);
                setCoordinates({latitude: 0, longitude: 0, address: "Endereço não encontrado"});
            }
        })()
    }
    const updatePoint = ({latitude, longitude}: { latitude: number, longitude: number }) => {
        (async () => {
            console.log("UPDATE POINT")
            const reverseGeoResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
            );
            const reverseGeoData = await reverseGeoResponse.json();
            const address = reverseGeoData.display_name || "Endereço não encontrado";
            setCoordinates({latitude: parseFloat(latitude), longitude: parseFloat(longitude), address});
        })()
    }

    return {updateCep, updatePoint, coordinates, setCoordinates}
}
