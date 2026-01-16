import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

export interface TransactionDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  transaction?: {
    id: string;
    recipientName: string;
    bank: string;
    amount: number;
    exchangeRate: number;
    amountInETB: number;
    gift: number;
    reason: string;
    transactionFee: number;
    total: number;
    status: 'pending' | 'success' | 'failed';
    date: string;
  };
}

export function TransactionDetailsModal({
  visible,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Dynamic Colors
  const bgColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const subTextColor = isDark ? '#888888' : '#666666';
  const dividerColor = isDark ? '#333333' : '#F0F0F0';

  if (!transaction) return null;

  const statusColor = transaction.status === 'success' ? '#4CAF50' : 
                      transaction.status === 'pending' ? '#FF9800' : '#F44336';
  const statusBg = transaction.status === 'success' ? '#E8F5E9' : 
                   transaction.status === 'pending' ? '#FFF3E0' : '#FFEBEE';

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: bgColor }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="receipt-outline" size={24} color="#4CAF50" />
            </View>
            <Text style={[styles.title, { color: textColor }]}>Transaction Details</Text>
            <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: isDark ? '#333' : '#F5F5F5' }]}>
              <Ionicons name="close" size={18} color={isDark ? '#AAA' : '#666'} />
            </TouchableOpacity>
          </View>

          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <Ionicons 
              name={transaction.status === 'success' ? 'checkmark-circle' : 'time'} 
              size={14} 
              color={statusColor} 
            />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {transaction.status === 'pending' ? 'Payment Pending' : transaction.status.toUpperCase()}
            </Text>
          </View>

          {/* Details List */}
          <View style={styles.detailsList}>
            <DetailRow label="Transaction ID" value={transaction.id} textColor={textColor} subTextColor={subTextColor} />
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            
            <DetailRow label="To:" value={transaction.recipientName} textColor={textColor} subTextColor={subTextColor} />
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            
            <DetailRow label="Bank:" value={transaction.bank} textColor={textColor} subTextColor={subTextColor} />
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            
            <DetailRow label="Sent Amount:" value={`$${transaction.amount.toFixed(2)}`} textColor="#4CAF50" subTextColor={subTextColor} />
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            
            <DetailRow label="ExchangeRate:" value={`$1= ${transaction.exchangeRate} ETB`} textColor="#4CAF50" subTextColor={subTextColor} />
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            
            <DetailRow label="Amount in ETB:" value={`${transaction.amountInETB.toLocaleString()} ETB`} textColor="#4CAF50" subTextColor={subTextColor} />
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            
            <DetailRow label="Gift:" value={`${transaction.gift.toLocaleString()} ETB`} textColor="#4CAF50" subTextColor={subTextColor} />
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            
            <DetailRow label="Reason" value={transaction.reason} textColor={textColor} subTextColor={subTextColor} />
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            
            <DetailRow label="Transaction Fee:" value={transaction.transactionFee.toFixed(1)} textColor={textColor} subTextColor={subTextColor} />
          </View>

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: textColor }]}>Total</Text>
            <Text style={styles.totalValue}>{transaction.total.toLocaleString()} ETB</Text>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoLaki}>Laki</Text>
            <Text style={styles.logoRemit}>Remit</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function DetailRow({ 
  label, 
  value, 
  textColor, 
  subTextColor 
}: { 
  label: string; 
  value: string; 
  textColor: string; 
  subTextColor: string;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={[styles.detailLabel, { color: subTextColor }]}>{label}</Text>
      <Text style={[styles.detailValue, { color: textColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    borderRadius: 24,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsList: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 13,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    maxWidth: '60%',
  },
  divider: {
    height: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#E0E0E0',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4CAF50',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLaki: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  logoRemit: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
});
