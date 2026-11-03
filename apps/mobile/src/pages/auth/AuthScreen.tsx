import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
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
import Svg, { Path, Rect, Line, Circle } from 'react-native-svg';
import { AuthFormDeck } from './AuthFormDeck';

// React 19 JSX compatibility wrappers for react-native-svg class components
const SvgComp = Svg as unknown as React.FC<any>;
const PathComp = Path as unknown as React.FC<any>;
const RectComp = Rect as unknown as React.FC<any>;
const LineComp = Line as unknown as React.FC<any>;
const CircleComp = Circle as unknown as React.FC<any>;

// Android check: TRUE on your Redmi Note 12 Pro+, FALSE on iPhone 13
export const isAndroid = Platform.OS === 'android';
export const AUTH_SVG_TOP = isAndroid ? 83 : 75;
export const AUTH_SVG_HEIGHT = isAndroid ? 165 : 145;

// ─── Background Construction & Skyline Illustration (Option 1: Minimalist Blueprint) ─

export function AuthConstructionBackground({
  style,
  width,
  height,
}: {
  style?: any;
  width?: number;
  height?: number;
}) {
  const base = (StyleSheet.flatten(styles.bgIllustrationContainer) || {}) as Record<string, any>;
  const custom = (StyleSheet.flatten(style) || {}) as Record<string, any>;
  const finalWidth = width ?? custom.width ?? base.width ?? 175;
  const finalHeight = height ?? custom.height ?? base.height ?? 145;

  return (
    <View
      style={[styles.bgIllustrationContainer, style, { width: finalWidth, height: finalHeight }]}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <SvgComp width={finalWidth} height={finalHeight} viewBox="0 0 175 145" fill="none">
        {/* Soft subtle blueprint glow */}
        <CircleComp cx={140} cy={50} r={60} fill="#1E3A8A" opacity={0.2} />

        {/* Faint distant city skyline silhouette */}
        <RectComp x={16} y={75} width={28} height={70} fill="#132B50" opacity={0.3} />

        {/* Mid-rise backdrop building */}
        <RectComp x={50} y={50} width={34} height={95} fill="#132E58" opacity={0.4} />
        <LineComp x1={50} y1={50} x2={84} y2={50} stroke="#60A5FA" strokeWidth={0.8} opacity={0.3} />
        <LineComp x1={67} y1={50} x2={67} y2={145} stroke="#60A5FA" strokeWidth={0.6} opacity={0.2} />
        <LineComp x1={50} y1={70} x2={84} y2={70} stroke="#60A5FA" strokeWidth={0.6} opacity={0.2} />
        <LineComp x1={50} y1={90} x2={84} y2={90} stroke="#60A5FA" strokeWidth={0.6} opacity={0.2} />
        <LineComp x1={50} y1={110} x2={84} y2={110} stroke="#60A5FA" strokeWidth={0.6} opacity={0.2} />

        {/* Structural High-Rise Wireframe Frame under construction */}
        <RectComp x={88} y={24} width={48} height={121} fill="#102544" opacity={0.45} />
        {/* Outer frame */}
        <LineComp x1={88} y1={24} x2={136} y2={24} stroke="#60A5FA" strokeWidth={1.2} opacity={0.55} />
        <LineComp x1={88} y1={24} x2={88} y2={145} stroke="#60A5FA" strokeWidth={1} opacity={0.45} />
        <LineComp x1={136} y1={24} x2={136} y2={145} stroke="#60A5FA" strokeWidth={1} opacity={0.45} />
        {/* Columns */}
        <LineComp x1={104} y1={24} x2={104} y2={145} stroke="#60A5FA" strokeWidth={0.8} opacity={0.4} />
        <LineComp x1={120} y1={24} x2={120} y2={145} stroke="#60A5FA" strokeWidth={0.8} opacity={0.4} />
        {/* Floor slabs */}
        <LineComp x1={88} y1={42} x2={136} y2={42} stroke="#60A5FA" strokeWidth={0.8} opacity={0.4} />
        <LineComp x1={88} y1={60} x2={136} y2={60} stroke="#60A5FA" strokeWidth={0.8} opacity={0.4} />
        <LineComp x1={88} y1={78} x2={136} y2={78} stroke="#60A5FA" strokeWidth={0.8} opacity={0.4} />
        <LineComp x1={88} y1={96} x2={136} y2={96} stroke="#60A5FA" strokeWidth={0.8} opacity={0.4} />
        <LineComp x1={88} y1={114} x2={136} y2={114} stroke="#60A5FA" strokeWidth={0.8} opacity={0.4} />

        {/* Minimalist Crane Tower on the Far Right */}
        <LineComp x1={150} y1={12} x2={150} y2={145} stroke="#93C5FD" strokeWidth={1.2} opacity={0.65} />
        <LineComp x1={156} y1={12} x2={156} y2={145} stroke="#93C5FD" strokeWidth={1.2} opacity={0.65} />
        {/* Spaced out cross braces */}
        <LineComp x1={150} y1={24} x2={156} y2={36} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />
        <LineComp x1={156} y1={36} x2={150} y2={48} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />
        <LineComp x1={150} y1={48} x2={156} y2={60} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />
        <LineComp x1={156} y1={60} x2={150} y2={72} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />
        <LineComp x1={150} y1={72} x2={156} y2={84} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />
        <LineComp x1={156} y1={84} x2={150} y2={96} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />
        <LineComp x1={150} y1={96} x2={156} y2={108} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />

        {/* Crane Operator Cabin & Apex */}
        <RectComp x={148} y={8} width={11} height={7} fill="#93C5FD" opacity={0.5} />
        <PathComp d="M 153 2 L 157 8 L 149 8 Z" fill="#93C5FD" opacity={0.6} />

        {/* Horizontal Jib (Boom) */}
        <LineComp x1={70} y1={8} x2={170} y2={8} stroke="#93C5FD" strokeWidth={1.3} opacity={0.65} />
        <LineComp x1={70} y1={10.5} x2={170} y2={10.5} stroke="#93C5FD" strokeWidth={0.7} opacity={0.4} />

        {/* Support Cables */}
        <LineComp x1={153} y1={2} x2={80} y2={8} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />
        <LineComp x1={153} y1={2} x2={120} y2={8} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />
        <LineComp x1={153} y1={2} x2={168} y2={8} stroke="#93C5FD" strokeWidth={0.7} opacity={0.45} />

        {/* Hoist Cable and Hook */}
        <LineComp x1={105} y1={10.5} x2={105} y2={28} stroke="#93C5FD" strokeWidth={0.7} opacity={0.5} />
        <RectComp x={103} y={28} width={4} height={3} fill="#93C5FD" opacity={0.6} />
      </SvgComp>
    </View>
  );
}

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
      ['#0B1B3D', '#F3F6FA'],
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
    fontSize: interpolate(modeProgress.value, [0, 1], [26, 18], 'clamp'),
    letterSpacing: interpolate(modeProgress.value, [0, 1], [7, 5], 'clamp'),
  }));

  const sloganAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(modeProgress.value, [0, 0.35], [1, 0], 'clamp'),
    height: interpolate(modeProgress.value, [0, 0.6], [20, 0], 'clamp'),
    marginTop: interpolate(modeProgress.value, [0, 0.6], [4, 0], 'clamp'),
  }));

  return (
    <Animated.View style={[styles.rootContainer, containerBgAnimStyle]}>
      {/* Decorative background skyline & crane in top-right */}
      <AuthConstructionBackground />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={currentMode === 'sign-up' ? 'dark' : 'light'} />

        {/* ── Brand Header Area ───────────────────────────────────── */}
        <View style={styles.headerArea}>
          {router.canGoBack() && (
            <TouchableOpacity
              onPress={handleBack}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel={currentMode === 'sign-up' ? 'Back to sign in' : 'Go back'}
              activeOpacity={0.8}
              style={styles.backButtonContainer}
            >
              <Animated.View style={[styles.backButton, backBtnAnimStyle]}>
                <Animated.View style={[styles.iconLayer, arrowLeftIconAnimStyle]}>
                  <ArrowLeft size={16} color="#FFFFFF" />
                </Animated.View>
                <Animated.View style={[styles.iconLayer, chevronLeftIconAnimStyle]}>
                  <ChevronLeft size={20} color="#102544" strokeWidth={2.5} />
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          )}

          <View style={styles.brandContainer}>
            <Animated.Text style={[styles.logoText, logoTextAnimStyle]}>
              COSTLY
            </Animated.Text>
            <Animated.View style={[styles.sloganWrapper, sloganAnimStyle]}>
              <Text style={styles.sloganText}>
                Which Never Costs You
              </Text>
            </Animated.View>
          </View>
        </View>

        {/* ── Morphing White Card Sheet ───────────────────────────── */}
        <View style={styles.cardSheet}>
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
  bgIllustrationContainer: {
    position: 'absolute',
    top: AUTH_SVG_TOP,
    right: 0,
    width: 175,
    height: AUTH_SVG_HEIGHT,
  },
  headerArea: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 28,
  },
  backButtonContainer: {
    marginBottom: 8,
    marginLeft: -4,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLayer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandContainer: {
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: '900',
  },
  sloganWrapper: {
    overflow: 'hidden',
  },
  sloganText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cardSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
  },
});

export default AuthScreen;
