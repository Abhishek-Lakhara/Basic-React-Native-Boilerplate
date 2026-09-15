import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TMainStack } from '@/interface/navigation.type';
import TabStack from './TabStack';

const MainNavigator = createNativeStackNavigator<TMainStack>();

export default function MainStack() {
  return (
    <MainNavigator.Navigator screenOptions={{ headerShown: false }}>
      <MainNavigator.Screen name="TabStack" component={TabStack} />
    </MainNavigator.Navigator>
  );
}
