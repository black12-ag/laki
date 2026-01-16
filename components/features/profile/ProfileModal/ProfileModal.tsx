import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

export interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onToggleTheme?: () => void;
  onChangeLanguage?: () => void;
  onSupport?: () => void;
  onSignOut?: () => void;
}

export function ProfileModal({
  visible,
  onClose,
  userName = 'JOKER', // Default name from screenshot
  userEmail = 'user@example.com',
  onEditProfile,
  onChangePassword,
  onToggleTheme,
  onChangeLanguage,
  onSupport,
  onSignOut,
}: ProfileModalProps) {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getAvatarLetter = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'J';
  };

  // Dynamic Colors
  const bgColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const itemBg = isDark ? '#2A2A2A' : '#FFFFFF';
  const itemBorder = isDark ? '#333' : '#F0F0F0';
  const iconBoxBg = isDark ? '#333' : '#F5F5F5';
  const iconColor = isDark ? '#CCC' : '#333';
  const closeBtnBg = isDark ? '#333' : '#F0F0F0';

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: bgColor }]}>
          {/* Header with Close Button */}
          <View style={styles.header}>
             {/* Profile Avatar Large */}
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { borderColor: bgColor }]}>
                <Text style={styles.avatarText}>{getAvatarLetter(userName)}</Text>
              </View>
              {/* Green active dot */}
              <View style={[styles.activeDot, { borderColor: bgColor }]} />
            </View>

            <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: closeBtnBg }]}>
              <Ionicons name="close" size={20} color={iconColor} />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: textColor }]}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editProfileButton} onPress={onEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>


          {/* Settings List */}
          <View style={styles.settingsList}>
            {/* Change Password */}
            <TouchableOpacity style={[styles.settingItem, { backgroundColor: itemBg, borderColor: itemBorder }]} onPress={onChangePassword}>
               <View style={[styles.settingIconBox, { backgroundColor: iconBoxBg }]}>
                 <Ionicons name="lock-closed-outline" size={20} color={iconColor} />
               </View>
               <Text style={[styles.settingText, { color: textColor }]}>Change Password</Text>
               <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>

            {/* Dark/Light Mode */}
            <TouchableOpacity style={[styles.settingItem, { backgroundColor: itemBg, borderColor: itemBorder }]} onPress={onToggleTheme}>
               <View style={[styles.settingIconBox, {backgroundColor: isDark ? 'rgba(139, 195, 74, 0.2)' : '#F1F8E9'}]}>
                 <Ionicons name={isDark ? "moon-outline" : "sunny-outline"} size={20} color="#8BC34A" />
               </View>
               <Text style={[styles.settingText, { color: textColor }]}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
               <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>

             {/* Language */}
            <TouchableOpacity style={[styles.settingItem, { backgroundColor: itemBg, borderColor: itemBorder }]} onPress={onChangeLanguage}>
               <View style={[styles.settingIconBox, {backgroundColor: isDark ? 'rgba(139, 195, 74, 0.2)' : '#F1F8E9'}]}>
                 <Ionicons name="globe-outline" size={20} color="#8BC34A" />
               </View>
               <Text style={[styles.settingText, { color: textColor }]}>Language</Text>
               <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.sectionHeader}>LEGAL & HELP</Text>

          {/* Support */}
           <TouchableOpacity style={[styles.settingItem, { backgroundColor: itemBg, borderColor: itemBorder }]} onPress={onSupport}>
               <View style={[styles.settingIconBox, { backgroundColor: iconBoxBg }]}>
                 <Ionicons name="help-circle-outline" size={20} color={iconColor} />
               </View>
               <Text style={[styles.settingText, { color: textColor }]}>Support</Text>
               <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>

          {/* Sign Out Button */}
          <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
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
    padding: 24,
  },
  container: {
    borderRadius: 32,
    padding: 24,
    paddingBottom: 32,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    marginTop: 10,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9CCC65',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF', // Should be dynamic? Or kept white for avatar border/contrast? Let's keep white for specific look or adapt? 
    // Screenshot usually implies white borders around avatars. I'll make it adaptable in inline styles if needed.
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -10,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#888',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9CCC65',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginRight: 4,
  },
  settingsList: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  settingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#AAA',
    marginBottom: 12,
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: 1,
  },
  signOutButton: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: '#FF5252',
    fontWeight: '600',
    fontSize: 15,
  },
});
