import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useThemeColors } from '@/hooks';
import { Typography } from '@/constants';

export interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label';
  weight?: 'normal' | 'medium' | 'semiBold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export function Text({
  variant = 'body',
  weight = 'normal',
  color,
  align = 'left',
  style,
  children,
  ...props
}: TextProps) {
  const colors = useThemeColors();

  const variantStyles = {
    h1: { fontSize: Typography.fontSize['4xl'], fontWeight: Typography.fontWeight.bold },
    h2: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold },
    h3: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.semiBold },
    h4: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.semiBold },
    body: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.normal },
    bodySmall: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.normal },
    caption: { fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.normal },
    label: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.medium },
  };

  const weightStyles = {
    normal: { fontWeight: Typography.fontWeight.normal },
    medium: { fontWeight: Typography.fontWeight.medium },
    semiBold: { fontWeight: Typography.fontWeight.semiBold },
    bold: { fontWeight: Typography.fontWeight.bold },
  };

  return (
    <RNText
      style={[
        { color: color || colors.text },
        variantStyles[variant],
        weightStyles[weight],
        { textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}
