import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import i18next from 'i18next';
import { getAsyncStorage, setAsyncStorage } from '@/utils/helper.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';

// Define the type for the context
interface AppContextType {
  currentLanguage: string;
  changeLanguage: (e: string) => void;
}

// Create the context with the default values
export const AppContext = createContext<AppContextType>({
  currentLanguage: 'en',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const prepareLanguage = async () => {
      const selectedLanguage = await getAsyncStorage(ASYNC_KEYS.LANGUAGE);
      if (selectedLanguage && selectedLanguage !== currentLanguage) {
        i18next.changeLanguage(selectedLanguage);
        setCurrentLanguage(selectedLanguage);
      }
    };

    prepareLanguage().catch(() => undefined);
  }, [currentLanguage]);

  async function changeLanguage(selectedLanguage: string) {
    if (selectedLanguage && selectedLanguage !== currentLanguage) {
      await setAsyncStorage(ASYNC_KEYS.LANGUAGE, selectedLanguage);
      setCurrentLanguage(selectedLanguage);
      i18next.changeLanguage(selectedLanguage);
    }
  }

  return (
    <AppContext.Provider
      value={{
        changeLanguage,
        currentLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
