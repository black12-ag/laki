import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export interface BankLogoProps {
  bankId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

// Bank logo images
const bankImages: Record<string, any> = {
  cbe: require('@/assets/images/banks/cbe.jpeg'),
  awash: require('@/assets/images/banks/awash.jpg'),
  oromia: require('@/assets/images/banks/oromia.jpeg'),
  abyssinia: require('@/assets/images/banks/abyssinia.png'),
};

export function BankLogo({ bankId, size = 'md' }: BankLogoProps) {
  const sizeMap = {
    xs: 32,
    sm: 40,
    md: 48,
    lg: 56,
  };

  const dimension = sizeMap[size];
  const imageSource = bankImages[bankId];

  if (!imageSource) {
    // Fallback for unknown banks
    return (
      <View
        style={[
          styles.fallback,
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
    <View style={[styles.container, { width: dimension, height: dimension }]}>
      <Image
        source={imageSource}
        style={[
          styles.image,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
          },
        ]}
        resizeMode="contain" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    // align items to center image
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // removed backgroundColor to let container bg show if needed
  },
  fallback: {
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
