import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  interpolate,
  ReduceMotion,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { SPLASH_CONFIG } from '../../design-system/splash/splashConfig';
import skylineImage from '../../../assets/skyline_doodle.png';
import { AuthFormDeck } from '../auth';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Letter layout metrics
const LETTER_WIDTH = 32;
const LETTER_GAP = 8;
const LETTER_STEP = LETTER_WIDTH + LETTER_GAP;
const REEL_ITEM_HEIGHT = 44;

// Distinct financial & construction cost digits/symbols leading to final character
const DEFAULT_TICKER_SYMBOLS = ['$', '9', '4', '0', '8', '%', '2', '#', '7', '1', '5'];

function getReelForChar(targetChar: string, index: number): string[] {
  const count = 6;
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    items.push(DEFAULT_TICKER_SYMBOLS[(index * 3 + i) % DEFAULT_TICKER_SYMBOLS.length]);
  }
  items.push(targetChar);
  return items;
}

/**
 * Child component for each letter in "OSTLY" featuring a high-speed cost ticker / split-flap reel.
 * Numbers and financial symbols spin vertically and brake sequentially into the final letter.
 */
function TickerLetter({
  char,
  index,
  totalLetters,
  wordExpandProgress,
}: {
  char: string;
  index: number;
  totalLetters: number;
  wordExpandProgress: SharedValue<number>;
}) {
  const reelItems = useMemo(() => getReelForChar(char, index), [char, index]);
  const maxTranslate = (reelItems.length - 1) * REEL_ITEM_HEIGHT;

  const letterAnimStyle = useAnimatedStyle(() => {
    // Each reel starts spinning early as "C" slides left, but locks sequentially from left to right.
    const startProgress = 0.08 + index * 0.07;
    const endProgress = Math.min(1.0, 0.54 + index * 0.11);

    const rawProgress = interpolate(
      wordExpandProgress.value,
      [startProgress, endProgress],
      [0, 1],
      'clamp'
    );

    // Ease-out with subtle mechanical overshoot: fast roll, decelerating clack
    const t = rawProgress - 1;
    const c1 = 1.15;
    const c3 = c1 + 1;
    const eased =
      rawProgress === 0 ? 0 : rawProgress === 1 ? 1 : 1 + c3 * t * t * t + c1 * t * t;

    const translateY = -eased * maxTranslate;

    // Fade reel in as "C" starts sliding
    const opacity = interpolate(
      wordExpandProgress.value,
      [0, 0.15],
      [0, 1],
      'clamp'
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.restLetterBox}>
      <Animated.View style={letterAnimStyle}>
        {reelItems.map((item, i) => {
          const isFinal = i === reelItems.length - 1;
          return (
            <View key={`${item}-${i}`} style={styles.reelItem}>
              <Text
                style={[
                  styles.letterText,
                  isFinal ? styles.letterTextFinal : styles.letterTextSymbol,
                ]}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
}

export function SplashScreen() {
  const router = useRouter();

  // Dynamic brand configuration
  const brandName = SPLASH_CONFIG.brandName.trim();
  const firstLetter = brandName.charAt(0) || 'C';
  const restLetters = brandName.slice(1).split('');
  const restCount = restLetters.length;

  // Horizontal shift so firstLetter starts centered, then slides left as full word forms
  const initialCenterOffset = (restCount * LETTER_STEP) / 2;

  // ─── Animation Shared Values ───────────────────────────────────────────────

  // Phase 2: Skyline rising from bottom
  const skylineProgress = useSharedValue(0);

  // Phase 3: First letter climbing from behind buildings
  const monogramClimbProgress = useSharedValue(0);

  // Phase 4: Word expansion (first letter slides left, rest letters stagger in)
  const wordExpandProgress = useSharedValue(0);

  // Phase 5: Tagline pop & slight bounce
  const taglineProgress = useSharedValue(0);

  // Phase 6: Loader bar fade, fill, and pulse
  const loaderFadeProgress = useSharedValue(0);
  const loaderFillProgress = useSharedValue(0);
  const loaderPulseProgress = useSharedValue(1);

  // Phase 7: Handover transition (Curtain lifts from bottom)
  const handoverProgress = useSharedValue(0);

  // ─── Choreography Function ─────────────────────────────────────────────────

  const runAnimation = () => {
    const { timings } = SPLASH_CONFIG;

    // Reset values to initial state
    skylineProgress.value = 0;
    monogramClimbProgress.value = 0;
    wordExpandProgress.value = 0;
    taglineProgress.value = 0;
    loaderFadeProgress.value = 0;
    loaderFillProgress.value = 0;
    loaderPulseProgress.value = 1;
    handoverProgress.value = 0;

    // 1. Screen starts empty navy (emptyHold duration)

    // 2. Skyline builds itself from ground up
    skylineProgress.value = withDelay(
      timings.skylineStart,
      withTiming(1, {
        duration: timings.skylineDuration,
        easing: Easing.out(Easing.cubic),
        reduceMotion: ReduceMotion.Never,
      }),
      ReduceMotion.Never
    );

    // 3. Single letter 'C' climbs out from behind buildings
    monogramClimbProgress.value = withDelay(
      timings.monogramRiseStart,
      withTiming(1, {
        duration: timings.monogramRiseDuration,
        easing: Easing.bezier(0.38, 0.04, 0.18, 1.0),
        reduceMotion: ReduceMotion.Never,
      }),
      ReduceMotion.Never
    );

    // 4. Word expansion: 'C' slides left, 'OSTLY' ticker reels spin and snap into place
    wordExpandProgress.value = withDelay(
      timings.wordExpandStart,
      withTiming(1, {
        duration: timings.wordExpandDuration,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.Never,
      }),
      ReduceMotion.Never
    );

    // 5. Tagline appears under the wordmark, rising and popping with a slight bounce
    taglineProgress.value = withDelay(
      timings.taglineStart,
      withTiming(1, {
        duration: timings.taglineDuration,
        easing: Easing.out(Easing.back(1.5)),
        reduceMotion: ReduceMotion.Never,
      }),
      ReduceMotion.Never
    );

    // 6. Thin loader bar fades in and fills smoothly from left to right
    loaderFadeProgress.value = withDelay(
      timings.loaderFadeStart,
      withTiming(1, {
        duration: timings.loaderFadeDuration,
        easing: Easing.out(Easing.ease),
        reduceMotion: ReduceMotion.Never,
      }),
      ReduceMotion.Never
    );

    loaderFillProgress.value = withDelay(
      timings.loaderFillStart,
      withTiming(1, {
        duration: timings.loaderFillDuration,
        easing: Easing.inOut(Easing.cubic),
        reduceMotion: ReduceMotion.Never,
      }),
      ReduceMotion.Never
    );

    // Quick pulse when loader reaches full
    loaderPulseProgress.value = withDelay(
      timings.loaderPulseStart,
      withSequence(
        withTiming(1.10, {
          duration: timings.loaderPulseDuration / 2,
          easing: Easing.out(Easing.ease),
          reduceMotion: ReduceMotion.Never,
        }),
        withTiming(1.0, {
          duration: timings.loaderPulseDuration / 2,
          easing: Easing.in(Easing.ease),
          reduceMotion: ReduceMotion.Never,
        })
      ),
      ReduceMotion.Never
    );

    // 7. Handover: smoothly lifts the Sign In curtain card from bottom
    handoverProgress.value = withDelay(
      timings.handoverStart,
      withTiming(1, {
        duration: timings.handoverDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
        reduceMotion: ReduceMotion.Never,
      }),
      ReduceMotion.Never
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      runAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // ─── Animated Styles ───────────────────────────────────────────────────────

  // Skyline rises from ground up, then sinks down and fades on handover
  const skylineAnimStyle = useAnimatedStyle(() => {
    const riseY = interpolate(skylineProgress.value, [0, 1], [SCREEN_HEIGHT * 0.32, 0]);
    const sinkY = interpolate(handoverProgress.value, [0, 1], [0, 110]);
    const opacity =
      interpolate(skylineProgress.value, [0, 0.4, 1], [0, 0.35, 0.65]) *
      interpolate(handoverProgress.value, [0, 1], [1, 0]);

    return {
      opacity,
      transform: [{ translateY: riseY + sinkY }],
    };
  });

  // Wordmark Container: climbs from behind skyline, expands, and glides up to header on handover
  const wordmarkContainerAnimStyle = useAnimatedStyle(() => {
    const climbY = interpolate(monogramClimbProgress.value, [0, 1], [SCREEN_HEIGHT * 0.22, 0]);
    const handoverY = interpolate(handoverProgress.value, [0, 1], [0, -SCREEN_HEIGHT * 0.33]);
    const climbScale = interpolate(monogramClimbProgress.value, [0, 1], [0.45, 1.0]);
    const handoverScale = interpolate(handoverProgress.value, [0, 1], [1.0, 0.88]);

    return {
      transform: [
        { translateY: climbY + handoverY },
        { scale: climbScale * handoverScale },
      ],
    };
  });

  // First letter horizontal sliding:
  // Starts centered at (+initialCenterOffset), then slides left to 0 as full word forms
  const firstLetterAnimStyle = useAnimatedStyle(() => {
    const slideProgress = interpolate(wordExpandProgress.value, [0, 0.6], [0, 1], 'clamp');
    const t = 1 - slideProgress;
    const slideEased = 1 - t * t * t;
    const slideX = interpolate(slideEased, [0, 1], [initialCenterOffset, 0]);
    const opacity = interpolate(monogramClimbProgress.value, [0, 0.25, 1], [0, 0.8, 1]);

    return {
      opacity,
      transform: [{ translateX: slideX }],
    };
  });

  // Tagline animation: pops with slight bounce, then glides up under wordmark on handover
  const taglineAnimStyle = useAnimatedStyle(() => {
    const riseY = interpolate(taglineProgress.value, [0, 1], [20, 0]);
    const scale = interpolate(taglineProgress.value, [0, 1], [0.85, 1.0]);
    const introOpacity = interpolate(taglineProgress.value, [0, 1], [0, 1]);
    const handoverY = interpolate(handoverProgress.value, [0, 1], [0, -SCREEN_HEIGHT * 0.33]);

    return {
      opacity: introOpacity,
      transform: [{ translateY: riseY + handoverY }, { scale }],
    };
  });

  // Loader bar animation: fades in, fills, pulses, then fades away on handover
  const loaderAnimStyle = useAnimatedStyle(() => {
    const fadeIn = loaderFadeProgress.value;
    const fadeOut = interpolate(handoverProgress.value, [0, 0.4], [1, 0]);

    return {
      opacity: fadeIn * fadeOut,
      transform: [{ scale: loaderPulseProgress.value }],
    };
  });

  const loaderFillAnimStyle = useAnimatedStyle(() => {
    const widthPercent = interpolate(loaderFillProgress.value, [0, 1], [0, 100]);
    return {
      width: `${widthPercent}%`,
    };
  });

  // Sign-in curtain card: slides up smoothly from bottom like a curtain lifting
  const curtainCardAnimStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      handoverProgress.value,
      [0, 1],
      [SCREEN_HEIGHT, 0]
    );
    const opacity = interpolate(handoverProgress.value, [0, 0.2, 1], [0, 0.6, 1]);

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ── Center Stage: Wordmark, Tagline, Loader ───────────────────── */}
      <View style={styles.centerStage} pointerEvents="box-none">
        <Animated.View style={[styles.wordmarkWrapper, wordmarkContainerAnimStyle]}>
          {/* First Letter (e.g. 'C') */}
          <Animated.View style={[styles.firstLetterBox, firstLetterAnimStyle]}>
            <Text style={styles.letterText}>{firstLetter}</Text>
          </Animated.View>

          {/* Rest of letters (e.g. 'OSTLY') — rapid cost ticker reels spinning & snapping */}
          <View style={styles.restLettersRow}>
            {restLetters.map((char, index) => (
              <TickerLetter
                key={`${char}-${index}`}
                char={char}
                index={index}
                totalLetters={restCount}
                wordExpandProgress={wordExpandProgress}
              />
            ))}
          </View>
        </Animated.View>

        {/* Tagline: "Which Never Costs You" */}
        <Animated.View style={[styles.taglineContainer, taglineAnimStyle]}>
          <Text style={styles.taglineText}>{SPLASH_CONFIG.tagline}</Text>
        </Animated.View>

        {/* Thin Loader Bar */}
        <Animated.View style={[styles.loaderTrack, loaderAnimStyle]}>
          <Animated.View style={[styles.loaderFill, loaderFillAnimStyle]} />
        </Animated.View>
      </View>

      {/* ── Background: Soft Grey Construction Skyline Doodle ─────────── */}
      <Animated.View style={[styles.skylineWrapper, skylineAnimStyle]} pointerEvents="none">
        <Image
          source={skylineImage}
          style={styles.skylineImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* ── Sign-In Curtain Card (Slides up from bottom, zero duplicate code) ─ */}
      <Animated.View style={[styles.curtainCard, curtainCardAnimStyle]}>
        <AuthFormDeck isCurtain />
      </Animated.View>

      {/* ── Dev Controls: Replay shortcut ─────────────────────────────── */}
      <View style={styles.devControls} pointerEvents="box-none">
        <Pressable
          onPress={() => runAnimation()}
          hitSlop={12}
          style={({ pressed }) => [styles.devPill, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.devPillText}>Replay ↻</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─── Stylesheet ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPLASH_CONFIG.colors.background,
  },
  centerStage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginTop: -SCREEN_HEIGHT * 0.04,
  },
  wordmarkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstLetterBox: {
    minWidth: LETTER_WIDTH,
    height: REEL_ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: LETTER_GAP,
  },
  restLettersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restLetterBox: {
    width: LETTER_WIDTH,
    height: REEL_ITEM_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: LETTER_GAP,
  },
  reelItem: {
    width: LETTER_WIDTH,
    height: REEL_ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    color: SPLASH_CONFIG.colors.wordmark,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    includeFontPadding: false,
  },
  letterTextFinal: {
    color: SPLASH_CONFIG.colors.wordmark,
    fontSize: 34,
    fontWeight: '800',
  },
  letterTextSymbol: {
    color: SPLASH_CONFIG.colors.tagline,
    fontSize: 30,
    fontWeight: '700',
    opacity: 0.85,
  },
  taglineContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  taglineText: {
    color: SPLASH_CONFIG.colors.tagline,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  loaderTrack: {
    width: 140,
    height: 2.5,
    backgroundColor: SPLASH_CONFIG.colors.loaderTrack,
    borderRadius: 2,
    marginTop: 22,
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    backgroundColor: SPLASH_CONFIG.colors.loaderFill,
    borderRadius: 2,
  },
  skylineWrapper: {
    position: 'absolute',
    bottom: -45,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  skylineImage: {
    width: SCREEN_WIDTH * 1.08,
    height: SCREEN_HEIGHT * 0.40,
    tintColor: SPLASH_CONFIG.colors.skyline,
  },
  curtainCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.74,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
  devControls: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 50,
  },
  devPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  devPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SplashScreen;
