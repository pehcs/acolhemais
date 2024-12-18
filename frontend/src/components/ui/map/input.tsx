const getLatLonFromCep = async (cep: string): Promise<{ lat: number; lon: number } | null> => {
  try {
    const isValidCep = /^\d{5}-?\d{3}$/.test(cep);
    if (!isValidCep) {
      throw new Error("O CEP deve estar no formato NNNNN-NNN.");
    }

    const cleanedCep = cep.replace("-", "");

    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    const data = await response.json();

    if (data.erro) {
      console.log("CEP não encontrado no ViaCEP. Tentando com Nominatim...");
      return await getLatLonFromNominatim(cep);
    }
    
    const address = `${data.logradouro}, ${data.localidade}, ${data.uf}, Brasil`;
    console.log(data)
    console.log(address)
    console.log(address)
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2`
    );
    const geoData = await geoResponse.json();

    if (geoData.length > 0) {
      const { lat, lon } = geoData[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados de CEP ou coordenadas:", error);
    return null;
  }
};

const getLatLonFromNominatim = async (cep: string): Promise<{ lat: number; lon: number } | null> => {
  try {
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${cep}&format=jsonv2`
    );
    const geoData = await geoResponse.json();

    if (geoData.length > 0) {
      const { lat, lon } = geoData[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar coordenadas usando o Nominatim:", error);
    return null;
  }
};

export default getLatLonFromCep;
