import React, { useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { MoneyTransferAnimation } from '@/components/ui/MoneyTransferAnimation';

interface TransferLoadingScreenProps {
  visible: boolean;
  onFinish: () => void;
}

export function TransferLoadingScreen({ visible, onFinish }: TransferLoadingScreenProps) {
  const colors = useThemeColors();

  useEffect(() => {
    if (visible) {
      // Simulate network request duration
      const timer = setTimeout(() => {
        onFinish();
      }, 4000); // Increased to 4s to show off animation
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.animationContainer}>
          <MoneyTransferAnimation />
        </View>
        <Text style={[styles.text, { color: colors.text }]}>Sending Money...</Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>Securely transferring to Recipient</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  animationContainer: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.8
  }
});
