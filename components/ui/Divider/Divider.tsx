import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useThemeColors } from '@/hooks';

export interface DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  spacing?: number;
  text?: string;
}

export function Divider({
  orientation = 'horizontal',
  thickness = 1,
  spacing = 16,
  text,
  style,
  ...props
}: DividerProps) {
  const colors = useThemeColors();

  if (text) {
    return (
      <View style={[styles.textContainer, { marginVertical: spacing }, style]} {...props}>
        <View style={[styles.line, { backgroundColor: colors.border, height: thickness }]} />
        <View style={styles.textWrapper}>
          <View style={[styles.textBackground, { backgroundColor: colors.background }]}>
            <Text style={[styles.text, { color: colors.textMuted }]}>{text}</Text>
          </View>
        </View>
      </View>
    );
  }

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          {
            width: thickness,
            backgroundColor: colors.border,
            marginHorizontal: spacing,
          },
          style,
        ]}
        {...props}
      />
    );
  }

  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: colors.border,
          marginVertical: spacing,
        },
        style,
      ]}
      {...props}
    />
  );
}

import { Text } from '../Text';

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  line: {
    flex: 1,
  },
  textWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  textBackground: {
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 14,
  },
});
