import { Unit } from '@prisma/client';

import { invert } from '../../utils/invert';

import { ConvertUnit } from './types';

export const ABBREVIATION_MAP: { [key in Unit]: ConvertUnit } = {
  // Volume
  Liter: 'l',
  Milliliter: 'ml',
  Gallon: 'gal',
  FluidOunce: 'fl-oz',
  Tablespoon: 'Tbs',
  Teaspoon: 'tsp',
  // Weight
  Kilogram: 'kg',
  Gram: 'g',
  Pound: 'lb',
  Ounce: 'oz',
  // Length
  Meter: 'm',
  Centimeter: 'cm',
  Millimeter: 'mm',
  Foot: 'ft',
  Inch: 'in',
  // Temperature
  Celsius: 'C',
  Fahrenheit: 'F',
  // Time
  Millisecond: 'ms',
  Second: 's',
  Minute: 'min',
  Hour: 'h',
  Day: 'd',
  Week: 'week',
  Month: 'month',
  Year: 'year',
};

export const NAME_MAP = invert(ABBREVIATION_MAP);
