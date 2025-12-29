// Constants for reuse across the application to prevent magic strings and inconsistencies.

export const COMPANY_NAME = "Gas-Service Möller e.K.";
export const PHONE_NUMBER = "+49 176 416 84 326";
export const PHONE_NUMBER_DISPLAY = "04551 89 70 89"; // Used in Footer/Contact
export const EMAIL_ADDRESS = "kontakt@gasmoeller.de";
export const SITE_URL = "https://gasmoeller.de";
export const WEB3FORMS_ACCESS_KEY = "f22052ed-455f-4e4d-9f5a-94a6e340426f";

export const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/people/Gas-Service-Möller/100083286084666/",
    linkedin: "https://www.linkedin.com/company/gas-service-möller",
    instagram: "https://www.instagram.com/gasmoeller/", // Added as placeholder
    youtube: "https://www.youtube.com/@gasmoeller" // Added as placeholder
};

export const TANK_SIZES = [
    { id: '1.2t', label: '1,2 t', volume: 2700, dimensions: '2700mm x 1250mm' },
    { id: '2.1t', label: '2,1 t', volume: 4850, dimensions: '4850mm x 1250mm' },
    { id: '2.9t', label: '2,9 t', volume: 6400, dimensions: '6400mm x 1250mm' }
];

export const IMAGES = {
    hero: "/images/gas-order-hero.webp",
    logo: "/logos/logo-gasmoeller.png",
    placeholder: "/images/tanks/tank-placeholder.webp"
};

export const OPENING_HOURS = {
    schema: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
    ],
    display: "Mo-Fr 08:00 - 17:00"
};
