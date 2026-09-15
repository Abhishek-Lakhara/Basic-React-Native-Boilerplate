import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/features/auth/screens/Login';
import Signup from '@/features/auth/screens/Signup';
import OtpVerification from '@/features/auth/screens/OtpVerification';
import { TAuthStack } from '@/interface/navigation.type';

const AuthNavigator = createNativeStackNavigator<TAuthStack>();

export default function AuthStack() {
  return (
    <AuthNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthNavigator.Screen component={Login} name="Login" />
      <AuthNavigator.Screen component={Signup} name="Signup" />
      <AuthNavigator.Screen
        component={OtpVerification}
        name="OtpVerification"
      />
    </AuthNavigator.Navigator>
  );
}
