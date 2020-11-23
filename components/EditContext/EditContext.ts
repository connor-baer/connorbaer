import { createContext } from 'react';

type Action = 'UPDATE' | 'DELETE' | 'ADD';

type Dispatch = ({
  path,
  value,
  action,
}: {
  path: string;
  value: string;
  action?: Action;
}) => void;

type EditContextType = [boolean, Dispatch];

const defaultContext: EditContextType = [false, () => {}];

export const EditContext = createContext<EditContextType>(defaultContext);
