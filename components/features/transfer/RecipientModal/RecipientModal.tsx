import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

interface RecipientModalProps {
  visible: boolean;
  onClose: () => void;
  onContinue: (recipientData: any) => void;
  amount: string;
}

export function RecipientModal({ visible, onClose, onContinue, amount }: RecipientModalProps) {
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    if (!name || !reason) {
      alert("Please fill in Name and Reason");
      return;
    }
    onContinue({ name, reason, phone });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="pageSheet">
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Recipient Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Who are you sending to?</Text>

          {/* Amount Display */}
          <View style={styles.amountContainer}>
             <Text style={styles.amountLabel}>Sending Amount</Text>
             <Text style={styles.amountValue}>${amount}</Text>
          </View>

          {/* Inputs */}
          <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.text, borderColor: colors.border }]}
            placeholder="e.g. John Doe"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.label, { color: colors.text }]}>Reason for Transfer</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.text, borderColor: colors.border }]}
            placeholder="e.g. Family Support"
            placeholderTextColor={colors.textSecondary}
            value={reason}
            onChangeText={setReason}
          />

           <Text style={[styles.label, { color: colors.text }]}>Phone Number (Optional)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.text, borderColor: colors.border }]}
            placeholder="e.g. +251 911..."
            placeholderTextColor={colors.textSecondary}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

        </ScrollView>
        
        {/* Footer Button */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={20}>
            <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 20,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 24,
  },
  amountContainer: {
      backgroundColor: '#E8F5E9',
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
      alignItems: 'center'
  },
  amountLabel: {
      fontSize: 14,
      color: '#4CAF50',
      marginBottom: 4,
  },
  amountValue: {
      fontSize: 24,
      fontWeight: '800',
      color: '#2E7D32'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
  },
  continueButton: {
    backgroundColor: '#8BC34A',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#8BC34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  continueText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
