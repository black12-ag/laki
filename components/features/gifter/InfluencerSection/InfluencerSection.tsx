import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { InfluencerCard, Influencer } from '../InfluencerCard';

export interface InfluencerSectionProps {
  title: string;
  influencers: Influencer[];
  onSeeAll?: () => void;
  onInfluencerPress: (influencer: Influencer) => void;
}

export function InfluencerSection({
  title,
  influencers,
  onSeeAll,
  onInfluencerPress,
}: InfluencerSectionProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h4" weight="bold">
          {title}
        </Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text variant="bodySmall" color={colors.primary} weight="semiBold">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {influencers.map((influencer) => (
          <InfluencerCard
            key={influencer.id}
            influencer={influencer}
            onPress={() => onInfluencerPress(influencer)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
});
