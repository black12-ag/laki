import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TextInput, Image, ActivityIndicator, Alert, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks';
import Svg, { Path } from 'react-native-svg';

// Google "G" Logo SVG Component
function GoogleLogo() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </Svg>
  );
}

export interface SignInModalProps {
  visible: boolean;
  onClose: () => void;
  onSignIn?: (email: string, password: string) => Promise<void>;
  onSignUp?: (email: string, password: string, fullName: string) => Promise<void>;
  onSignInWithGoogle?: () => void;
  onSignInWithApple?: () => void;
  onForgotPassword?: () => void;
  onResetPassword?: (email: string) => Promise<void>;
}

export function SignInModal({
  visible,
  onClose,
  onSignIn,
  onSignUp,
  onSignInWithGoogle,
  onSignInWithApple,
  onForgotPassword, // Deprecated/Used as trigger if needed, but we handle internally now
  onResetPassword,
}: SignInModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  // Dynamic Colors
  const bgColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const subTextColor = isDark ? '#AAA' : '#999';
  const inputBg = isDark ? '#2A2A2A' : '#FFFFFF';
  const inputBorder = isDark ? '#333' : '#E5E5E5';
  const buttonBorder = isDark ? '#333' : '#E5E5E5';
  const buttonBg = isDark ? '#2A2A2A' : '#FFFFFF';

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when modal closes or mode changes
  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLoading(false);
    // Note: We don't reset 'isResetting' here to keep the view stable if just clearing fields
  };

  const handleSubmit = async () => {
    // Validation
    if (!email) {
       Alert.alert('Error', 'Please enter your email address');
       return;
    }

    if (!isResetting && !password) {
        Alert.alert('Error', 'Please enter your password');
        return;
    }

    if (isRegistering) {
        if (!fullName) {
             Alert.alert('Error', 'Please enter your full name');
             return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
    }

    setIsLoading(true);
    try {
      if (isResetting) {
        await onResetPassword?.(email);
        Alert.alert('Success', 'Password reset email sent! Check your inbox.');
        setIsResetting(false); // Go back to login on success
      } else if (isRegistering) {
        await onSignUp?.(email, password, fullName);
      } else {
        await onSignIn?.(email, password);
      }
      resetForm();
    } catch (error: any) {
      const action = isResetting ? 'Reset Failed' : (isRegistering ? 'Registration Failed' : 'Sign In Failed');
      Alert.alert(action, error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
      setIsRegistering(!isRegistering);
      setIsResetting(false);
      resetForm();
  };

  const handleForgotPasswordPress = () => {
      setIsResetting(true);
      setIsRegistering(false);
      resetForm();
  };

  const backToSignIn = () => {
      setIsResetting(false);
      setIsRegistering(false);
      resetForm();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: bgColor }]}>
          
          {/* Header & Lock Icon - Only show in Login mode or if enough space */}
          {!isRegistering && !isResetting && (
             <View style={styles.header}>
               <View style={[styles.lockIconContainer, { borderColor: bgColor }]}>
                 <Ionicons name="lock-closed" size={24} color="#FFF" />
               </View>
             </View>
          )}

          {/* Reset Password Header */}
          {isResetting && (
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: textColor, marginBottom: 8 }}>Reset Password</Text>
                  <Text style={{ fontSize: 14, color: subTextColor, textAlign: 'center' }}>Enter your email to receive a reset link</Text>
              </View>
          )}
          
          <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: isDark ? '#333' : '#F5F5F5' }]}>
              <Ionicons name="close" size={18} color={isDark ? '#AAA' : '#666'} />
          </TouchableOpacity>

          {/* Social Buttons - Hide when resetting */}
          {!isResetting && (
              <>
                <TouchableOpacity style={[
                    styles.socialButton, 
                    { backgroundColor: buttonBg, borderColor: buttonBorder }
                ]} onPress={onSignInWithGoogle}>
                    <GoogleLogo />
                    <Text style={[styles.socialButtonText, { color: textColor }]}>  Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.socialButton, 
                    { backgroundColor: buttonBg, borderColor: buttonBorder }
                ]} onPress={onSignInWithApple}>
                    <Ionicons name="logo-apple" size={20} color={textColor} />
                    <Text style={[styles.socialButtonText, { color: textColor }]}>  Continue with Apple</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={[styles.divider, { backgroundColor: inputBorder }]} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={[styles.divider, { backgroundColor: inputBorder }]} />
                </View>
              </>
          )}

          {/* Input Fields */}
          {isRegistering && (
            <>
                <Text style={[styles.label, { color: textColor }]}>Full Name</Text>
                <TextInput
                    placeholder="Full Name"
                    style={[styles.input, { 
                      backgroundColor: inputBg, 
                      borderColor: inputBorder, 
                      color: textColor 
                    }]}
                    placeholderTextColor={subTextColor}
                    value={fullName}
                    onChangeText={setFullName}
                />
            </>
          )}

          <Text style={[styles.label, { color: textColor }]}>Email Address</Text>
          <TextInput
            placeholder="Email Address"
            style={[styles.input, { 
              backgroundColor: inputBg, 
              borderColor: inputBorder, 
              color: textColor 
            }]}
            placeholderTextColor={subTextColor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {!isResetting && (
              <>
                <Text style={[styles.label, { color: textColor }]}>Password</Text>
                <View style={[styles.passwordInputContainer, { 
                    backgroundColor: inputBg, 
                    borderColor: inputBorder 
                }]}>
                    <TextInput
                    placeholder="Password"
                    style={[styles.passwordInput, { color: textColor }]}
                    placeholderTextColor={subTextColor}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={subTextColor} />
                    </TouchableOpacity>
                </View>
              </>
          )}

          {isRegistering && (
             <>
                <Text style={[styles.label, { color: textColor }]}>Confirm Password</Text>
                <View style={[styles.passwordInputContainer, { 
                    backgroundColor: inputBg, 
                    borderColor: inputBorder 
                }]}>
                    <TextInput
                    placeholder="Confirm Password"
                    style={[styles.passwordInput, { color: textColor }]}
                    placeholderTextColor={subTextColor}
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color={subTextColor} />
                    </TouchableOpacity>
                </View>
             </>
          )}

          {!isRegistering && !isResetting && (
            <TouchableOpacity onPress={handleForgotPasswordPress} style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {/* Action Button */}
          <TouchableOpacity 
            style={[styles.actionButton, isLoading && styles.disabledButton, (isRegistering || isResetting) && { marginTop: 24 }]} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.actionButtonText}>
                  {isResetting ? 'Send Reset Link' : (isRegistering ? 'Sign up' : 'Sign in')}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            {isResetting ? (
                <TouchableOpacity onPress={backToSignIn}>
                    <Text style={styles.linkText}>Back to Sign In</Text>
                </TouchableOpacity>
            ) : (
                <>
                    <Text style={styles.footerText}>
                        {isRegistering ? 'Already have an account? ' : "Don't you have an account? "}
                    </Text>
                    <TouchableOpacity onPress={toggleMode}>
                    <Text style={styles.linkText}>
                        {isRegistering ? 'Sign in' : 'Register'}
                    </Text>
                    </TouchableOpacity>
                </>
            )}
          </View>

        </View>
      </View>
    </Modal>
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
    padding: 24,
    paddingTop: 32,
    paddingBottom: 28,
    width: '100%',
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -40, // Pull up to float the icon
  },
  lockIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#7CB342', 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#7CB342', // Green color
    fontWeight: '600',
    fontSize: 13,
  },
  actionButton: {
    backgroundColor: '#8BC34A', // Lighter green match
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#8BC34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  linkText: {
    color: '#7CB342',
    fontWeight: '700',
    fontSize: 14,
  },
});
