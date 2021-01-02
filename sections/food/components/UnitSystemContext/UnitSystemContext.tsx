import { createContext, Dispatch, SetStateAction, ReactNode } from 'react';

import { useLocalStorage } from '../../../../hooks/useStorage';
import { UnitSystem } from '../../types';

const DEFAULT_SYSTEM = 'metric';

type SetUnitSystem = Dispatch<SetStateAction<UnitSystem>>;

export const UnitSystemContext = createContext<[UnitSystem, SetUnitSystem]>([
  DEFAULT_SYSTEM,
  () => {},
]);

export interface UnitSystemProviderProps {
  initialValue?: UnitSystem;
  children: ReactNode;
}

export function UnitSystemProvider({
  initialValue = DEFAULT_SYSTEM,
  children,
}: UnitSystemProviderProps): JSX.Element {
  const state = useLocalStorage('@mbc/unit-system', initialValue);
  return (
    <UnitSystemContext.Provider value={state}>
      {children}
    </UnitSystemContext.Provider>
  );
}
