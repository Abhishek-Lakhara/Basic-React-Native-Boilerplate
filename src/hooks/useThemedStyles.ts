import { useMemo } from 'react';
import { themeType } from '@/interface';
import { useAppSelector } from '@/store/hooks';
import { selectThemeColor } from '@/store/selectors';

export const useThemedStyles = <T>(styleFn: (theme: themeType) => T): T => {
  const theme = useAppSelector(selectThemeColor);
  return useMemo(() => styleFn(theme), [styleFn, theme]);
};
