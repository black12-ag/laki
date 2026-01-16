import { Colors } from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

export function useThemeColors() {
  const colorScheme = useColorScheme();
  return Colors[colorScheme];
}
