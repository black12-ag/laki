import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

export interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onEditProfile: () => void;
  onClose?: () => void;
}

export function ProfileHeader({
  name,
  email,
  avatarUrl,
  onEditProfile,
  onClose,
}: ProfileHeaderProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      {/* Close button */}
      {onClose && (
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
          onPress={onClose}
        >
          <Ionicons name="close" size={20} color={colors.text} />
        </TouchableOpacity>
      )}

      {/* Avatar */}
      <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
        <Avatar name={name} size="xl" />
      </View>

      {/* Name */}
      <Text variant="h4" weight="bold" style={styles.name}>
        {name}
      </Text>

      {/* Email */}
      <Text variant="bodySmall" color={colors.textSecondary} style={styles.email}>
        {email}
      </Text>

      {/* Edit Profile Button */}
      <Button
        variant="primary"
        onPress={onEditProfile}
        rightIcon={<Ionicons name="arrow-forward" size={18} color="#FFFFFF" />}
        style={styles.editButton}
      >
        Edit Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    borderRadius: 50,
    padding: 4,
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 32,
  },
});
