import { createContext } from 'react';

type Dispatch = ({ id, value }: { id: string; value: string }) => void;

type EditContextType = [boolean, Dispatch];

const defaultContext: EditContextType = [false, () => {}];

export const EditContext = createContext<EditContextType>(defaultContext);
