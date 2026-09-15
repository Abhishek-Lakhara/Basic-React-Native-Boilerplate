import React from 'react';
import { View, StyleSheet, ViewStyle, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
  style?: ViewStyle;
  statusBarColor?: string;
  StatusBarStyle?: 'default' | 'light-content' | 'dark-content';
}

const SafeAreaWrapper = ({
  children,
  useSafeArea = true,
  style,
  statusBarColor,
  StatusBarStyle = 'light-content',
}: SafeAreaWrapperProps) => {
  const themeColor = useThemeColor();
  const Wrapper = useSafeArea ? SafeAreaView : View;
  const resolvedStatusBarColor = statusBarColor ?? themeColor.backgroundColor;

  return (
    <View style={[styles.outer, { backgroundColor: resolvedStatusBarColor }]}>
      <StatusBar
        backgroundColor={resolvedStatusBarColor}
        barStyle={StatusBarStyle}
        translucent={!useSafeArea} // Key for Android 33+
      />
      <Wrapper style={[styles.container, style]}>{children}</Wrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
