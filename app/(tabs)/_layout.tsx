import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useThemeColors } from '@/hooks';
import { View, StyleSheet } from 'react-native';

// Custom Tab Bar Icon component
function TabBarIcon({ 
  name, 
  color, 
  focused 
}: { 
  name: keyof typeof Ionicons.glyphMap; 
  color: string; 
  focused: boolean 
}) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name={name} size={24} color={color} />
    </View>
  );
}

export default function TabLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 88,
          paddingTop: 12,
          paddingBottom: 28,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'home' : 'home-outline'} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name="swap-horizontal" 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gifter"
        options={{
          title: 'Gifter',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'gift' : 'gift-outline'} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
