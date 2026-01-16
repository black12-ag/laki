import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  NativeSyntheticEvent,
  NativeScrollEvent 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32;

export interface PromoBannerProps {
  banners?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    icon?: 'home' | 'gift';
    buttonType?: 'stores';
  }>;
}

// Banner data matching the exact screenshots
const DEFAULT_BANNERS: Array<{
  id: string;
  title: string;
  subtitle: string;
  icon: 'home' | 'gift';
  buttonType: 'stores';
}> = [
  {
    id: '1',
    title: 'አባቴ በባለኝ',
    subtitle: 'ገንዘብ አዲስ\nየፈርም\nተገዛልኝ!',
    icon: 'home',
    buttonType: 'stores' // Google Play / App Store buttons
  },
  {
    id: '2',
    title: 'ልዩ ኮሚሽን',
    subtitle: 'በ LakiRemit ገንዘብ\nይላኩ እና ይቀበሉ',
    icon: 'gift',
    buttonType: 'stores'
  },
];

export function PromoBanner({ banners = DEFAULT_BANNERS }: PromoBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (BANNER_WIDTH + 12));
    setActiveIndex(index);
  };

  const formatViewCount = (count: string) => {
    // Basic formatting for "6562" -> "6.5k" logic if needed, but keeping exact text from prompt "6562"
    // User asked for "look 6562 veiew it they short number", implying small text
    return count;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={BANNER_WIDTH + 12}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map((banner) => (
          <View key={banner.id} style={[styles.bannerCard, { width: BANNER_WIDTH }]}>
            <LinearGradient
              colors={['#4CAF50', '#2E7D32']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              {/* LakiRemit Badge */}
              <View style={styles.logoBadge}>
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark" size={8} color="#4CAF50" />
                </View>
                <Text style={styles.logoText}>LakiRemit</Text>
              </View>

              <View style={styles.contentRow}>
                {/* Text Content - Left Side now */}
                <View style={styles.textContent}>
                  <Text style={styles.title}>{banner.title}</Text>
                  {banner.subtitle && (
                    <Text style={styles.subtitle}>{banner.subtitle}</Text>
                  )}
                  
                  {/* View count - small and short */}
                   <View style={styles.viewBadge}>
                    <Ionicons name="eye" size={12} color="#FFFFFF" />
                    <Text style={styles.viewCount}>6562</Text>
                  </View>
                </View>

                {/* Right - Image/Icon */}
                <View style={styles.imageContainer}>
                   {/* App Store / Google Play buttons vertical stack */}
                   <View style={styles.storeStack}>
                      <View style={styles.storeBadge}>
                        <Text style={styles.storeText}>Google Play</Text>
                      </View>
                      <View style={styles.storeBadge}>
                        <Text style={styles.storeText}>App Store</Text>
                      </View>
                   </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12, // Reduced vertical margin
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  bannerCard: {
    height: 110, 
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  gradient: {
    flex: 1,
    padding: 10,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  contentRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
    fontFamily: 'System', 
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 18,
    marginBottom: 8,
  },
  viewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCount: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  storeStack: {
    gap: 6,
  },
  storeBadge: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',
  },
  storeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
});
