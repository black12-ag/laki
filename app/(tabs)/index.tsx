import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import { useThemeColors, useBankRates, useAuth } from '@/hooks';
import { useThemeActions } from '@/hooks/useColorScheme';
import { Text } from '@/components/ui/Text';
import { Header } from '@/components/layout/Header';
import { PromoBanner, BankRatesList, BankLogo } from '@/components/features/home';
import { SignInModal } from '@/components/features/auth';
import { ProfileModal } from '@/components/features/profile';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Transfer Flow Components
import { SendMoneyModal, TransferData } from '@/components/features/transfer/SendMoneyModal';
import { TransferLoadingScreen } from '@/components/features/transfer/TransferLoadingScreen/TransferLoadingScreen';
import { TransferSuccessScreen } from '@/components/features/transfer/TransferSuccessScreen/TransferSuccessScreen';
import { PaymentScreen } from '@/components/features/transfer/PaymentScreen';

// Bank Card inside blue card
function BankMiniCard({ 
  id,
  name, 
  rate, 
  bonus, 
  isSelected, 
  onPress,
}: { 
  id: string;
  name: string; 
  rate: number; 
  bonus: string; 
  isSelected: boolean; 
  onPress: () => void;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Dynamic Styles
  // LIGHT MODE: Card=#FFFFFF, Text=#000000, LogoBg=#F5F5F5, SelectedBg=#F1F8E9
  // DARK MODE:  Card=#1E1E1E, Text=#FFFFFF, LogoBg=#333333, SelectedBg=#2A2A2A
  
  const cardBg = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const logoBg = isDark ? '#333333' : '#F5F5F5';
  const selectedBg = isDark ? '#2A2A2A' : '#F1F8E9'; 
  const selectedBorder = '#4CAF50'; 

  return (
    <TouchableOpacity 
      style={[
        styles.bankMiniCard, 
        { backgroundColor: isSelected ? selectedBg : cardBg },
        isSelected && { borderColor: selectedBorder, borderWidth: 2 }
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.bankLogoContainer, { backgroundColor: logoBg }]}>
        <BankLogo bankId={id} size="xs" />
        {isSelected && (
          <View style={styles.selectedBadge}>
            <Ionicons name="checkmark" size={10} color="#FFF" />
          </View>
        )}
      </View>
      <View style={styles.bankMiniInfo}>
        <Text style={[styles.bankMiniName, { color: textColor }]} numberOfLines={1}>{name}</Text>
        <Text style={styles.bankMiniRate}>{rate} ETB</Text>
      </View>
      <View style={styles.bankMiniBonus}>
        {/* Bonus text styling - already static green, looks fine in both modes */}
        <Text style={styles.bonusText}>{bonus}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const {
    banks,
    selectedBank,
    amount,
    convertedAmount,
    totalAmount,
    bonusAmount,
    selectBank,
    updateAmount,
  } = useBankRates();
  const { user, signIn, signUp, signOut, signInWithGoogle, signInWithApple } = useAuth();
  const { toggleTheme } = useThemeActions();

  const [showSignIn, setShowSignIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Transfer Flow States
  const [flowStep, setFlowStep] = useState<'home' | 'sendMoney' | 'loading' | 'payment' | 'success'>('home');
  const [transferData, setTransferData] = useState<TransferData | null>(null);
  const [transactionId, setTransactionId] = useState('');

  const handleAvatarPress = () => {
    if (user) {
      setShowProfile(true);
    } else {
      setShowSignIn(true);
    }
  };

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setFlowStep('sendMoney');
  };

  const handleSendMoneyContinue = (data: TransferData) => {
    setTransferData(data);
    setFlowStep('loading');
    const txId = 'Iz1HIHBjaA' + Math.random().toString(36).substr(2, 4).toUpperCase();
    setTransactionId(txId);
  };

  const handleLoadingFinish = () => {
    setFlowStep('payment');
  };

  const handlePaySecurely = () => {
    setFlowStep('success');
  };

  const handleSuccessClose = () => {
    setFlowStep('home');
    setTransferData(null);
    setTransactionId('');
    updateAmount('');
  };

  const hasAmount = parseFloat(amount) > 0;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <Header
        userName={user?.displayName?.[0] || user?.email?.[0] || 'U'}
        onAvatarPress={handleAvatarPress}
        onThemeToggle={toggleTheme}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Main Card - Blue (Dark) or Green (Light) */}
          <LinearGradient
            colors={['#002E5D', '#031E3C']}
            style={styles.mainCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Enter Amount Label */}
            <Text style={styles.enterAmountLabel}>Enter amount</Text>

            {/* Amount Row */}
            <View style={styles.amountRow}>
              <View style={styles.inputSection}>
                <Text style={styles.dollarSign}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={updateAmount}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  selectionColor="#FFF"
                />
              </View>
              <View style={styles.convertedSection}>
                <Text style={styles.convertedAmount}>
                  {Number(totalAmount).toFixed(2)} <Text style={{fontSize: 16, color: '#4CAF50', fontWeight: '700'}}>ETB</Text>
                </Text>
              </View>
            </View>

            {/* Bank Cards Grid */}
            <View style={styles.bankGrid}>
              <View style={styles.bankRow}>
                {banks.slice(0, 2).map(bank => (
                  <BankMiniCard
                    key={bank.id}
                    id={bank.id}
                    name={bank.name}
                    rate={bank.rate}
                    bonus={bank.bonus}
                    isSelected={selectedBank?.id === bank.id}
                    onPress={() => selectBank(bank)}
                  />
                ))}
              </View>
              <View style={styles.bankRow}>
                {banks.slice(2, 4).map(bank => (
                  <BankMiniCard
                    key={bank.id}
                    id={bank.id}
                    name={bank.name}
                    rate={bank.rate}
                    bonus={bank.bonus}
                    isSelected={selectedBank?.id === bank.id}
                    onPress={() => selectBank(bank)}
                  />
                ))}
              </View>
            </View>

            {/* Continue Button - Only show when amount > 0 */}
            {hasAmount && (
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            )}
          </LinearGradient>

          <PromoBanner />

          <BankRatesList
            banks={banks}
            selectedBankId={selectedBank?.id}
            onSelectBank={selectBank}
          />
        </View>
      </ScrollView>

      {/* Send Money Modal */}
      <SendMoneyModal
        visible={flowStep === 'sendMoney'}
        onClose={() => setFlowStep('home')}
        onContinue={handleSendMoneyContinue}
        amount={amount}
        convertedAmount={convertedAmount}
        senderName={user?.displayName || ''}
        senderEmail={user?.email || ''}
      />

      {/* Transfer Loading */}
      <TransferLoadingScreen
        visible={flowStep === 'loading'}
        onFinish={handleLoadingFinish}
      />

      {/* Payment Screen (Personal Info + Card - ONE page) */}
      <Modal visible={flowStep === 'payment'} animationType="slide">
        <PaymentScreen
          visible={flowStep === 'payment'}
          onPaySecurely={handlePaySecurely}
          onBack={() => setFlowStep('loading')}
          transactionId={transactionId}
          recipientName={transferData?.recipientName || 'Recipient'}
          bankName={transferData?.bankType === 'abyssinia' ? 'Abyssinia Bank' : 'Other Bank'}
          amount={amount}
        />
      </Modal>

      {/* Success Screen */}
      <TransferSuccessScreen
        visible={flowStep === 'success'}
        onClose={handleSuccessClose}
        amount={amount}
        recipientName={transferData?.recipientName || 'Recipient'}
      />

      {/* Sign In Modal */}
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
        onSignInWithGoogle={async () => {
          await signInWithGoogle();
          setShowSignIn(false);
        }}
        onSignInWithApple={async () => {
          await signInWithApple();
          setShowSignIn(false);
        }}
        onForgotPassword={() => {
          alert("Forgot password - check your email for reset link");
        }}
      />

      {/* Profile Modal */}
      <ProfileModal
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        userName={user?.displayName || 'User'}
        userEmail={user?.email || 'email@example.com'}
        onEditProfile={() => {}}
        onChangePassword={() => {}}
        onToggleTheme={toggleTheme}
        onChangeLanguage={() => {}}
        onSupport={() => {}}
        onSignOut={() => {
          signOut();
          setShowProfile(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  mainCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  enterAmountLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dollarSign: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFF',
    marginRight: 4,
    opacity: 0.8,
  },
  amountInput: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFF',
    minWidth: 100,
    padding: 0,
    height: 50,
    // Add bottom border for focus
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  convertedSection: {
    alignItems: 'flex-end',
  },
  convertedAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  bankGrid: {
    gap: 12,
    marginBottom: 12,
  },
  bankRow: {
    flexDirection: 'row',
    gap: 12,
  },
  bankMiniCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 10,
    gap: 10,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0, // Default no border
  },
  // bankMiniCardSelected removed - handled inline
  bankLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4CAF50',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  bankMiniInfo: {
    flex: 1,
  },
  bankMiniName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  bankMiniRate: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4CAF50', // Green rate
  },
  bankMiniBonus: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bonusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
  },
  continueButton: {
    backgroundColor: '#8BC34A', // Brand Green
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
