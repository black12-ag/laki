import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Bank } from '@/hooks/useBankRates';
import { BankLogo } from '../BankLogo';

export interface BankCardProps {
  bank: Bank;
  isSelected: boolean;
  onPress: () => void;
}

export function BankCard({ bank, isSelected, onPress }: BankCardProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: isSelected ? colors.primary : colors.border,
          borderWidth: isSelected ? 1.5 : 1,
          shadowOpacity: isSelected ? 0.05 : 0, 
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Bank Logo */}
      <BankLogo bankId={bank.id} size="sm" />

      {/* Bank Info */}
      <View style={styles.infoContainer}>
        <Text 
          variant="bodySmall" 
          weight="bold" 
          numberOfLines={1}
          style={styles.bankName}
        >
          {bank.shortName}
        </Text>
        <Text variant="caption" color={colors.textSecondary} style={styles.rate}>
          {bank.rate}
          <Text variant="caption" color={colors.textSecondary} style={{fontSize: 9}}>
            {' '}ETB
          </Text>
        </Text>
      </View>

      {/* Bonus Tag */}
      <View style={styles.bonusContainer}>
        <View style={styles.bonusTag}>
          <Text style={styles.giftEmoji}>🎁</Text>
          <Text style={styles.bonusText}>{bank.bonus}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    flex: 1,
    minHeight: 64,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  bankName: {
    fontSize: 13,
    marginBottom: 1,
  },
  rate: {
    fontSize: 10,
    color: '#666',
  },
  bonusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bonusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE', // Very light red/pink for bonus bg
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  giftEmoji: {
    fontSize: 8,
    marginRight: 2,
  },
  bonusText: {
    fontSize: 9,
    color: '#C62828', // Dark red for text
    fontWeight: '700',
  },
});
