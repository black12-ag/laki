import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Bank } from '@/hooks/useBankRates';
import { BankLogo } from '../BankLogo';

export interface BankRateItemProps {
  bank: Bank;
  onPress?: () => void;
}

export function BankRateItem({ bank, onPress }: BankRateItemProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left Section - Logo and Info */}
      <View style={styles.leftSection}>
        <BankLogo bankId={bank.id} size="md" />
        <View style={styles.bankInfo}>
          <Text style={[styles.bankName, { color: colors.text }]}>{bank.name}</Text>
          <View style={styles.bonusTag}>
            <Text style={styles.giftEmoji}>🎁</Text>
            <Text style={styles.bonusText}>{bank.bonus}</Text>
          </View>
        </View>
      </View>

      {/* Right Section - Rate */}
      <View style={styles.rightSection}>
        <Text style={[styles.rate, { color: colors.primary }]}>
          {bank.rate} ETB
        </Text>
        <Text style={[styles.perUsd, { color: colors.textMuted }]}>per USD</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankInfo: {
    marginLeft: 14,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  bonusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  giftEmoji: {
    fontSize: 11,
    marginRight: 3,
  },
  bonusText: {
    fontSize: 11,
    color: '#D32F2F',
    fontWeight: '600',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  rate: {
    fontSize: 20,
    fontWeight: '700',
  },
  perUsd: {
    fontSize: 12,
    marginTop: 2,
  },
});
