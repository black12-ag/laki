import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Path, G, Rect } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing,
  withDelay
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function MoneyTransferAnimation() {
  // Animation values
  const moneyX = useSharedValue(0);
  const moneyY = useSharedValue(0);
  const moneyScale = useSharedValue(0);
  const person1Scale = useSharedValue(1);
  const person2Scale = useSharedValue(1);
  
  useEffect(() => {
    // Money flight path
    moneyX.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }), // Start at Person A
        withTiming(150, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }), // Fly to Person B
        withDelay(500, withTiming(0, { duration: 0 })) // Reset
      ),
      -1,
      false
    );

    // Money arc (simple parabolic approximation via translation)
    moneyY.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(-40, { duration: 750, easing: Easing.out(Easing.quad) }), // Up
        withTiming(0, { duration: 750, easing: Easing.in(Easing.quad) }),   // Down
        withDelay(500, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );

    // Money appearance
    moneyScale.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: 300 }), // Appear
        withDelay(1200, withTiming(0, { duration: 200 })), // Disappear at destination
        withDelay(300, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );

    // Person A pulsation
    person1Scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
    
    // Person B bounce on receive
    person2Scale.value = withRepeat(
      withSequence(
         withDelay(1400, withTiming(1.1, { duration: 200 })),
         withTiming(1, { duration: 200 }),
         withDelay(1500, withTiming(1, { duration: 0 }))
      ),
      -1,
      false
    );

  }, []);

  const moneyStyle = useAnimatedProps(() => ({
    transform: [
      { translateX: moneyX.value },
      { translateY: moneyY.value },
      { scale: moneyScale.value }
    ],
  }));

  const person1Style = useAnimatedProps(() => ({
     transform: [{ scale: person1Scale.value }]
  }));

  const person2Style = useAnimatedProps(() => ({
     transform: [{ scale: person2Scale.value }]
  }));

  return (
    <View style={styles.container}>
      <Svg height="200" width="300" viewBox="0 0 300 200">
        {/* Person A (Sender - Man) */}
        <AnimatedG x="50" y="100" animatedProps={person1Style}>
          <Circle cx="0" cy="0" r="25" fill="#E0E0E0" />
          <Circle cx="0" cy="-35" r="15" fill="#E0E0E0" />
          {/* Simple Shirt */}
          <Path d="M-20 0 Q0 20 20 0 V30 H-20 Z" fill="#4FC3F7" />
          <Text x="-20" y="60" fontSize="12" fill="#666">You</Text>
        </AnimatedG>

        {/* Person B (Receiver - Mom) */}
        <AnimatedG x="250" y="100" animatedProps={person2Style}>
          <Circle cx="0" cy="0" r="25" fill="#E0E0E0" />
          <Circle cx="0" cy="-35" r="15" fill="#E0E0E0" />
          {/* Dress */}
          <Path d="M-20 0 Q0 20 20 0 L25 35 H-25 Z" fill="#F06292" />
          {/* Hair bun */}
          <Circle cx="0" cy="-50" r="8" fill="#BDBDBD" />
           <Text x="-15" y="60" fontSize="12" fill="#666">Mom</Text>
        </AnimatedG>

        {/* Flying Money Bill */}
        <AnimatedG x="50" y="80" animatedProps={moneyStyle}>
           <Rect x="-15" y="-10" width="30" height="20" fill="#66BB6A" rx="2" />
           <Circle cx="0" cy="0" r="6" fill="#81C784" />
           <Text x="-18" y="-15" fontSize="10" fill="#388E3C">$</Text>
        </AnimatedG>

        {/* Connection Line (Dashed) */}
        <Path 
          d="M75 100 Q150 150 225 100" 
          fill="none" 
          stroke="#E0E0E0" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
        />
      </Svg>
    </View>
  );
}
// Helper Text component for SVG since native Text doesn't work inside SVG
const Text = ({ x, y, fontSize, fill, children }: any) => (
  <SvgText x={x} y={y} fontSize={fontSize} fill={fill} fontWeight="bold" textAnchor="middle">
    {children}
  </SvgText>
);

import { Text as SvgText } from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});
