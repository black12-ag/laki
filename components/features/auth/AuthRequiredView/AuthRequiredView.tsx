import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

export interface AuthRequiredViewProps {
  title?: string;
  message?: string;
  onSignIn: () => void;
}

export function AuthRequiredView({
  title = 'Sign In Required',
  message = 'Please sign in to view your transaction history and manage your remittances.',
  onSignIn,
}: AuthRequiredViewProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      {/* Lock Icon */}
      <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
        <View style={[styles.innerCircle, { backgroundColor: colors.primaryLight }]}>
          <Ionicons name="lock-closed" size={40} color="#FFFFFF" />
        </View>
      </View>

      {/* Title */}
      <Text variant="h3" weight="bold" align="center" style={styles.title}>
        {title}
      </Text>

      {/* Message */}
      <Text
        variant="body"
        color={colors.textSecondary}
        align="center"
        style={styles.message}
      >
        {message}
      </Text>

      {/* Sign In Button */}
      <Button
        variant="primary"
        onPress={onSignIn}
        rightIcon={<Ionicons name="arrow-forward" size={20} color="#FFFFFF" />}
        style={styles.button}
      >
        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 12,
  },
  message: {
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    paddingHorizontal: 48,
  },
});
