const getLatLonFromCep = async (cep: string): Promise<{ lat: number; lon: number } | null> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${cep}&format=jsonv2`);
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      console.error("Nenhum resultado encontrado para o CEP fornecido.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados de lat/lon:", error);
    return null;
  }
};

export default getLatLonFromCep;