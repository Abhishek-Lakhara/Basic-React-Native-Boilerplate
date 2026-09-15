import React, { useEffect } from 'react';
import { LanguageProvider } from '@/app/providers/LanguageProvider';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import Application from '@/app/navigation/Application';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { devLog } from '@/utils/logger';

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    devLog('info', 'app.started');
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <LanguageProvider>
            <ToastProvider>
              <MenuProvider>
                <Application />
              </MenuProvider>
            </ToastProvider>
          </LanguageProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
