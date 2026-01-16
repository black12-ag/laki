import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface PaymentScreenProps {
  visible: boolean;
  onPaySecurely: () => void;
  onBack: () => void;
  transactionId: string;
  recipientName: string;
  bankName: string;
  amount: string;
}

export function PaymentScreen({
  visible,
  onPaySecurely,
  onBack,
  transactionId,
  recipientName,
  bankName,
  amount,
}: PaymentScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Card Info
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');

  if (!visible) return null;

  // Dynamic Colors
  const bgColor = isDark ? '#000000' : '#FFFFFF';
  const cardColor = isDark ? '#1C1C1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const subTextColor = isDark ? '#A1A1A6' : '#666666';
  const inputBg = isDark ? '#2C2C2E' : '#FFFFFF';
  const borderColor = isDark ? '#3A3A3C' : '#E0E0E0';
  const placeholderColor = isDark ? '#636366' : '#999';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: textColor }]}>LakiRemit</Text>
            <Text style={[styles.headerSubtitle, { color: subTextColor }]}>Save more, give more with LakiRemit.</Text>
          </View>

          {/* Security Badge */}
          <View style={styles.securityBadge}>
            <Ionicons name="lock-closed" size={14} color="#8BC34A" />
            <Text style={[styles.securityText, { color: subTextColor }]}>Secured by Cybersource</Text>
            <Text style={[styles.transactionIdText, { color: subTextColor }]}>ID: {transactionId}</Text>
          </View>

          {/* Transaction Details Card */}
          <View style={[styles.transactionCard, { backgroundColor: cardColor }]}>
            <Text style={[styles.cardTitle, { color: subTextColor }]}>Transaction Details</Text>
            <Text style={styles.amountText}>USD {parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: subTextColor }]}>Transaction ID</Text>
              <Text style={[styles.detailValue, { color: textColor }]}>{transactionId}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: subTextColor }]}>Receiver</Text>
              <Text style={[styles.detailValue, { color: textColor }]}>{recipientName}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: subTextColor }]}>Bank</Text>
              <Text style={[styles.detailValue, { color: textColor }]}>{bankName}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: subTextColor }]}>Status</Text>
              <Text style={styles.statusPending}>Pending</Text>
            </View>
          </View>

          {/* Personal Information Form */}
          <View style={[styles.formSection, { backgroundColor: cardColor }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="card-outline" size={20} color={textColor} />
              <Text style={[styles.sectionTitle, { color: textColor }]}>Personal Information</Text>
            </View>

            <Text style={[styles.label, { color: textColor }]}>First Name *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: borderColor, color: textColor }]}
              placeholder="First Name"
              placeholderTextColor={placeholderColor}
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={[styles.label, { color: textColor }]}>Last Name *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: borderColor, color: textColor }]}
              placeholder="Doe"
              placeholderTextColor={placeholderColor}
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={[styles.label, { color: textColor }]}>Email Address *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: borderColor, color: textColor }]}
              placeholder="email@example.com"
              placeholderTextColor={placeholderColor}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.label, { color: textColor }]}>Sender Phone Number *</Text>
            <View style={styles.phoneInputContainer}>
              <View style={[styles.countryCode, { borderColor: borderColor }]}>
                <Text style={styles.flagEmoji}>🇺🇸</Text>
                <Text style={[styles.countryCodeText, { color: textColor }]}>+1</Text>
              </View>
              <TextInput
                style={[styles.phoneInput, { backgroundColor: inputBg, borderColor: borderColor, color: textColor }]}
                placeholder="Phone number"
                placeholderTextColor={placeholderColor}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Card Information Section */}
          <View style={[styles.formSection, { backgroundColor: cardColor }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="lock-closed" size={18} color={textColor} />
              <Text style={[styles.sectionTitle, { color: textColor }]}>Card Information</Text>
            </View>

            <Text style={[styles.label, { color: textColor }]}>
              Card Number * <Text style={styles.cardIcon}>💳</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: borderColor, color: textColor }]}
              placeholder="Card Number"
              placeholderTextColor={placeholderColor}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              maxLength={19}
            />

            <Text style={[styles.label, { color: textColor }]}>Security Code *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: borderColor, color: textColor }]}
              placeholder="CVV"
              placeholderTextColor={placeholderColor}
              value={cvv}
              onChangeText={setCvv}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />

            <View style={styles.expiryRow}>
              <View style={styles.expiryField}>
                <Text style={[styles.label, { color: textColor }]}>Expiration Month *</Text>
                <View style={styles.dropdownContainer}>
                  <TextInput
                    style={[styles.input, { backgroundColor: inputBg, borderColor: borderColor, color: textColor }]}
                    placeholder="Month"
                    placeholderTextColor={placeholderColor}
                    value={expiryMonth}
                    onChangeText={setExpiryMonth}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                  <Ionicons name="chevron-down" size={16} color={placeholderColor} style={styles.dropdownIcon} />
                </View>
              </View>
              <View style={styles.expiryField}>
                <Text style={[styles.label, { color: textColor }]}>Expiration Year *</Text>
                <View style={styles.dropdownContainer}>
                  <TextInput
                    style={[styles.input, { backgroundColor: inputBg, borderColor: borderColor, color: textColor }]}
                    placeholder="Year"
                    placeholderTextColor={placeholderColor}
                    value={expiryYear}
                    onChangeText={setExpiryYear}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                  <Ionicons name="chevron-down" size={16} color={placeholderColor} style={styles.dropdownIcon} />
                </View>
              </View>
            </View>
          </View>

          {/* Security Notice */}
          <View style={[styles.securityNotice, { backgroundColor: isDark ? '#0D1B2A' : '#E3F2FD' }]}>
            <Ionicons name="information-circle" size={20} color="#1E88E5" />
            <View style={styles.securityTextContainer}>
              <Text style={styles.securityTitle}>Your payment is secure</Text>
              <Text style={styles.securityDescription}>
                Your card information is encrypted and processed securely through Cybersource. We never store your card details.
              </Text>
            </View>
          </View>

          {/* Extra space for button */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Pay Button - Fixed at bottom */}
        {/* We need different background for button container in Dark Mode to match main bg or card bg */}
        <View style={[styles.buttonContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFF', borderTopColor: borderColor }]}>
          <TouchableOpacity style={styles.payButton} onPress={onPaySecurely}>
            <Ionicons name="lock-closed" size={18} color="#FFF" />
            <Text style={styles.payButtonText}>Pay Securely</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  securityText: {
    fontSize: 13,
  },
  transactionIdText: {
    fontSize: 12,
  },
  transactionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  amountText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#8BC34A',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 13,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  statusPending: {
    color: '#FF9800',
    fontSize: 13,
    fontWeight: '600',
  },
  formSection: {
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
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  cardIcon: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 15,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
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
