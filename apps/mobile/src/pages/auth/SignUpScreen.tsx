import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Divider, Checkbox } from '../../design-system/ui';
import { GoogleIcon, AppleIcon } from '../../design-system/ui/components/icons';
import { cn } from '../../design-system/ui/utils/cn';

export interface SignUpFormProps {
  onSuccess?: () => void;
  onSignInPress?: () => void;
}

/**
 * Reusable Sign Up Form component.
 */
export function SignUpForm({ onSuccess, onSignInPress }: SignUpFormProps) {
  const router = useRouter();
  const scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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
      newErrors.password = 'Password must meet the requirements below';
    }
    if (!agreedToTerms) {
      newErrors.terms = 'Please accept the Terms of Service & Privacy Policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.replace('/(tabs)');
      }
    }, 700);
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
      behavior={Platform.OS === 'ios' ? undefined : undefined}
      className="flex-1"
    >
      <ScrollView
        ref={scrollRef}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6 pt-7"
        contentContainerStyle={{
          paddingBottom: keyboardVisible ? 280 : 40,
        }}
        bounces={false}
      >
        {/* Title & Subtitle */}
        <Text className="text-text-primary text-[28px] font-extrabold tracking-tight">
          Create your account
        </Text>
        <Text className="text-text-secondary text-sm mt-1.5 leading-5 mb-6">
          Get cost data and material lead times for your markets.
        </Text>

        {/* SSO: Google Button */}
        <Button
          variant="secondary"
          size="large"
          fullWidth
          title="Continue with Google"
          leadingIcon={<GoogleIcon size={20} />}
          onPress={() => router.replace('/(tabs)')}
          className="rounded-2xl mb-3"
          textClassName="text-[15px] font-semibold text-text-primary ml-1"
        >
          Continue with Google
        </Button>

        {/* SSO: Apple Button */}
        <Button
          variant="secondary"
          size="large"
          fullWidth
          title="Continue with Apple"
          leadingIcon={<AppleIcon size={20} color="#000000" />}
          onPress={() => router.replace('/(tabs)')}
          className="rounded-2xl"
          textClassName="text-[15px] font-semibold text-text-primary ml-1"
        >
          Continue with Apple
        </Button>

        {/* Divider */}
        <Divider spacing="none" label="or create with email" className="my-5" />

        {/* Full Name Field */}
        <Input
          label="Full name"
          placeholder="Jane Smith"
          autoCapitalize="words"
          autoCorrect={false}
          value={fullName}
          onChangeText={(val) => {
            setFullName(val);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
          }}
          onFocus={() => scrollToOffset(120)}
          errorMessage={errors.fullName}
          className="mb-4"
          inputContainerClassName="rounded-xl px-4"
          inputClassName="text-[15px]"
        />

        {/* Company Field */}
        <Input
          label="Company"
          placeholder="Company name"
          autoCapitalize="words"
          autoCorrect={false}
          value={company}
          onChangeText={(val) => {
            setCompany(val);
            if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
          }}
          onFocus={() => scrollToOffset(190)}
          errorMessage={errors.company}
          className="mb-4"
          inputContainerClassName="rounded-xl px-4"
          inputClassName="text-[15px]"
        />

        {/* Work Email Field */}
        <Input
          label="Work email"
          placeholder="Your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          onFocus={() => scrollToOffset(270)}
          errorMessage={errors.email}
          className="mb-4"
          inputContainerClassName="rounded-xl px-4"
          inputClassName="text-[15px]"
        />

        {/* Password Field */}
        <Input
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          onFocus={() => scrollToOffset(350)}
          errorMessage={errors.password}
          inputContainerClassName="rounded-xl px-4"
          inputClassName="text-[15px]"
          helperText={
            password.length === 0
              ? '8+ characters with an uppercase letter and a number.'
              : undefined
          }
          helperTextClassName="text-text-tertiary text-[13px] mt-1.5"
        />

        {/* Interactive Password Requirements Pills (Visible once user types) */}
        {password.length > 0 && (
          <View className="flex-row items-center gap-2 mt-2 flex-wrap">
            <View
              className={cn(
                'flex-row items-center gap-1.5 px-2.5 py-1 rounded-full',
                hasMinLength
                  ? 'bg-success/10 border border-success/30'
                  : 'bg-canvas border border-border-default',
              )}
            >
              <Check
                size={12}
                color={hasMinLength ? '#16885D' : '#8A9AB0'}
                strokeWidth={hasMinLength ? 3 : 2}
              />
              <Text
                className={cn(
                  'text-[11px] font-medium',
                  hasMinLength ? 'text-success' : 'text-text-tertiary',
                )}
              >
                8+ characters
              </Text>
            </View>

            <View
              className={cn(
                'flex-row items-center gap-1.5 px-2.5 py-1 rounded-full',
                hasUppercase
                  ? 'bg-success/10 border border-success/30'
                  : 'bg-canvas border border-border-default',
              )}
            >
              <Check
                size={12}
                color={hasUppercase ? '#16885D' : '#8A9AB0'}
                strokeWidth={hasUppercase ? 3 : 2}
              />
              <Text
                className={cn(
                  'text-[11px] font-medium',
                  hasUppercase ? 'text-success' : 'text-text-tertiary',
                )}
              >
                1 uppercase
              </Text>
            </View>

            <View
              className={cn(
                'flex-row items-center gap-1.5 px-2.5 py-1 rounded-full',
                hasNumber
                  ? 'bg-success/10 border border-success/30'
                  : 'bg-canvas border border-border-default',
              )}
            >
              <Check
                size={12}
                color={hasNumber ? '#16885D' : '#8A9AB0'}
                strokeWidth={hasNumber ? 3 : 2}
              />
              <Text
                className={cn(
                  'text-[11px] font-medium',
                  hasNumber ? 'text-success' : 'text-text-tertiary',
                )}
              >
                1 number
              </Text>
            </View>
          </View>
        )}

        {/* Terms Agreement Checkbox */}
        <View className="mt-4 mb-2">
          <Checkbox
            checked={agreedToTerms}
            onValueChange={(val) => {
              setAgreedToTerms(val);
              if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
            }}
            checkboxClassName="rounded-[6px]"
          >
            <Text className="text-text-secondary text-[13px] leading-5">
              I agree to the{' '}
              <Text
                className="text-primary-blue font-semibold"
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
                className="text-primary-blue font-semibold"
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
          </Checkbox>
          {errors.terms && (
            <Text className="text-error text-xs mt-1.5 ml-8">{errors.terms}</Text>
          )}
        </View>

        {/* Primary CTA Button */}
        <Button
          variant="primary"
          size="large"
          fullWidth
          title="Create Account"
          loading={isLoading}
          onPress={handleSignUp}
          className="rounded-2xl shadow-sm mt-4"
          textClassName="text-[15px] font-bold text-white"
        >
          Create Account
        </Button>

        {/* Bottom Link: Already have an account? Sign In */}
        <View className="flex-row items-center justify-center mt-6">
          <Text className="text-text-secondary text-sm">
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={navigateToSignIn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text className="text-primary-blue text-sm font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import { AuthScreen } from './AuthScreen';

/**
 * Full Sign Up Screen Page with header and brand wordmark.
 */
export function SignUpScreen() {
  return <AuthScreen initialMode="sign-up" />;
}

export default SignUpScreen;

