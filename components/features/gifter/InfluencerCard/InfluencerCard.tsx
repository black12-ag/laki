import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

export interface Influencer {
  id: string;
  name: string;
  username: string;
  followers: string;
  imageUrl?: string;
  isVerified?: boolean;
  category: string;
}

export interface InfluencerCardProps {
  influencer: Influencer;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function InfluencerCard({ influencer, onPress, size = 'md' }: InfluencerCardProps) {
  const colors = useThemeColors();

  const sizeStyles = {
    sm: { width: 120, height: 150 },
    md: { width: CARD_WIDTH, height: 200 },
    lg: { width: CARD_WIDTH * 1.5, height: 250 },
  };

  const cardSize = sizeStyles[size];

  return (
    <TouchableOpacity
      style={[styles.container, cardSize]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Background placeholder */}
      <View style={[styles.background, { backgroundColor: '#1E3A5F' }]}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />

        {/* Gift badge */}
        <View style={[styles.giftBadge, { backgroundColor: colors.primary }]}>
          <Ionicons name="gift" size={14} color="#FFFFFF" />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.nameRow}>
            <Text variant="body" weight="bold" color="#FFFFFF" numberOfLines={1}>
              {influencer.name}
            </Text>
            {influencer.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color={colors.primary} style={styles.verifiedIcon} />
            )}
          </View>
          <Text variant="caption" color="rgba(255,255,255,0.7)">
            @{influencer.username}
          </Text>
          <View style={styles.followersRow}>
            <Ionicons name="people-outline" size={12} color="rgba(255,255,255,0.7)" />
            <Text variant="caption" color="rgba(255,255,255,0.7)" style={styles.followers}>
              {influencer.followers}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    marginBottom: 12,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  giftBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  followersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  followers: {
    marginLeft: 4,
  },
});
