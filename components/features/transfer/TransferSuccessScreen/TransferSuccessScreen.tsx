import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

interface TransferSuccessScreenProps {
  visible: boolean;
  onClose: () => void;
  amount: string;
  recipientName: string;
}

export function TransferSuccessScreen({ visible, onClose, amount, recipientName }: TransferSuccessScreenProps) {
  const colors = useThemeColors();

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
           <View style={styles.iconContainer}>
             <Ionicons name="checkmark" size={40} color="#FFF" />
           </View>
           
           <Text style={[styles.title, { color: colors.text }]}>Transfer Successful!</Text>
           <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
             You have successfully sent money to {recipientName}
           </Text>

           <View style={styles.amountCard}>
             <Text style={styles.amountLabel}>Total Sent</Text>
             <Text style={styles.amountValue}>${amount}</Text>
           </View>

           <View style={styles.detailsContainer}>
             <View style={styles.row}>
               <Text style={styles.rowLabel}>Status</Text>
               <Text style={[styles.rowValue, { color: '#4CAF50' }]}>Completed</Text>
             </View>
             <View style={styles.row}>
               <Text style={styles.rowLabel}>Reference</Text>
               <Text style={[styles.rowValue, { color: colors.text }]}>#TRX-{Math.floor(Math.random()*100000)}</Text>
             </View>
           </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  amountLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  detailsContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  rowLabel: {
    fontSize: 16,
    color: '#888',
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  doneButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
