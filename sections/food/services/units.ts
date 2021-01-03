import { format } from '@sumup/intl';
import { kebabCase } from 'lodash/fp';
import { Unit } from '@prisma/client';
import convert from 'convert-units';

import { ABBREVIATION_MAP, NAME_MAP } from '../constants';
import { ConvertUnit, UnitSystem } from '../types';

// TODO: Fork convert-units so we don't have to jump between unit notations
// and can remove all unused bits of code and unit definitions.

function convertBest(
  value: number,
  from: ConvertUnit,
): { value: number; unit: Unit } {
  const converted = convert(value)
    .from(from)
    // FIXME: Fix types once convert-units is forked.
    .toBest({
      exclude: [
        'qt',
        'pnt',
        'cup',
        'kanna',
        'cm3',
        'glas',
        'kkp',
        'cl',
        'dl',
        'msk',
        'tsk',
      ] as any,
    });
  return {
    // Round to nearest 0.5.
    // TODO: Do this while converting to the best unit.
    value: Math.round(converted.val / 0.25) * 0.25,
    unit: NAME_MAP[converted.unit as ConvertUnit],
  };
}

export function convertUnit(
  value: number,
  from: Unit,
  system: UnitSystem,
): { value: number; unit: Unit } {
  const unit = ABBREVIATION_MAP[from];
  const { measure, system: currentSystem } = convert().describe(unit);

  if (system === currentSystem) {
    return convertBest(value, unit);
  }

  const possibleUnits = convert().list(measure);
  const { abbr } = possibleUnits.find((u) => u.system === system);
  const newValue = convert(value).from(unit).to(abbr);
  return convertBest(newValue, abbr);
}

export function formatUnit(
  value: number,
  unit: Unit,
  locales?: string | string[],
): string {
  try {
    return format(value, locales, {
      style: 'unit',
      unit: kebabCase(unit),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`Failed to format ${value} ${unit}`);
    }
    return `${value} ${unit}`;
  }
}

export function pluralize(
  value: number,
  title: string,
  locales?: string | string[],
): string {
  const pluralRules = new Intl.PluralRules(locales);
  const grammaticalNumber = pluralRules.select(value);
  switch (grammaticalNumber) {
    case 'one':
      return `${value} ${title}`;
    case 'other':
      return `${value} ${title}s`;
    default:
      throw new Error(`Unknown: ${grammaticalNumber}`);
  }
}
