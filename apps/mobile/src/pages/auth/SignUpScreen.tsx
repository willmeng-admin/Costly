import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  Check,
} from 'lucide-react-native';
import { GoogleIcon, AppleIcon } from '../../design-system/ui/components/icons';
import { AuthScreen } from './AuthScreen';

export interface SignUpFormProps {
  isCurtain?: boolean;
  onSuccess?: () => void;
  onSignInPress?: () => void;
}

/**
 * Reusable Sign Up Form component matching the Costly visual design system.
 * Shares the exact typography, card layout, inputs, SSO buttons, and footer styling with SignInForm.
 */
export function SignUpForm({
  isCurtain = false,
  onSuccess,
  onSignInPress,
}: SignUpFormProps) {
  const router = useRouter();
  const scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Focus states
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [companyFocused, setCompanyFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Validation Errors
  const [errors, setErrors] = useState<{
    fullName?: string;
    company?: string;
    email?: string;
    password?: string;
    terms?: string;
  }>({});

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

  // Password requirements calculation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasNumber;

  const handleSignUp = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!company.trim()) {
      newErrors.company = 'Please enter your company';
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter your work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Please enter a password';
    } else if (!isPasswordValid) {
      newErrors.password = 'Password must meet the requirements';
    }
    if (!agreedToTerms) {
      newErrors.terms = 'Please agree to the Terms of Service & Privacy Policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/(onboarding)/account-type');
      }
    }, 600);
  };

  const navigateToSignIn = () => {
    if (onSignInPress) {
      onSignInPress();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/sign-in');
    }
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
            paddingBottom: keyboardVisible ? 260 : (isCurtain ? 36 : 48),
          },
        ]}
        bounces={false}
      >
        {isCurtain && <View style={styles.curtainHandle} />}

        {/* ── Heading ────────────────────────────────────────────── */}
        <Text style={styles.headingTitle}>Create Account</Text>
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

        {/* ── Full Name Field ───────────────────────────────────── */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View
            style={[
              styles.inputContainer,
              fullNameFocused && styles.inputFocused,
              errors.fullName && styles.inputError,
            ]}
          >
            <User size={18} color="#8C9BAE" strokeWidth={1.8} style={styles.inputLeadingIcon} />
            <TextInput
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
              }}
              placeholder="Jane Smith"
              placeholderTextColor="#8C9BAE"
              autoCapitalize="words"
              autoCorrect={false}
              onFocus={() => {
                setFullNameFocused(true);
                scrollToOffset(120);
              }}
              onBlur={() => setFullNameFocused(false)}
              style={styles.textInput}
            />
          </View>
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        </View>

        {/* ── Company Field ─────────────────────────────────────── */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Company</Text>
          <View
            style={[
              styles.inputContainer,
              companyFocused && styles.inputFocused,
              errors.company && styles.inputError,
            ]}
          >
            <Building2 size={18} color="#8C9BAE" strokeWidth={1.8} style={styles.inputLeadingIcon} />
            <TextInput
              value={company}
              onChangeText={(text) => {
                setCompany(text);
                if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
              }}
              placeholder="Company name"
              placeholderTextColor="#8C9BAE"
              autoCapitalize="words"
              autoCorrect={false}
              onFocus={() => {
                setCompanyFocused(true);
                scrollToOffset(180);
              }}
              onBlur={() => setCompanyFocused(false)}
              style={styles.textInput}
            />
          </View>
          {errors.company && <Text style={styles.errorText}>{errors.company}</Text>}
        </View>

        {/* ── Work Email Field ──────────────────────────────────── */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Work Email</Text>
          <View
            style={[
              styles.inputContainer,
              emailFocused && styles.inputFocused,
              errors.email && styles.inputError,
            ]}
          >
            <Mail size={18} color="#8C9BAE" strokeWidth={1.8} style={styles.inputLeadingIcon} />
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="name@company.com"
              placeholderTextColor="#8C9BAE"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => {
                setEmailFocused(true);
                scrollToOffset(240);
              }}
              onBlur={() => setEmailFocused(false)}
              style={styles.textInput}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* ── Password Field ────────────────────────────────────── */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View
            style={[
              styles.inputContainer,
              passwordFocused && styles.inputFocused,
              errors.password && styles.inputError,
            ]}
          >
            <Lock size={18} color="#8C9BAE" strokeWidth={1.8} style={styles.inputLeadingIcon} />
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Create a password"
              placeholderTextColor="#8C9BAE"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => {
                setPasswordFocused(true);
                scrollToOffset(310);
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
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          {/* Password Requirement Badges */}
          <View style={styles.reqPillsRow}>
            <View style={[styles.reqPill, hasMinLength ? styles.reqPillValid : styles.reqPillDefault]}>
              <Check
                size={11}
                color={hasMinLength ? '#10B981' : '#94A3B8'}
                strokeWidth={hasMinLength ? 3 : 2}
              />
              <Text style={[styles.reqPillText, hasMinLength && styles.reqPillTextValid]}>
                8+ characters
              </Text>
            </View>

            <View style={[styles.reqPill, hasUppercase ? styles.reqPillValid : styles.reqPillDefault]}>
              <Check
                size={11}
                color={hasUppercase ? '#10B981' : '#94A3B8'}
                strokeWidth={hasUppercase ? 3 : 2}
              />
              <Text style={[styles.reqPillText, hasUppercase && styles.reqPillTextValid]}>
                1 uppercase
              </Text>
            </View>

            <View style={[styles.reqPill, hasNumber ? styles.reqPillValid : styles.reqPillDefault]}>
              <Check
                size={11}
                color={hasNumber ? '#10B981' : '#94A3B8'}
                strokeWidth={hasNumber ? 3 : 2}
              />
              <Text style={[styles.reqPillText, hasNumber && styles.reqPillTextValid]}>
                1 number
              </Text>
            </View>
          </View>
        </View>

        {/* ── Terms & Conditions Checkbox ───────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setAgreedToTerms((prev) => !prev);
            if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
          }}
          style={styles.termsRow}
        >
          <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxBoxChecked]}>
            {agreedToTerms && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
          </View>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text
              style={styles.termsLink}
              onPress={() =>
                Alert.alert(
                  'Terms of Service',
                  'By using COSTLY, you agree to our standard terms of service for material pricing and market data.',
                )
              }
            >
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              style={styles.termsLink}
              onPress={() =>
                Alert.alert(
                  'Privacy Policy',
                  'We protect your workspace data and never sell your private business or estimate details.',
                )
              }
            >
              Privacy Policy
            </Text>
          </Text>
        </TouchableOpacity>
        {errors.terms && <Text style={[styles.errorText, { marginTop: -4, marginBottom: 12 }]}>{errors.terms}</Text>}

        {/* ── Primary Create Account CTA Button ─────────────────── */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleSignUp}
          disabled={isLoading}
          style={styles.primaryButton}
          accessibilityRole="button"
          accessibilityLabel="Create Account"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <View style={styles.primaryButtonContent}>
              <Text style={styles.primaryButtonText}>Create Account</Text>
              <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} style={styles.primaryButtonArrow} />
            </View>
          )}
        </TouchableOpacity>

        {/* ── Footer: Already have an account? Sign In ──────────── */}
        <View style={styles.footerRow}>
          <View style={styles.footerLine} />
          <View style={styles.footerContent}>
            <Text style={styles.footerMutedText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={navigateToSignIn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Sign in to your account"
            >
              <Text style={styles.footerLinkText}>Sign In</Text>
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
  inputError: {
    borderColor: '#EF4444',
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
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 4,
  },

  // Password Requirement Badges
  reqPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  reqPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  reqPillDefault: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  reqPillValid: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  reqPillText: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '500',
  },
  reqPillTextValid: {
    color: '#059669',
    fontWeight: '600',
  },

  // Terms & Conditions Checkbox
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 18,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxBoxChecked: {
    backgroundColor: '#276AFF',
    borderColor: '#276AFF',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#5F7392',
    lineHeight: 19,
  },
  termsLink: {
    color: '#276AFF',
    fontWeight: '600',
  },

  // Primary Button
  primaryButton: {
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
  primaryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  primaryButtonArrow: {
    marginLeft: 8,
  },

  // Footer: Already have an account? Sign In
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

/**
 * Full Sign Up Screen Page with brand wordmark and horizon.
 */
export function SignUpScreen() {
  return <AuthScreen initialMode="sign-up" />;
}

export default SignUpScreen;
