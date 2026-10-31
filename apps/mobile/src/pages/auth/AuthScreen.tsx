import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ChevronLeft } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { AuthFormDeck } from './AuthFormDeck';

export interface AuthScreenProps {
  initialMode?: 'sign-in' | 'sign-up';
}

/**
 * Unified Auth Screen featuring the "Shared Horizon" Card Morph transition.
 * Keeps the brand header and outer white sheet stationary while fluidly morphing
 * between Sign In and Sign Up using 60fps spring physics.
 */
export function AuthScreen({ initialMode = 'sign-in' }: AuthScreenProps) {
  const router = useRouter();
  const [currentMode, setCurrentMode] = useState<'sign-in' | 'sign-up'>(initialMode);
  const modeProgress = useSharedValue(initialMode === 'sign-up' ? 1 : 0);

  useEffect(() => {
    switchMode(initialMode);
  }, [initialMode]);

  const switchMode = (newMode: 'sign-in' | 'sign-up') => {
    setCurrentMode(newMode);
    modeProgress.value = withSpring(newMode === 'sign-up' ? 1 : 0, {
      damping: 18,
      stiffness: 125,
      mass: 0.9,
    });
  };

  const handleBack = () => {
    if (currentMode === 'sign-up') {
      switchMode('sign-in');
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  };

  // ─── Header Animated Styles ──────────────────────────────────────────

  const containerBgAnimStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      modeProgress.value,
      [0, 1],
      ['#0B1F3A', '#F3F6FA'],
    ),
  }));

  const backBtnAnimStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      modeProgress.value,
      [0, 1],
      ['rgba(255, 255, 255, 0.12)', '#FFFFFF'],
    ),
    borderColor: interpolateColor(
      modeProgress.value,
      [0, 1],
      ['rgba(255, 255, 255, 0.08)', '#E1E9F3'],
    ),
  }));

  const arrowLeftIconAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(modeProgress.value, [0, 0.4], [1, 0], 'clamp'),
  }));

  const chevronLeftIconAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(modeProgress.value, [0.6, 1], [0, 1], 'clamp'),
  }));

  const logoTextAnimStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      modeProgress.value,
      [0, 1],
      ['#FFFFFF', '#102544'],
    ),
    fontSize: interpolate(modeProgress.value, [0, 1], [24, 17], 'clamp'),
    letterSpacing: interpolate(modeProgress.value, [0, 1], [8, 6], 'clamp'),
  }));

  const sloganAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(modeProgress.value, [0, 0.35], [1, 0], 'clamp'),
    height: interpolate(modeProgress.value, [0, 0.6], [18, 0], 'clamp'),
    marginTop: interpolate(modeProgress.value, [0, 0.6], [6, 0], 'clamp'),
  }));

  return (
    <Animated.View style={[styles.rootContainer, containerBgAnimStyle]}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={currentMode === 'sign-up' ? 'dark' : 'light'} />

        {/* ── Brand Header (Anchored stationary horizon) ─────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-5">
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel={currentMode === 'sign-up' ? 'Back to sign in' : 'Go back'}
            activeOpacity={0.8}
          >
            <Animated.View style={[styles.backButton, backBtnAnimStyle]}>
              <Animated.View style={[styles.iconLayer, arrowLeftIconAnimStyle]}>
                <ArrowLeft size={18} color="#FFFFFF" />
              </Animated.View>
              <Animated.View style={[styles.iconLayer, chevronLeftIconAnimStyle]}>
                <ChevronLeft size={22} color="#102544" strokeWidth={2.5} />
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>

          <View className="items-center justify-center">
            <Animated.Text style={[styles.logoText, logoTextAnimStyle]}>
              COSTLY
            </Animated.Text>
            <Animated.View style={[styles.sloganWrapper, sloganAnimStyle]}>
              <Text className="text-cyan text-[12px] font-medium tracking-[0.5px]">
                Which Never Costs You
              </Text>
            </Animated.View>
          </View>

          {/* Spacer to keep COSTLY centered */}
          <View style={styles.headerSpacer} />
        </View>

        {/* ── Morphing Card Sheet ──────────────────────────────────── */}
        <View className="flex-1 bg-surface rounded-t-[36px] shadow-sm overflow-hidden">
          <AuthFormDeck
            initialMode={initialMode}
            onModeChange={(newMode) => setCurrentMode(newMode)}
            sharedProgress={modeProgress}
          />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLayer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: '900',
  },
  sloganWrapper: {
    overflow: 'hidden',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
});

export default AuthScreen;
