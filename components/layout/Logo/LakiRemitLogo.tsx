import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useThemeColors } from '@/hooks';

export interface LakiRemitLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function LakiRemitLogo({ size = 'md', showText = true }: LakiRemitLogoProps) {
  const colors = useThemeColors();

  const sizeMap = {
    sm: { icon: 24, fontSize: 16 },
    md: { icon: 32, fontSize: 20 },
    lg: { icon: 48, fontSize: 28 },
  };

  const { icon: iconSize, fontSize } = sizeMap[size];

  return (
    <View style={styles.container}>
      {/* Logo Icon - Simplified representation */}
      <View style={[styles.iconContainer, { width: iconSize, height: iconSize }]}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 32 32">
          <Defs>
            <LinearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#4CAF50" />
              <Stop offset="100%" stopColor="#2E7D32" />
            </LinearGradient>
          </Defs>
          <Circle cx="16" cy="16" r="14" fill="url(#logoGradient)" />
          <Path
            d="M10 16 L14 20 L22 12"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      </View>

      {showText && (
        <View style={styles.textContainer}>
          <Text weight="bold" style={{ fontSize, color: colors.text }}>
            Laki
          </Text>
          <Text weight="bold" style={{ fontSize, color: colors.primary }}>
            Remit
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 4,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
