import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useThemeColors } from '@/hooks';
import { Spacing } from '@/constants';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  borderRadius?: 'sm' | 'md' | 'lg';
}

export function Card({
  variant = 'elevated',
  padding = 'md',
  borderRadius = 'md',
  style,
  children,
  ...props
}: CardProps) {
  const colors = useThemeColors();

  const paddingStyles = {
    none: 0,
    sm: Spacing.sm,
    md: Spacing.base,
    lg: Spacing.xl,
  };

  const borderRadiusStyles = {
    sm: 8,
    md: 16,
    lg: 24,
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.cardBackground,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        };
      case 'outlined':
        return {
          backgroundColor: colors.cardBackground,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'filled':
        return {
          backgroundColor: colors.backgroundSecondary,
        };
      default:
        return {
          backgroundColor: colors.cardBackground,
        };
    }
  };

  return (
    <View
      style={[
        {
          padding: paddingStyles[padding],
          borderRadius: borderRadiusStyles[borderRadius],
        },
        getVariantStyles(),
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
