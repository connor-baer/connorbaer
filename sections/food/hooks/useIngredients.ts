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
        const { id, title } = ingredient;
        const count = baseCount * multiplier;

        if (!unit) {
          const amount = pluralize(count, title);
          return { id, count, title, amount };
        }
        const converted = convertUnit(count, unit, system);

        if (!converted.unit) {
          // if (process.env.NODE_ENV !== 'production') {
          //   throw Error(`No matching unit found for ${amount} ${unit}.`);
          // }
          const amount = `${count} ${unit} ${title}`;
          return { id, count, unit, title, amount, description };
        }

        const formatted = formatUnit(converted.value, converted.unit);
        const amount = `${formatted} ${title}`;
        return { id, count, unit, title, amount, description };
      }),
    [ingredients, system, multiplier],
  );
}
