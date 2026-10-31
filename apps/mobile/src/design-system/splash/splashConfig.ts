/**
 * COSTLY Splash Screen Configuration
 * Change brandName, tagline, or timings in this single file.
 */
export const SPLASH_CONFIG = {
  // Brand Copy
  brandName: 'COSTLY',
  tagline: 'Which Never Costs You',

  // Colors
  colors: {
    background: '#0B1F3A', // Plain deep navy (no light effects, no glows)
    wordmark: '#FFFFFF',   // Crisp white
    tagline: '#16BFEF',    // Cyan accent
    skyline: '#6B7F96',    // Soft line-art grey
    loaderTrack: 'rgba(22, 191, 239, 0.18)',
    loaderFill: '#16BFEF',
    cardBackground: '#FFFFFF',
    textPrimary: '#102544',
    textSecondary: '#5F7392',
    border: '#E1E9F3',
    primaryBlue: '#246BFF',
  },

  // Choreography Timings (in milliseconds) - Total ~5.0s
  timings: {
    // 1. Screen starts empty navy
    emptyHold: 350,

    // 2. Skyline builds itself from ground up
    skylineStart: 350,
    skylineDuration: 1100,

    // 3. Single letter 'C' climbs out from behind buildings
    monogramRiseStart: 1100,
    monogramRiseDuration: 1250,

    // 4. Word forms: 'C' slides left, 'OSTLY' ticker reels spin and snap into place
    wordExpandStart: 2350,
    wordExpandDuration: 1250,
    letterStagger: 90,

    // 5. Tagline rises and pops with slight bounce
    taglineStart: 3750,
    taglineDuration: 550,

    // 6. Loader fades in and fills smoothly
    loaderFadeStart: 4350,
    loaderFadeDuration: 250,
    loaderFillStart: 4500,
    loaderFillDuration: 750,

    // Pulse when loader reaches full
    loaderPulseStart: 5250,
    loaderPulseDuration: 250,

    // 7. Handover to sign-in screen
    handoverStart: 5500,
    handoverDuration: 650,
  },
} as const;

export type SplashConfig = typeof SPLASH_CONFIG;

