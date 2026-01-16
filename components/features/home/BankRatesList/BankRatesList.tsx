import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { BankRateItem } from '../BankRateItem';
import { Bank } from '@/hooks/useBankRates';

export interface BankRatesListProps {
  banks: Bank[];
  onBankPress?: (bank: Bank) => void;
}

export function BankRatesList({ banks, onBankPress }: BankRatesListProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Today's Bank Rates (USD)</Text>

      {banks.map((bank) => (
        <BankRateItem
          key={bank.id}
          bank={bank}
          onPress={() => onBankPress?.(bank)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
});
