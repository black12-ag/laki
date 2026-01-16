import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useThemeColors, useAuth } from '@/hooks';
import { Header } from '@/components/layout/Header';
import { SignInModal } from '@/components/features/auth';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

// Mock transaction data
const MOCK_TRANSACTIONS = [
  {
    id: '1',
    recipientName: 'TEST RECIPIENT',
    bank: 'CBE',
    amount: 100.00,
    date: 'Jan 11, 2026',
    status: 'pending',
  },
  {
    id: '2',
    recipientName: 'ABEBE KEBEDE',
    bank: 'Awash',
    amount: 250.00,
    date: 'Jan 10, 2026',
    status: 'success',
  },
  {
    id: '3',
    recipientName: 'TIGIST HAILE',
    bank: 'Abyssinia',
    amount: 75.00,
    date: 'Jan 08, 2026',
    status: 'success',
  },
];

type FilterType = 'all' | 'success' | 'pending' | 'failed';

export default function HistoryScreen() {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user, signIn, signUp, signInWithGoogle, signInWithApple } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
    if (activeFilter === 'all') return true;
    return tx.status === activeFilter;
  });

  const FilterButton = ({ filter, label, icon }: { filter: FilterType; label: string; icon: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === filter && styles.filterButtonActive,
        { backgroundColor: activeFilter === filter ? '#8BC34A' : (isDark ? '#2A2A2A' : '#F5F5F5') }
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Ionicons 
        name={icon as any} 
        size={14} 
        color={activeFilter === filter ? '#FFF' : (isDark ? '#888' : '#666')} 
      />
      <Text style={[
        styles.filterButtonText,
        { color: activeFilter === filter ? '#FFF' : (isDark ? '#888' : '#666') }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const TransactionCard = ({ tx }: { tx: typeof MOCK_TRANSACTIONS[0] }) => (
    <View style={[styles.transactionCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
      <View style={styles.transactionLeft}>
        <View style={[styles.avatar, { backgroundColor: isDark ? '#333' : '#E8F5E9' }]}>
          <Ionicons name="person-outline" size={20} color="#8BC34A" />
        </View>
        <View>
          <Text style={[styles.recipientName, { color: isDark ? '#FFF' : '#1A1A1A' }]}>
            {tx.recipientName}
          </Text>
          <Text style={[styles.bankName, { color: isDark ? '#888' : '#666' }]}>
            {tx.bank}
          </Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: tx.status === 'success' ? '#E8F5E9' : '#FFF3E0' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: tx.status === 'success' ? '#4CAF50' : '#FF9800' }
          ]}>
            {tx.status.toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.amount, { color: isDark ? '#FFF' : '#1A1A1A' }]}>
          -${tx.amount.toFixed(2)}
        </Text>
        <Text style={[styles.date, { color: isDark ? '#666' : '#999' }]}>
          {tx.date}
        </Text>
      </View>
    </View>
  );

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFFFFF' }]}>
        <Header userName={'U'} />
        <View style={styles.authRequired}>
          <Ionicons name="lock-closed-outline" size={48} color={isDark ? '#666' : '#999'} />
          <Text style={[styles.authTitle, { color: isDark ? '#FFF' : '#1A1A1A' }]}>
            Sign In Required
          </Text>
          <Text style={[styles.authMessage, { color: isDark ? '#888' : '#666' }]}>
            Please sign in to view your transaction history
          </Text>
          <TouchableOpacity style={styles.signInButton} onPress={() => setShowSignIn(true)}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        
        <SignInModal
          visible={showSignIn}
          onClose={() => setShowSignIn(false)}
          onSignIn={async (email, password) => {
            await signIn(email, password);
            setShowSignIn(false);
          }}
          onSignUp={async (email, password, fullName) => {
            await signUp(email, password, fullName);
            setShowSignIn(false);
          }}
          onSignInWithGoogle={signInWithGoogle}
          onSignInWithApple={signInWithApple}
          onForgotPassword={() => {}}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFFFFF' }]}>
      <Header userName={user?.displayName?.[0] || user?.email?.[0] || 'U'} />

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <FilterButton filter="all" label="All" icon="list-outline" />
        <FilterButton filter="success" label="Success" icon="checkmark-circle-outline" />
        <FilterButton filter="pending" label="Pending" icon="time-outline" />
        <FilterButton filter="failed" label="Failed" icon="close-circle-outline" />
      </ScrollView>

      {/* Transaction List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(tx => (
            <TransactionCard key={tx.id} tx={tx} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={isDark ? '#444' : '#CCC'} />
            <Text style={[styles.emptyText, { color: isDark ? '#666' : '#999' }]}>
              No transactions found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    maxHeight: 50,
    paddingVertical: 8,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#8BC34A',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipientName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  bankName: {
    fontSize: 12,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    fontSize: 11,
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
  },
  authRequired: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  authMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
