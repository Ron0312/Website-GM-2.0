import { describe, it, expect } from 'vitest';
import { validatePlz, getPlzError } from '../src/utils/validation';

describe('Validation Logic', () => {
  it('should validate correct PLZ in delivery area', () => {
    expect(validatePlz('20095')).toBe(true); // Hamburg
    expect(validatePlz('23552')).toBe(true); // Lübeck
    expect(validatePlz('18055')).toBe(true); // Rostock (MV start 17-19)
    expect(validatePlz('27472')).toBe(true); // Cuxhaven (27)
  });

  it('should reject invalid PLZ format', () => {
    expect(validatePlz('1234')).toBe(false);
    expect(validatePlz('123456')).toBe(false);
    expect(validatePlz('abcde')).toBe(false);
  });

  it('should reject PLZ outside delivery area', () => {
    expect(validatePlz('80331')).toBe(false); // Munich
    expect(validatePlz('10115')).toBe(false); // Berlin (outside defined ranges?)
    // Regex is ^(1[7-9]\d{3}|2[0-5]\d{3}|27\d{3})$
    // Berlin is 10-16, so 10115 is invalid. Correct.
  });

  it('should return correct error message', () => {
    expect(getPlzError('20095')).toBe('');
    expect(getPlzError('80331')).toBe('Leider liefern wir noch nicht in dieses Gebiet.');
    expect(getPlzError('123')).toBe('Bitte geben Sie eine gültige 5-stellige PLZ ein.');
  });
});
