import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Divider } from '../../design-system/ui';
import { GoogleIcon, AppleIcon } from '../../design-system/ui/components/icons';

export interface SignInFormProps {
  isCurtain?: boolean;
  onCreateAccountPress?: () => void;
  onSuccess?: () => void;
}

/**
 * Reusable Sign In form component.
 * Single source of truth used both in SignInScreen and inside the SplashScreen curtain card.
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
      behavior={Platform.OS === 'ios' ? undefined : undefined}
      className="flex-1"
    >
      <ScrollView
        ref={scrollRef}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerClassName={isCurtain ? "px-6 pt-3" : "px-6 pt-8"}
        contentContainerStyle={{
          paddingBottom: keyboardVisible ? 240 : (isCurtain ? 36 : 40),
        }}
        bounces={false}
      >
        {isCurtain && (
          <View className="w-9 h-1 bg-border-default rounded-full self-center mb-4" />
        )}

        {/* Header */}
        <Text className="text-text-primary text-[28px] font-extrabold tracking-tight">
          Sign In
        </Text>
        <Text className="text-text-secondary text-sm mt-1.5 leading-5 mb-6">
          Access construction cost and lead-time updates for your markets.
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
        <Divider spacing="none" label="or continue with email" className="my-5" />

        {/* Email Field */}
        <Input
          label="Email"
          placeholder="Your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          onFocus={() => scrollToOffset(120)}
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
          onChangeText={setPassword}
          onFocus={() => scrollToOffset(220)}
          inputContainerClassName="rounded-xl px-4"
          inputClassName="text-[15px]"
        />

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => router.push('/(auth)/forgot-password')}
          className="self-end mt-2 mb-6"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-primary-blue text-[13px] font-semibold">
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Sign In CTA Button */}
        <Button
          variant="primary"
          size="large"
          fullWidth
          title="Sign In"
          onPress={() => router.replace('/(tabs)')}
          className="rounded-2xl shadow-sm"
          textClassName="text-[15px] font-bold text-white"
        >
          Sign In
        </Button>

        {/* Divider */}
        <Divider spacing="none" label="Don't have an account?" className="mt-6 mb-3.5" />

        {/* Create Account Button */}
        <Button
          variant="secondary"
          size="large"
          fullWidth
          title="Create an account"
          onPress={() => {
            if (onCreateAccountPress) {
              onCreateAccountPress();
            } else {
              router.push('/(auth)/sign-up');
            }
          }}
          className="rounded-2xl bg-canvas"
          textClassName="text-sm font-semibold text-text-primary"
        >
          Create an account
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import { AuthScreen } from './AuthScreen';

export function SignInScreen() {
  return <AuthScreen initialMode="sign-in" />;
}

export default SignInScreen;
