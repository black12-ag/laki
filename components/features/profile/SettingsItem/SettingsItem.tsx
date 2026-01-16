import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

export interface SettingsItemProps {
  icon: string;
  iconColor?: string;
  label: string;
  value?: string;
  onPress: () => void;
  showArrow?: boolean;
}

export function SettingsItem({
  icon,
  iconColor,
  label,
  value,
  onPress,
  showArrow = true,
}: SettingsItemProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSecondary }]}>
        <Ionicons name={icon as any} size={20} color={iconColor || colors.text} />
      </View>

      <View style={styles.content}>
        <Text variant="body" weight="medium">
          {label}
        </Text>
        {value && (
          <Text variant="bodySmall" color={colors.textSecondary}>
            {value}
          </Text>
        )}
      </View>

      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
});
