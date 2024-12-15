const getUserLocation = async (): Promise<[number, number]> => {
    if ('geolocation' in navigator) {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            return [latitude, longitude];
        } catch {
            return [-8.063093989071744, -34.871117946420114];
        }
    } else {
        return [-8.063093989071744, -34.871117946420114];
    }
};

export default getUserLocation;