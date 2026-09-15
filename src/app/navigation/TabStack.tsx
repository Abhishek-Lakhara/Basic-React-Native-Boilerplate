import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TBottomTabStack } from '@/interface/navigation.type';
import { AppBackground, CustomTabBar } from '@/components';
import HomeScreen from '@/features/home/screens/HomeScreen';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import InvestScreen from '@/features/invest/screens/InvestScreen';
import WalletScreen from '@/features/wallet/screens/WalletScreen';
import RewardScreen from '@/features/rewards/screens/RewardScreen';
const Tab = createBottomTabNavigator<TBottomTabStack>();

export default function TabStack() {
  return (
    <AppBackground>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
            shadowColor: 'transparent',
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="InvestScreen" component={InvestScreen} />
        <Tab.Screen name="WalletScreen" component={WalletScreen} />
        <Tab.Screen name="RewardScreen" component={RewardScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </AppBackground>
  );
}
