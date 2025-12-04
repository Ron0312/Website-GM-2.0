export const validatePlz = (plz) => {
    // Validation for specific regions:
    // 17-19 (MV), 20-22 (HH), 21-25 (SH/Niedersachsen mix), 27 (SH), 292-296 (Niedersachsen)
    const regex = /^(1[7-9]\d{3}|2[0-5]\d{3}|27\d{3}|29[2-6]\d{2})$/;
    return regex.test(plz);
};

export const getPlzError = (plz) => {
    if (!plz || plz.length !== 5) {
        return 'Bitte geben Sie eine gültige 5-stellige PLZ ein.';
    }
    if (!validatePlz(plz)) {
        return 'Leider liefern wir aktuell nur in unserem Liefergebiet (Norddeutschland).';
    }
    return '';
};
