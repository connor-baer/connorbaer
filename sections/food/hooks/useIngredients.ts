import { useContext, useMemo } from 'react';

import { UnitSystemContext } from '../components/UnitSystemContext';
import { convertUnit, formatUnit, pluralize } from '../services/units';
import { Ingredient, RawIngredient } from '../types';

export function useIngredients(
  ingredients: RawIngredient[],
  multiplier = 1,
): Ingredient[] {
  const [system] = useContext(UnitSystemContext);
  return useMemo(
    () =>
      ingredients.map(({ count: baseCount, unit, description, ingredient }) => {
        const { id, title: name } = ingredient;
        const count = baseCount * multiplier;

        if (!count) {
          const title = name.charAt(0).toUpperCase() + name.slice(1);
          return { id, title, description };
        }

        if (!unit) {
          const title = pluralize(count, name);
          return { id, title, description };
        }

        const converted = convertUnit(count, unit, system);

        if (!converted.unit) {
          // if (process.env.NODE_ENV !== 'production') {
          //   throw Error(`No matching unit found for ${count} ${unit}.`);
          // }
          const title = `${count} ${unit} ${name}`;
          return { id, title, description };
        }

        const formatted = formatUnit(converted.value, converted.unit);
        const title = `${formatted} ${name}`;
        return { id, title, description };
      }),
    [ingredients, system, multiplier],
  );
}
