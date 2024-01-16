let cashArray = [];
const maxCashSize = 1000;
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1 * (Math.PI / 180))
        * Math.cos(lat2 * (Math.PI / 180))
        * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance * 1000; // Convert to meters
}

module.exports = () => ({
    // make sure that cash only have 1000 element
    addToCash: (locationPoint, payload) => {
        const currentTime = new Date();
        if (cashArray.length >= maxCashSize) {
            const tenMin = 10 * 60 * 1000;
            cashArray = cashArray
                .filter((cahedData) => Math.abs(currentTime - cahedData.createdAt) <= tenMin);
        }
        if (cashArray.length < maxCashSize) {
            cashArray.push({ location: locationPoint, createdAt: new Date(), data: payload });
        }
    },

    // search data within reduis 10 km and time withen 10 min
    getFromCash: (locationPoint) => {
        const searchRadius = 10 * 1000; // 10 km in meters
        const timeDifferenceThreshold = 30 * 60 * 1000; // 30 minutes in milliseconds
        const searchTime = new Date();

        const cahedLocation = cashArray.find((cahedData) => {
            const distance = calculateDistance(
                locationPoint.latitude,
                locationPoint.longitude,
                cahedData.location.latitude,
                cahedData.location.longitude,
            );
            const timeDifference = Math.abs(searchTime - cahedData.createdAt);

            return distance <= searchRadius && timeDifference <= timeDifferenceThreshold;
        });

        if (!cahedLocation) {
            console.info('cash missed');
            return null;
        }
        console.info('cash hit');
        return cahedLocation.data;
    },

    clearCash: () => {

    },

});
