import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BankCard } from '../BankCard';
import { Bank } from '@/hooks/useBankRates';

export interface BankCardGridProps {
  banks: Bank[];
  selectedBankId?: string;
  onSelectBank: (bank: Bank) => void;
}

export function BankCardGrid({ banks, selectedBankId, onSelectBank }: BankCardGridProps) {
  // Safety check for banks array
  if (!banks || banks.length < 4) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* First Row: CBE and Awash */}
      <View style={styles.row}>
        <View style={styles.cardWrapper}>
          <BankCard
            bank={banks[0]}
            isSelected={selectedBankId === banks[0]?.id}
            onPress={() => onSelectBank(banks[0])}
          />
        </View>
        <View style={styles.cardWrapper}>
          <BankCard
            bank={banks[1]}
            isSelected={selectedBankId === banks[1]?.id}
            onPress={() => onSelectBank(banks[1])}
          />
        </View>
      </View>
      
      {/* Second Row: Oromia and Abyssinia */}
      <View style={styles.row}>
        <View style={styles.cardWrapper}>
          <BankCard
            bank={banks[2]}
            isSelected={selectedBankId === banks[2]?.id}
            onPress={() => onSelectBank(banks[2])}
          />
        </View>
        <View style={styles.cardWrapper}>
          <BankCard
            bank={banks[3]}
            isSelected={selectedBankId === banks[3]?.id}
            onPress={() => onSelectBank(banks[3])}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
});
