import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import TabStack from './TabStack';
import CustomDrawerContent from '@/components/layouts/drawer/CustomDrawer';

const Drawer = createDrawerNavigator<any>();

export default function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 200,
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.3)',
        drawerStyle: {
          backgroundColor: '#fff',
          width: '70%',
        },
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="Dashboard" component={TabStack} />
    </Drawer.Navigator>
  );
}
