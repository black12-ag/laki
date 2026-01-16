import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks';

interface SendMoneyModalProps {
  visible: boolean;
  onClose: () => void;
  onContinue: (data: TransferData) => void;
  amount: string;
  convertedAmount: string;
  senderName?: string;
  senderEmail?: string;
}

export interface TransferData {
  senderName: string;
  senderEmail: string;
  bankType: 'abyssinia' | 'other';
  accountNumber: string;
  reason: string;
  recipientName?: string;
}

export function SendMoneyModal({
  visible,
  onClose,
  onContinue,
  amount,
  convertedAmount,
  senderName = '',
  senderEmail = '',
}: SendMoneyModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = useThemeColors();
  
  // Dynamic Colors
  const bgColor = isDark ? '#1A1A1A' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const subTextColor = isDark ? '#888888' : '#666666';
  const inputBg = isDark ? '#2A2A2A' : '#FFFFFF';
  const inputBorder = isDark ? '#333333' : '#E0E0E0';
  const closeBtnBg = isDark ? '#333333' : '#F0F0F0';
  const closeIconColor = isDark ? '#666' : '#333';
  const bankOptionBorder = isDark ? '#333333' : '#E0E0E0';
  const bankOptionText = isDark ? '#888' : '#666';

  // Form State
  const [formSenderName, setFormSenderName] = useState(senderName);
  const [formSenderEmail, setFormSenderEmail] = useState(senderEmail);
  const [bankType, setBankType] = useState<'abyssinia' | 'other'>('abyssinia');
  const [accountNumber, setAccountNumber] = useState('');
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState(false);
  
  // Steps
  const [step, setStep] = useState<'info' | 'summary'>('info');
  const [recipientName, setRecipientName] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckAccount = () => {
    if (!accountNumber) return;
    
    setIsChecking(true);
    // Simulate account verification
    setTimeout(() => {
      setRecipientName('VERIFIED RECIPIENT'); // Simulated response
      setIsChecking(false);
    }, 1000);
  };

  const handleContinue = () => {
    if (step === 'info') {
      if (!reason.trim()) {
        setReasonError(true);
        return;
      }
      setReasonError(false);
      setStep('summary');
    } else {
      onContinue({
        senderName: formSenderName,
        senderEmail: formSenderEmail,
        bankType,
        accountNumber,
        reason,
        recipientName,
      });
    }
  };

  const exchangeRate = 151.9;
  const amountNum = parseFloat(amount) || 0;
  const amountInETB = amountNum * exchangeRate;
  const gift = amountNum * 3.0375; // ~3% gift
  const total = amountInETB + gift;

  const resetAndClose = () => {
    setStep('info');
    setRecipientName('');
    setAccountNumber('');
    setReason('');
    setReasonError(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={[styles.container, { backgroundColor: bgColor }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="arrow-forward" size={16} color="#FFF" />
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: textColor }]}>Send Money</Text>
                <Text style={[styles.headerSubtitle, { color: subTextColor }]}>
                  {step === 'info' ? 'Based on current exchange rate' : 'Confirm Transaction.'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={resetAndClose} style={[styles.closeButton, { backgroundColor: closeBtnBg }]}>
              <Ionicons name="close" size={20} color={closeIconColor} />
            </TouchableOpacity>
          </View>

          {/* Amount Card - Always Green for branding or adapt? Kept Green as per screenshot usually */}
          <View style={styles.amountCard}>
            <Text style={styles.amountUSD}>${amount || '0'}</Text>
            <View style={styles.amountRight}>
              <Text style={styles.amountETB}>{total.toLocaleString('en-US', { maximumFractionDigits: 1 })} ETB</Text>
              <View style={styles.giftBadge}>
                <Ionicons name="gift" size={12} color="#FFF" />
                <Text style={styles.giftText}>+{gift.toLocaleString('en-US', { maximumFractionDigits: 1 })} ETB</Text>
              </View>
            </View>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {step === 'info' ? (
              <>
                {/* Sender Full Name */}
                <Text style={[styles.label, { color: textColor }]}>Sender Full Name *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor: inputBorder }]}
                  placeholder="Full Name"
                  placeholderTextColor={subTextColor}
                  value={formSenderName}
                  onChangeText={setFormSenderName}
                />

                {/* Sender Email */}
                <Text style={[styles.label, { color: textColor }]}>Sender Email *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor: inputBorder }]}
                  placeholder="email@example.com"
                  placeholderTextColor={subTextColor}
                  value={formSenderEmail}
                  onChangeText={setFormSenderEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {/* Bank Toggle */}
                <View style={styles.bankToggle}>
                  <TouchableOpacity
                    style={[
                      styles.bankOption, 
                      { borderColor: bankOptionBorder },
                      bankType === 'abyssinia' && styles.bankOptionActive
                    ]}
                    onPress={() => setBankType('abyssinia')}
                  >
                    <Ionicons 
                      name={bankType === 'abyssinia' ? 'checkmark-circle' : 'ellipse-outline'} 
                      size={18} 
                      color={bankType === 'abyssinia' ? '#8BC34A' : bankOptionText} 
                    />
                    <Text style={[styles.bankOptionText, { color: bankOptionText }, bankType === 'abyssinia' && styles.bankOptionTextActive]}>
                      Abyssinia Bank
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.bankOption, 
                      { borderColor: bankOptionBorder },
                      bankType === 'other' && styles.bankOptionActive
                    ]}
                    onPress={() => setBankType('other')}
                  >
                    <Ionicons 
                      name={bankType === 'other' ? 'checkmark-circle' : 'ellipse-outline'} 
                      size={18} 
                      color={bankType === 'other' ? '#8BC34A' : bankOptionText} 
                    />
                    <Text style={[styles.bankOptionText, { color: bankOptionText }, bankType === 'other' && styles.bankOptionTextActive]}>
                      Other Bank
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Account Number */}
                <Text style={[styles.label, { color: textColor }]}>
                    {bankType === 'abyssinia' ? 'Abyssinia Account Number' : 'Other Bank Account Number'}
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor: inputBorder }]}
                  placeholder="Enter recipient account number"
                  placeholderTextColor={subTextColor}
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  keyboardType="number-pad"
                />

                {/* Check Account Button */}
                <TouchableOpacity 
                  style={[styles.checkButton, !accountNumber && styles.buttonDisabled]} 
                  onPress={handleCheckAccount}
                  disabled={!accountNumber || isChecking}
                >
                  <Text style={styles.checkButtonText}>
                    {isChecking ? 'Checking...' : 'Check account'}
                  </Text>
                </TouchableOpacity>

                {/* Recipient Name Display */}
                {recipientName && (
                  <View style={styles.recipientInfo}>
                    <Ionicons name="checkmark-circle" size={20} color="#8BC34A" />
                    <Text style={styles.recipientName}>{recipientName}</Text>
                  </View>
                )}

                {/* Reason */}
                <Text style={[styles.label, { color: textColor }]}>Reason *</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { backgroundColor: inputBg, color: textColor, borderColor: inputBorder },
                    reasonError && styles.inputError
                  ]}
                  placeholder="Enter reason for transfer"
                  placeholderTextColor={subTextColor}
                  value={reason}
                  onChangeText={(text) => {
                    setReason(text);
                    if (text) setReasonError(false);
                  }}
                />
                {reasonError && (
                  <Text style={styles.errorText}>Reason Can not be empty</Text>
                )}
              </>
            ) : (
              /* Transaction Summary */
              <>
                <Text style={[styles.summaryTitle, { color: textColor }]}>Transaction</Text>
                
                <View style={[styles.summaryRow, { borderBottomColor: inputBorder }]}>
                  <Text style={[styles.summaryLabel, { color: subTextColor }]}>To:</Text>
                  <Text style={[styles.summaryValue, { color: textColor }]}>{recipientName}</Text>
                </View>
                
                <View style={[styles.summaryRow, { borderBottomColor: inputBorder }]}>
                  <Text style={[styles.summaryLabel, { color: subTextColor }]}>Bank:</Text>
                  <Text style={[styles.summaryValue, { color: textColor }]}>{bankType === 'abyssinia' ? 'Abyssinia Bank' : 'Other Bank'}</Text>
                </View>
                
                <View style={[styles.summaryRow, { borderBottomColor: inputBorder }]}>
                  <Text style={[styles.summaryLabel, { color: subTextColor }]}>Sent Amount:</Text>
                  <Text style={styles.summaryValueGreen}>${amountNum.toLocaleString()}</Text>
                </View>
                
                <View style={[styles.summaryRow, { borderBottomColor: inputBorder }]}>
                  <Text style={[styles.summaryLabel, { color: subTextColor }]}>ExchangeRate:</Text>
                  <Text style={styles.summaryValueGreen}>$1= {exchangeRate} ETB</Text>
                </View>
                
                <View style={[styles.summaryRow, { borderBottomColor: inputBorder }]}>
                  <Text style={[styles.summaryLabel, { color: subTextColor }]}>Amount in ETB:</Text>
                  <Text style={styles.summaryValueGreen}>{amountInETB.toLocaleString('en-US', { maximumFractionDigits: 1 })} ETB</Text>
                </View>
                
                <View style={[styles.summaryRow, { borderBottomColor: inputBorder }]}>
                  <Text style={[styles.summaryLabel, { color: subTextColor }]}>Gift:</Text>
                  <Text style={styles.summaryValueGreen}>{gift.toLocaleString('en-US', { maximumFractionDigits: 1 })} ETB</Text>
                </View>
                
                <View style={[styles.summaryRow, { borderBottomColor: inputBorder }]}>
                  <Text style={[styles.summaryLabel, { color: subTextColor }]}>Reason</Text>
                  <Text style={[styles.summaryValue, { color: textColor }]}>{reason}</Text>
                </View>
                
                <View style={[styles.summaryRow, { borderBottomColor: inputBorder }]}>
                  <Text style={[styles.summaryLabel, { color: subTextColor }]}>Transaction Fee:</Text>
                  <Text style={[styles.summaryValue, { color: textColor }]}>0.0</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={[styles.totalLabel, { color: textColor }]}>Total</Text>
                  <Text style={styles.totalValue}>{total.toLocaleString('en-US', { maximumFractionDigits: 1 })} ETB</Text>
                </View>
              </>
            )}
          </ScrollView>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent dim like Auth modal
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 20,
    maxHeight: '85%', // Prevent it from being too tall on small screens
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#8BC34A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountCard: {
    backgroundColor: '#8BC34A',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountUSD: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
  },
  amountRight: {
    alignItems: 'flex-end',
  },
  amountETB: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  giftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    gap: 4,
  },
  giftText: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: '600',
  },
  scrollContent: {
    maxHeight: 400,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    borderWidth: 1,
  },
  inputError: {
    borderColor: '#F44336',
    borderWidth: 2,
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4,
  },
  bankToggle: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  bankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  bankOptionActive: {
    borderColor: '#8BC34A',
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
  },
  bankOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bankOptionTextActive: {
    color: '#8BC34A',
  },
  checkButton: {
    backgroundColor: '#8BC34A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  checkButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  recipientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    borderRadius: 8,
  },
  recipientName: {
    color: '#4CAF50', 
    fontSize: 14,
    fontWeight: '600',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryValueGreen: {
    color: '#8BC34A',
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  totalValue: {
    color: '#8BC34A',
    fontSize: 18,
    fontWeight: '700',
  },
  continueButton: {
    backgroundColor: '#8BC34A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
