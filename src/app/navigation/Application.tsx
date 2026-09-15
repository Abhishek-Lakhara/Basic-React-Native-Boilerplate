import React, { useEffect, useState } from 'react';
import { TRootStack } from '@/interface/navigation.type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  navigate,
  navigateAndSimpleReset,
  navigationRef,
  resetToNestedScreen,
} from '@/utils/navigation.utils';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {
  AppUpdateModal,
  AuthSheet,
  InternetModal,
  UnAutheriseModal,
} from '@/components';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import VersionCheck from 'react-native-version-check';
import LandingScreen from '@/features/onboarding/screens/LandingScreen';
import { getAsyncStorage } from '@/utils/helper.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';
import { useAppSelector } from '@/store/hooks';
import {
  selectAccessToken,
  selectIsUnauthorized,
} from '@/store/selectors';
import { devLog } from '@/utils/logger';

const RootNavigator = createNativeStackNavigator<TRootStack>();

export default function Application() {
  const [isConnected, setIsConnected] = useState(true);
  const [showUpdateModal] = useState(false);
  const isUnauthorized = useAppSelector(selectIsUnauthorized);
  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    fetchVersions();
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchVersions = async () => {
    VersionCheck.needUpdate({
      depth: 2,
    }).then(res => {
      devLog('debug', 'app.update_check.completed', {
        updateRequired: res.isNeeded,
      });
      // setShowUpdateModal(res.isNeeded);
    });
  };

  const onNavigationReady = async () => {
    try {
      const isLandingCompleted = await getAsyncStorage(
        ASYNC_KEYS.IS_LANDING_COMPLETED,
      );
      const isLanguageSelected = await getAsyncStorage(
        ASYNC_KEYS.IS_LANGAUGE_SELECTED,
      );
      const isKycCompleted = await getAsyncStorage(ASYNC_KEYS.IS_KYC_COMPLETED);
      devLog('debug', 'app.navigation.ready', {
        isLandingCompleted: Boolean(isLandingCompleted),
        isLanguageSelected: Boolean(isLanguageSelected),
        hasAccessToken: Boolean(accessToken),
        isKycCompleted: Boolean(isKycCompleted),
      });
      if (!isLandingCompleted) {
        navigate('LandingScreen');
      } else if (!isLanguageSelected) {
        navigate('LanguageScreen');
      } else if (!accessToken) {
        navigateAndSimpleReset('AuthStack');
      } else {
        if (isKycCompleted) {
          navigateAndSimpleReset('MainStack');
        } else {
          resetToNestedScreen('MainStack', 'KycDetails');
        }
      }
    } catch {
      devLog('error', 'app.navigation.ready_failed');
    }
  };

  return (
    <>
      <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
        <RootNavigator.Navigator screenOptions={{ headerShown: false }}>
          <RootNavigator.Screen
            component={LandingScreen}
            name="LandingScreen"
          />
          <RootNavigator.Screen component={AuthStack} name="AuthStack" />
          <RootNavigator.Screen component={MainStack} name="MainStack" />
        </RootNavigator.Navigator>
      </NavigationContainer>

      <AuthSheet />
      <InternetModal visible={!isConnected} onClose={() => { }} />
      <AppUpdateModal visible={showUpdateModal} onClose={() => { }} />
      <UnAutheriseModal visible={isUnauthorized} onClose={() => { }} />
    </>
  );
}
