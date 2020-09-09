import { createContext } from 'react';

type PreviewContextType = [boolean, string[]];

const defaultContext: PreviewContextType = [false, []];

export const PreviewContext = createContext<PreviewContextType>(defaultContext);
