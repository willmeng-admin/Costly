import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { SignInForm } from './SignInScreen';
import { SignUpForm } from './SignUpScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_DISTANCE = SCREEN_WIDTH * 0.75;

export interface AuthFormDeckProps {
  initialMode?: 'sign-in' | 'sign-up';
  isCurtain?: boolean;
  onModeChange?: (mode: 'sign-in' | 'sign-up') => void;
  sharedProgress?: SharedValue<number>;
}

/**
 * Reusable animated form deck that smoothly morphs between Sign In and Sign Up.
 * Can be used inside the SplashScreen curtain card or within the dedicated AuthScreen.
 */
export function AuthFormDeck({
  initialMode = 'sign-in',
  isCurtain = false,
  onModeChange,
  sharedProgress,
}: AuthFormDeckProps) {
  const [currentMode, setCurrentMode] = useState<'sign-in' | 'sign-up'>(initialMode);
  const localProgress = useSharedValue(initialMode === 'sign-up' ? 1 : 0);
  const progress = sharedProgress ?? localProgress;

  const switchMode = (newMode: 'sign-in' | 'sign-up') => {
    setCurrentMode(newMode);
    onModeChange?.(newMode);
    progress.value = withSpring(newMode === 'sign-up' ? 1 : 0, {
      damping: 18,
      stiffness: 125,
      mass: 0.9,
    });
  };

  const signInStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      transform: [
        {
          translateX: interpolate(p, [0, 1], [0, -SLIDE_DISTANCE], 'clamp'),
        },
      ],
      opacity: interpolate(p, [0, 0.7], [1, 0], 'clamp'),
    };
  });

  const signUpStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      transform: [
        {
          translateX: interpolate(p, [0, 1], [SLIDE_DISTANCE, 0], 'clamp'),
        },
      ],
      opacity: interpolate(p, [0.3, 1], [0, 1], 'clamp'),
    };
  });

  return (
    <View style={styles.container}>
      {/* Sign In Layer */}
      <Animated.View
        style={[styles.layer, signInStyle]}
        pointerEvents={currentMode === 'sign-in' ? 'auto' : 'none'}
      >
        <SignInForm
          isCurtain={isCurtain}
          onCreateAccountPress={() => switchMode('sign-up')}
        />
      </Animated.View>

      {/* Sign Up Layer */}
      <Animated.View
        style={[styles.layer, signUpStyle]}
        pointerEvents={currentMode === 'sign-up' ? 'auto' : 'none'}
      >
        <SignUpForm onSignInPress={() => switchMode('sign-in')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default AuthFormDeck;

