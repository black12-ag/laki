import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useThemeColors } from '@/hooks';
import { Text } from '../Text';

export interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
}

export function Avatar({ source, name, size = 'md', backgroundColor }: AvatarProps) {
  const colors = useThemeColors();

  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const fontSizeMap = {
    sm: 14,
    md: 16,
    lg: 24,
    xl: 32,
  };

  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (source) {
    return (
      <Image
        source={source}
        style={[
          styles.image,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: backgroundColor || colors.primary,
        },
      ]}
    >
      <Text weight="bold" color="#FFFFFF" style={{ fontSize }}>
        {name ? getInitials(name) : 'U'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
