// src/utils/distance.js

// Coordinates of Gas-Service Möller HQ (Neuenteichweg 7a, 23795 Schieren)
const HQ_COORDS = { lat: 53.942, lng: 10.435 };

// Approximate coordinates for cities to improve "distance" accuracy without a full geo-db
// This is a lookup table. If a city isn't here, we fallback to a heuristic based on ZIP.
// Heuristic: ZIP 23xxx is close, 20xxx/22xxx is mid-range, 1xxxx is far.
const CITY_COORDS = {
    'schieren': { lat: 53.942, lng: 10.435 },
    'hamburg': { lat: 53.551, lng: 9.993 },
    'luebeck': { lat: 53.865, lng: 10.686 },
    'kiel': { lat: 54.323, lng: 10.122 },
    'rostock': { lat: 54.092, lng: 12.099 },
    'schwerin': { lat: 53.635, lng: 11.401 },
    'neumuenster': { lat: 54.071, lng: 9.980 },
    'norderstedt': { lat: 53.696, lng: 9.998 },
    'elmshorn': { lat: 53.754, lng: 9.652 },
    'stade': { lat: 53.601, lng: 9.475 },
    'lueneburg': { lat: 53.246, lng: 10.411 },
    'wismar': { lat: 53.889, lng: 11.461 },
    'guestrow': { lat: 53.793, lng: 12.176 },
    'bad-segeberg': { lat: 53.936, lng: 10.309 },
    'eutin': { lat: 54.138, lng: 10.613 },
    'rendsburg': { lat: 54.306, lng: 9.664 },
    'eckernfoerde': { lat: 54.471, lng: 9.833 },
    'ploen': { lat: 54.157, lng: 10.415 },
    'oldenburg-holstein': { lat: 54.293, lng: 10.886 },
    'neustadt-holstein': { lat: 54.108, lng: 10.811 },
    'ahrensburg': { lat: 53.674, lng: 10.240 },
    'flensburg': { lat: 54.783, lng: 9.432 },
    'itzehoe': { lat: 53.921, lng: 9.516 },
    'pinneberg': { lat: 53.659, lng: 9.794 },
    'winsen-luhe': { lat: 53.364, lng: 10.210 },
    'buxtehude': { lat: 53.477, lng: 9.701 },
    'buchholz': { lat: 53.327, lng: 9.879 },
    'seevetal': { lat: 53.393, lng: 10.033 },
    'geesthacht': { lat: 53.432, lng: 10.370 },
    'reinbek': { lat: 53.509, lng: 10.247 },
    'wedel': { lat: 53.580, lng: 9.704 },
    'husum': { lat: 54.477, lng: 9.051 },
    'heide': { lat: 54.194, lng: 9.092 },
    'schleswig': { lat: 54.516, lng: 9.556 },
    'bad-oldesloe': { lat: 53.810, lng: 10.370 },
    'bad-schwartau': { lat: 53.919, lng: 10.697 },
    'moelln': { lat: 53.629, lng: 10.691 },
    'kaltenkirchen': { lat: 53.839, lng: 9.965 },
    'quickborn': { lat: 53.731, lng: 9.897 },
    'bargteheide': { lat: 53.720, lng: 10.258 },
    'glinde': { lat: 53.541, lng: 10.214 },
    'ratzeburg': { lat: 53.699, lng: 10.775 },
    'schwarzenbek': { lat: 53.504, lng: 10.479 },
    'bad-bramstedt': { lat: 53.918, lng: 9.883 },
    'preetz': { lat: 54.234, lng: 10.347 },
    'glueckstadt': { lat: 53.788, lng: 9.418 },
    'uetersen': { lat: 53.682, lng: 9.664 },
    'fehmarn': { lat: 54.437, lng: 11.195 },
    'sylt': { lat: 54.908, lng: 8.311 },
    'stralsund': { lat: 54.309, lng: 13.081 },
    'greifswald': { lat: 54.095, lng: 13.381 },
    'neubrandenburg': { lat: 53.557, lng: 13.262 },
    'waren-mueritz': { lat: 53.516, lng: 12.683 },
    'neustrelitz': { lat: 53.363, lng: 13.061 },
    'parchim': { lat: 53.427, lng: 11.848 },
    'bergen-ruegen': { lat: 54.416, lng: 13.431 },
    'ribnitz-damgarten': { lat: 54.242, lng: 12.464 },
    'bad-doberan': { lat: 54.106, lng: 11.903 },
    'hagenow': { lat: 53.434, lng: 11.189 },
    'ludwigslust': { lat: 53.324, lng: 11.488 },
    'demmin': { lat: 53.907, lng: 13.032 },
    'wolgast': { lat: 54.053, lng: 13.776 },
    'pasewalk': { lat: 53.508, lng: 13.990 },
    'anklam': { lat: 53.856, lng: 13.687 },
    'boizenburg': { lat: 53.376, lng: 10.723 },
    'teterow': { lat: 53.774, lng: 12.575 },
    'grimmen': { lat: 54.112, lng: 13.043 },
    'sassnitz': { lat: 54.515, lng: 13.632 },
    'ueckermuende': { lat: 53.736, lng: 14.048 }
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export const calculateDistance = (slug, zip) => {
    // 1. Try precise coordinate match
    if (CITY_COORDS[slug]) {
        const dest = CITY_COORDS[slug];
        return Math.round(getDistanceFromLatLonInKm(HQ_COORDS.lat, HQ_COORDS.lng, dest.lat, dest.lng));
    }

    // 2. Fallback Heuristic based on ZIP first digit
    // Schieren is 23795
    if (zip) {
        const zipPrefix = zip.substring(0, 2);
        const firstDigit = zip.substring(0, 1);

        if (zipPrefix === '23') return 25; // Close surroundings
        if (zipPrefix === '24') return 45; // Kiel/Neumünster area
        if (zipPrefix === '22') return 55; // Norderstedt/Hamburg North
        if (zipPrefix === '20') return 65; // Hamburg Center
        if (zipPrefix === '21') return 75; // South of Elbe
        if (firstDigit === '1') return 120; // MVP area
        if (firstDigit === '2') return 80; // General North
    }

    // 3. Absolute fallback
    return 45;
};
