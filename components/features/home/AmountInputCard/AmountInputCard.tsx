import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';

export interface AmountInputCardProps {
  amount: string;
  convertedAmount: string;
  onAmountChange: (amount: string) => void;
  onContinue?: () => void;
  bankName?: string;
  currencyFrom?: string;
  currencyTo?: string;
}

export function AmountInputCard({
  amount,
  convertedAmount,
  onAmountChange,
  onContinue,
  bankName = 'CBE',
  currencyFrom = 'USD',
  currencyTo = 'ETB',
}: AmountInputCardProps) {
  const hasAmount = parseFloat(amount) > 0;

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>Enter amount</Text>

      {/* Amount Row */}
      <View style={styles.amountRow}>
        {/* Left side - USD Input */}
        <View style={styles.inputSection}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => {
                // Allow empty string to fully clear input
                if (text === '') {
                    onAmountChange('');
                    return;
                }
                
                // Prevent multiple decimals
                if ((text.match(/\./g) || []).length > 1) return;

                // Handle leading zeros
                if (text.length > 1 && text.startsWith('0') && text[1] !== '.') {
                    // "05" -> "5"
                    onAmountChange(text.replace(/^0+/, ''));
                } else if (text.startsWith('.')) {
                    // ".5" -> "0.5"
                    onAmountChange('0' + text);
                } else {
                    onAmountChange(text);
                }
            }}
            keyboardType="decimal-pad"
            placeholder="0.0"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>

        {/* Right side - ETB Conversion */}
        <View style={styles.convertedSection}>
          <Text style={styles.convertedAmount}>
            {parseFloat(convertedAmount).toLocaleString('en-US', { maximumFractionDigits: 1 })} {currencyTo}
          </Text>
        </View>
      </View>
      
      {/* Underline for input */}
      <View style={styles.divider} />

      {/* Continue Button - Show when amount > 0 */}
      {hasAmount && (
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 4,
    fontWeight: '600',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarSign: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 4,
  },
  input: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 80,
    padding: 0,
  },
  convertedSection: {
    alignItems: 'flex-end',
  },
  convertedAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)', 
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 4,
    width: '40%',
  },
  continueButton: {
    backgroundColor: '#8BC34A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
