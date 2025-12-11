export const validatePlz = (plz) => {
    // Validation for specific regions:
    // 17-19 (MV), 20-22 (HH), 21-25 (SH/Niedersachsen mix), 27 (SH)
    // 292-296 (Niedersachsen) REMOVED as per customer request "Bis Celle ist zu weit".
    const regex = /^(1[7-9]\d{3}|2[0-5]\d{3}|27\d{3})$/;
    return regex.test(plz);
};

export const getPlzError = (plz) => {
    if (!plz || plz.length !== 5) {
        return 'Bitte geben Sie eine gültige 5-stellige PLZ ein.';
    }
    if (!validatePlz(plz)) {
        return 'Leider liefern wir noch nicht in dieses Gebiet.';
    }
    return '';
};
