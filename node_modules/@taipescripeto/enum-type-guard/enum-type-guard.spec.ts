import { enumTypeGuard } from './index';

enum PokemonType {
  FIRE = 'FIRE',
  GRASS = 'GRASS',
  WATER = 'WATER'
}

enum DigimonType {
  DATA = 1,
  VIRUS = 2,
  VACCINE = 3
}

enum CrossOver {
  FIRE = 'FIRE',
  GRASS = 'GRASS',
  WATER = 'WATER',
  DATA = 1,
  VIRUS = 2,
  VACCINE = 3
}

describe('[Enum Type Guard]', () => {
  it('Enum com string', () => {
    const pokemon1 = JSON.parse('{"tipo":"FIRE"}');
    const pokemon2 = JSON.parse('{"tipo":"FLAME"}');

    expect(enumTypeGuard(pokemon1.tipo, PokemonType)).toBe(true);
    expect(enumTypeGuard(pokemon2.tipo, PokemonType)).toBe(false);
  });

  it('Enum com número', () => {
    expect(enumTypeGuard(1, DigimonType)).toBe(true);
    expect(enumTypeGuard(0, DigimonType)).toBe(false);
  });

  it('Enum com string e números', () => {
    expect(enumTypeGuard(1, CrossOver)).toBe(true);
    expect(enumTypeGuard(0, CrossOver)).toBe(false);
    expect(enumTypeGuard('FIRE', CrossOver)).toBe(true);
    expect(enumTypeGuard('FLAME', CrossOver)).toBe(false);
  });
});
