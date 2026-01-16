import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useThemeColors } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';

export interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const colors = useThemeColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.tab,
              {
                backgroundColor: isSelected ? colors.primary : colors.cardBackground,
                borderColor: isSelected ? colors.primary : colors.border,
              },
            ]}
            onPress={() => onSelectCategory(category)}
            activeOpacity={0.7}
          >
            {category === 'All' && (
              <Ionicons
                name="checkmark"
                size={14}
                color={isSelected ? '#FFFFFF' : colors.text}
                style={styles.icon}
              />
            )}
            <Text
              variant="bodySmall"
              weight="medium"
              color={isSelected ? '#FFFFFF' : colors.text}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  icon: {
    marginRight: 6,
  },
});
