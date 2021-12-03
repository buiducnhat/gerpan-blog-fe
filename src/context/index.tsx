import { createContext, useContext } from 'react';
import { IAppContext } from './model';

export const AppContext = createContext<IAppContext>({ user: null });

export const useAppContext = () => useContext(AppContext);
