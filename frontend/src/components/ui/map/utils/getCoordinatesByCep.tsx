import AddressLatLon from "@/components/ui/map/@types/AddressLatLon.ts";

const getLatLonFromCep = async (cep: string): Promise<AddressLatLon> => {
    try {
        const isValidCep = /^\d{5}-?\d{3}$/.test(cep);
        if (!isValidCep) {
            return;
        }

        const cleanedCep = cep.replace("-", "");

        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        const data = await response.json();

        if (data.erro) {
            const geoResponse = await fetch(
                `https://nominatim.openstreetmap.org/search.php?q=${cep}&format=jsonv2`
            );
            const geoData = await geoResponse.json();
            if (geoData.length > 0) {
                const {lat, lon} = geoData[0];
                const reverseGeoResponse = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`
                );
                const reverseGeoData = await reverseGeoResponse.json();
                const address = reverseGeoData.display_name || "Endereço não encontrado";
                return {latitude: parseFloat(lat), longitude: parseFloat(lon), address};
            }
        }
        const address = `${data.logradouro}, ${data.localidade}, ${data.uf}, Brasil`;
        const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2`
        );
        const geoData = await geoResponse.json();

        if (geoData.length > 0) {
            const {lat, lon} = geoData[0];
            return {latitude: parseFloat(lat), longitude: parseFloat(lon), address: address};
        }
    } catch (error) {
        console.error("Erro ao buscar dados de CEP ou coordenadas:", error);
    }
};


export default getLatLonFromCep;
