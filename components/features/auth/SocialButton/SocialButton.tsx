import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

export interface SocialButtonProps {
  provider: 'google' | 'apple';
  onPress: () => void;
  isLoading?: boolean;
}

export function SocialButton({ provider, onPress, isLoading }: SocialButtonProps) {
  const colors = useThemeColors();

  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          label: 'Continue with Google',
          icon: 'logo-google',
          iconColor: '#DB4437',
        };
      case 'apple':
        return {
          label: 'Continue with Apple',
          icon: 'logo-apple',
          iconColor: colors.text,
        };
      default:
        return {
          label: 'Continue',
          icon: 'log-in-outline',
          iconColor: colors.text,
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Ionicons name={config.icon as any} size={20} color={config.iconColor} />
      <Text variant="body" weight="medium" style={styles.label}>
        {config.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  label: {
    marginLeft: 12,
  },
});
