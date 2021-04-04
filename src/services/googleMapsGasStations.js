const googleMapsUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const googleAPIKey = 'AIzaSyDCKtw-kKN7lx65_Kw4lo64I44u5x6IOxc'
const proxyurl = "https://aqueous-brook-57671.herokuapp.com/";

function getGasStations(latitude, longitude) {
    const gasStationsUrl = `${googleMapsUrl}location=${latitude},${longitude}&radius=1500&type=gas_station&key=${googleAPIKey}`;
    return fetch(proxyurl + gasStationsUrl, {
        method: 'GET',
    }).then((resp) => resp.json())
};

export default getGasStations;