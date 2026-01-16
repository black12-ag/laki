import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors, useColorScheme } from '@/hooks';
import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';

export interface HeaderProps {
  userName?: string;
  showThemeToggle?: boolean;
  onAvatarPress?: () => void;
  onThemeToggle?: () => void;
}

// LakiRemit Logo Component
function LakiRemitLogo() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={logoStyles.container}>
      {/* Small Logo Image */}
      <Image 
        source={require('@/assets/images/icon.png')} 
        style={logoStyles.logoImage}
        resizeMode="contain"
      />
      {/* Text */}
      <Text style={[logoStyles.lakiText, { color: isDark ? '#FFFFFF' : '#1A1A1A' }]}>Laki</Text>
      <Text style={logoStyles.remitText}>Remit</Text>
    </View>
  );
}

const logoStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 28,
    height: 28,
    marginRight: 8,
    borderRadius: 6,
  },
  lakiText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A', // Will be overridden by theme usually, but explicit here
  },
  remitText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
  },
});

export function Header({
  userName = 'U',
  showThemeToggle = true,
  onAvatarPress,
  onThemeToggle,
}: HeaderProps) {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  
  // Use explicit toggle function if provided, otherwise assume parent handles it or use local toggle ref
  const handleThemeToggle = () => {
      if (onThemeToggle) {
          onThemeToggle();
      } else {
        // Fallback or context based toggle if available globally
        // For now, relies on prop
      }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colorScheme === 'dark' ? colors.background : '#FFFFFF' }]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? colors.background : '#FFFFFF'}
      />
      <View style={styles.content}>
        {/* Avatar */}
        <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.7}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
          </View>
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <LakiRemitLogo />
        </View>

        {/* Theme Toggle */}
        {showThemeToggle && (
          <TouchableOpacity onPress={onThemeToggle} style={styles.themeButton} activeOpacity={0.7}>
            <Ionicons
              name={colorScheme === 'dark' ? 'moon' : 'sunny-outline'}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  themeButton: {
    padding: 8,
  },
});
