import { useState, useEffect, createContext, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  updateProfile,
  signInAnonymously,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Platform, Alert } from 'react-native';

// Required for auth session
WebBrowser.maybeCompleteAuthSession();

// Google OAuth Client IDs from GoogleService-Info.plist
const GOOGLE_IOS_CLIENT_ID = '701952682899-e4crdjg1cenmn45omf7t2q66ah7spcei.apps.googleusercontent.com';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Google Auth Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
  });

  // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then((result) => {
            console.log('Google Sign-In successful:', result.user.email);
          })
          .catch((error) => {
            console.error('Google Sign-In error:', error);
            Alert.alert('Error', 'Google Sign-In failed');
          });
      }
    }
  }, [response]);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log("Auth state changed, user:", authUser ? authUser.email : "null");
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with full name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: fullName
        });
        // Force refresh user to get updated profile
        setUser({ ...userCredential.user, displayName: fullName });
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      if (promptAsync) {
        await promptAsync();
      } else {
        Alert.alert('Error', 'Google Sign-In is not available');
      }
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      throw error;
    }
  };

  const signInWithApple = async () => {
    try {
      if (Platform.OS !== 'ios') {
        Alert.alert('Not Available', 'Apple Sign-In is only available on iOS devices');
        return;
      }
      
      // Dynamically import to avoid issues on non-iOS platforms
      const AppleAuthentication = await import('expo-apple-authentication');
      
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Create Firebase credential from Apple credential
      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: appleCredential.identityToken!,
      });

      await signInWithCredential(auth, credential);
      console.log('Apple Sign-In successful');
    } catch (error: any) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        console.log('User cancelled Apple Sign-In');
      } else {
        console.error("Apple Sign-In error:", error);
        Alert.alert('Error', 'Apple Sign-In failed: ' + error.message);
      }
    }
  };

  const signInAsGuest = async () => {
      try {
          await signInAnonymously(auth);
      } catch (error: any) {
          console.error("Guest Sign-In error:", error);
          throw error;
      }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signInWithApple, signInAsGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Export types for external use
export type { User };
export interface AuthState {
  user: User | null;
  loading: boolean;
}
