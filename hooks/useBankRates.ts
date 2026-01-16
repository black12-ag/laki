import { useState, useCallback, useMemo } from 'react';

export interface Bank {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  rate: number;
  bonus: string;
  bonusType: 'flat' | 'percentage';
  color: string;
}

export interface ExchangeRate {
  bankId: string;
  rate: number;
  lastUpdated: Date;
}

// Bank data matching the exact screenshots
const BANKS: Bank[] = [
  {
    id: 'cbe',
    name: 'CBE',
    shortName: 'CBE',
    logo: 'cbe',
    rate: 164.6,
    bonus: '10 ETB',
    bonusType: 'flat',
    color: '#2E7D32',
  },
  {
    id: 'awash',
    name: 'Awash',
    shortName: 'Awash',
    logo: 'awash',
    rate: 154.9,
    bonus: '2%',
    bonusType: 'percentage',
    color: '#1565C0',
  },
  {
    id: 'oromia',
    name: 'Oromia Bank',
    shortName: 'Or...',
    logo: 'oromia',
    rate: 165.1,
    bonus: '10 ETB',
    bonusType: 'flat',
    color: '#43A047',
  },
  {
    id: 'abyssinia',
    name: 'Abyssinia Bank',
    shortName: 'Abyss...',
    logo: 'abyssinia',
    rate: 154.9,
    bonus: '2%',
    bonusType: 'percentage',
    color: '#F9A825',
  },
];

export function useBankRates() {
  const [selectedBank, setSelectedBank] = useState<Bank>(BANKS[0]);
  const [amount, setAmount] = useState<string>('0.0');
  const [isLoading, setIsLoading] = useState(false);

  const banks = useMemo(() => BANKS, []);

  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * selectedBank.rate).toFixed(1);
  }, [amount, selectedBank]);

  const bonusAmount = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    if (selectedBank.bonusType === 'flat') {
      return parseFloat(selectedBank.bonus.replace(' ETB', ''));
    }
    const percentage = parseFloat(selectedBank.bonus.replace('%', ''));
    return (numAmount * selectedBank.rate * percentage) / 100;
  }, [amount, selectedBank]);

  const totalAmount = useMemo(() => {
    const converted = parseFloat(convertedAmount) || 0;
    return (converted + bonusAmount).toFixed(1);
  }, [convertedAmount, bonusAmount]);

  const selectBank = useCallback((bank: Bank) => {
    setSelectedBank(bank);
  }, []);

  const updateAmount = useCallback((newAmount: string) => {
    // Only allow valid number input
    if (/^\d*\.?\d*$/.test(newAmount)) {
      setAmount(newAmount);
    }
  }, []);

  const refreshRates = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  }, []);

  return {
    banks,
    selectedBank,
    amount,
    convertedAmount,
    bonusAmount,
    totalAmount,
    isLoading,
    selectBank,
    updateAmount,
    refreshRates,
  };
}
