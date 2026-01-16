import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface CardPaymentScreenProps {
  visible: boolean;
  onPaySecurely: () => void;
  onBack: () => void;
}

export function CardPaymentScreen({
  visible,
  onPaySecurely,
  onBack,
}: CardPaymentScreenProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');

  if (!visible) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Card Information Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="lock-closed" size={18} color="#333" />
            <Text style={styles.sectionTitle}>Card Information</Text>
          </View>

          <Text style={styles.label}>
            Card Number * <Text style={styles.cardIcon}>💳</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#999"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="number-pad"
            maxLength={19}
          />

          <Text style={styles.label}>Security Code *</Text>
          <TextInput
            style={styles.input}
            placeholder="CVV"
            placeholderTextColor="#999"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
          />

          <View style={styles.expiryRow}>
            <View style={styles.expiryField}>
              <Text style={styles.label}>Expiration Month *</Text>
              <View style={styles.dropdownContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Month"
                  placeholderTextColor="#999"
                  value={expiryMonth}
                  onChangeText={setExpiryMonth}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <Ionicons name="chevron-down" size={16} color="#999" style={styles.dropdownIcon} />
              </View>
            </View>
            <View style={styles.expiryField}>
              <Text style={styles.label}>Expiration Year *</Text>
              <View style={styles.dropdownContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Year"
                  placeholderTextColor="#999"
                  value={expiryYear}
                  onChangeText={setExpiryYear}
                  keyboardType="number-pad"
                  maxLength={4}
                />
                <Ionicons name="chevron-down" size={16} color="#999" style={styles.dropdownIcon} />
              </View>
            </View>
          </View>
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Ionicons name="information-circle" size={20} color="#1E88E5" />
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>Your payment is secure</Text>
            <Text style={styles.securityDescription}>
              Your card information is encrypted and processed securely through Cybersource. We never store your card details.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.payButton} onPress={onPaySecurely}>
          <Ionicons name="lock-closed" size={18} color="#FFF" />
          <Text style={styles.payButtonText}>Pay Securely</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  cardIcon: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    backgroundColor: '#FFF',
  },
  expiryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  expiryField: {
    flex: 1,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -8,
  },
  securityNotice: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E88E5',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 13,
    color: '#1E88E5',
    lineHeight: 18,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  payButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
