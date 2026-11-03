import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { GoogleIcon, AppleIcon } from '../../design-system/ui/components/icons';
import { AuthScreen } from './AuthScreen';

export interface SignInFormProps {
  isCurtain?: boolean;
  onCreateAccountPress?: () => void;
  onSuccess?: () => void;
}

/**
 * Reusable Sign In form component matching the Costly visual mockup.
 * Used both in SignInScreen and inside the SplashScreen curtain card.
 */
export function SignInForm({
  isCurtain = false,
  onCreateAccountPress,
  onSuccess,
}: SignInFormProps) {
  const router = useRouter();
  const scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const scrollToOffset = (y: number) => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y, animated: true });
    }, 80);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardContainer}
    >
      <ScrollView
        ref={scrollRef}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: isCurtain ? 12 : 28,
            paddingBottom: keyboardVisible ? 240 : (isCurtain ? 36 : 48),
          },
        ]}
        bounces={false}
      >
        {isCurtain && (
          <View style={styles.curtainHandle} />
        )}

        {/* ── Header ────────────────────────────────────────────── */}
        <Text style={styles.headingTitle}>Sign In</Text>
        <Text style={styles.headingSubtitle}>
          Access construction cost and lead-time updates for your markets.
        </Text>

        {/* ── SSO: Continue with Google ─────────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => {
            onSuccess?.();
            router.replace('/(tabs)');
          }}
          style={styles.ssoButton}
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
        >
          <View style={styles.ssoContentLeft}>
            <GoogleIcon size={22} />
            <Text style={styles.ssoButtonText}>Continue with Google</Text>
          </View>
          <ArrowRight size={18} color="#0B1F3A" strokeWidth={2} />
        </TouchableOpacity>

        {/* ── SSO: Continue with Apple ──────────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => {
            onSuccess?.();
            router.replace('/(tabs)');
          }}
          style={styles.ssoButton}
          accessibilityRole="button"
          accessibilityLabel="Continue with Apple"
        >
          <View style={styles.ssoContentLeft}>
            <AppleIcon size={22} color="#000000" />
            <Text style={styles.ssoButtonText}>Continue with Apple</Text>
          </View>
          <ArrowRight size={18} color="#0B1F3A" strokeWidth={2} />
        </TouchableOpacity>

        {/* ── Divider ───────────────────────────────────────────── */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with email</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* ── Email Field ───────────────────────────────────────── */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={[styles.inputContainer, emailFocused && styles.inputFocused]}>
            <Mail size={18} color="#8C9BAE" strokeWidth={1.8} style={styles.inputLeadingIcon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="name@company.com"
              placeholderTextColor="#8C9BAE"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => {
                setEmailFocused(true);
                scrollToOffset(120);
              }}
              onBlur={() => setEmailFocused(false)}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* ── Password Field ────────────────────────────────────── */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={[styles.inputContainer, passwordFocused && styles.inputFocused]}>
            <Lock size={18} color="#8C9BAE" strokeWidth={1.8} style={styles.inputLeadingIcon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#8C9BAE"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => {
                setPasswordFocused(true);
                scrollToOffset(200);
              }}
              onBlur={() => setPasswordFocused(false)}
              style={styles.textInput}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.eyeButton}
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <Eye size={18} color="#8C9BAE" strokeWidth={1.8} />
              ) : (
                <EyeOff size={18} color="#8C9BAE" strokeWidth={1.8} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Forgot Password Link ──────────────────────────────── */}
        <TouchableOpacity
          onPress={() => router.push('/(auth)/forgot-password')}
          style={styles.forgotPasswordWrapper}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Forgot password"
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* ── Primary Sign In CTA Button ────────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => {
            onSuccess?.();
            router.replace('/(tabs)');
          }}
          style={styles.signInButton}
          accessibilityRole="button"
          accessibilityLabel="Sign In"
        >
          <View style={styles.signInButtonContent}>
            <Text style={styles.signInButtonText}>Sign In</Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} style={styles.signInArrow} />
          </View>
        </TouchableOpacity>

        {/* ── Footer: Don't have an account? Sign Up ────────────── */}
        <View style={styles.footerRow}>
          <View style={styles.footerLine} />
          <View style={styles.footerContent}>
            <Text style={styles.footerMutedText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                if (onCreateAccountPress) {
                  onCreateAccountPress();
                } else {
                  router.push('/(auth)/sign-up');
                }
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Sign up for an account"
            >
              <Text style={styles.footerLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  curtainHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: 16,
  },

  // Heading & Subtitle
  headingTitle: {
    color: '#0B1F3A',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  headingSubtitle: {
    color: '#5F7392',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 24,
  },

  // SSO Buttons
  ssoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  ssoContentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ssoButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0B1F3A',
    marginLeft: 14,
    letterSpacing: -0.2,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    color: '#8C9BAE',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 12,
  },

  // Input Fields
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#0B1F3A',
    fontSize: 13.5,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
  },
  inputFocused: {
    borderColor: '#276AFF',
    borderWidth: 1.5,
  },
  inputLeadingIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14.5,
    color: '#0B1F3A',
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 4,
  },

  // Forgot Password
  forgotPasswordWrapper: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#276AFF',
    fontSize: 13,
    fontWeight: '600',
  },

  // Primary Sign In Button
  signInButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#276AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#276AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  signInButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  signInArrow: {
    marginLeft: 8,
  },

  // Footer: Don't have an account? Sign Up
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  footerMutedText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
  footerLinkText: {
    color: '#276AFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

export function SignInScreen() {
  return <AuthScreen initialMode="sign-in" />;
}

export default SignInScreen;
