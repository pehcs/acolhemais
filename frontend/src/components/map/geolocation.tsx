const getUserLocation = async (): Promise<[number, number]> => {
    if ('geolocation' in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        return [latitude, longitude];
    } else {
        throw new Error('Geolocalização não é suportada pelo navegador.');
    }
};

export default getUserLocation;