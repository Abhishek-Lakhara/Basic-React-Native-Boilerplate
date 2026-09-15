import { useAppSelector } from '@/store/hooks';
import { selectThemeColor } from '@/store/selectors';

export const useThemeColor = () => {
  return useAppSelector(selectThemeColor);
};
