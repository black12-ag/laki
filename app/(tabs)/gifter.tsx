import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useThemeColors, useAuth } from '@/hooks';
import { Header } from '@/components/layout/Header';
import {
  SearchBar,
  CategoryTabs,
  InfluencerSection,
  MyGiftsBanner,
  Influencer,
} from '@/components/features/gifter';

// Sample data matching the screenshots
const CATEGORIES = ['All', 'Entertainment', 'Technology'];

const TECH_INFLUENCERS: Influencer[] = [
  {
    id: '1',
    name: 'Joel Talargie',
    username: 'joel_talargie',
    followers: '432.6K',
    isVerified: true,
    category: 'Technology',
  },
  {
    id: '2',
    name: 'Tech Review',
    username: 'tech_review',
    followers: '256.3K',
    isVerified: true,
    category: 'Technology',
  },
];

const ENTERTAINMENT_INFLUENCERS: Influencer[] = [
  {
    id: '3',
    name: 'Kidist',
    username: 'kidist',
    followers: '189.2K',
    isVerified: true,
    category: 'Entertainment',
  },
  {
    id: '4',
    name: 'makbel gashe',
    username: 'makbel_gashe',
    followers: '312.5K',
    isVerified: true,
    category: 'Entertainment',
  },
  {
    id: '5',
    name: 'ሀዘ',
    username: 'haze_eth',
    followers: '145.8K',
    isVerified: false,
    category: 'Entertainment',
  },
];

export default function GifterScreen() {
  const colors = useThemeColors();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleInfluencerPress = (influencer: Influencer) => {
    // Navigate to influencer profile
    console.log('Selected influencer:', influencer.name);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header userName={user?.name || 'U'} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search influencer..."
          />

          {/* Category Tabs */}
          <CategoryTabs
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Technology Section */}
          {(selectedCategory === 'All' || selectedCategory === 'Technology') && (
            <InfluencerSection
              title="Technology"
              influencers={TECH_INFLUENCERS}
              onSeeAll={() => {}}
              onInfluencerPress={handleInfluencerPress}
            />
          )}

          {/* Entertainment Section */}
          {(selectedCategory === 'All' || selectedCategory === 'Entertainment') && (
            <InfluencerSection
              title="Entertainment"
              influencers={ENTERTAINMENT_INFLUENCERS}
              onSeeAll={() => {}}
              onInfluencerPress={handleInfluencerPress}
            />
          )}
        </View>

        {/* My Gifts Banner */}
        <MyGiftsBanner onPress={() => {}} />
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
  },
});
