import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../utils/cn';

export interface ScreenContainerProps {
  scrollable?: boolean;
  backgroundColor?: string;
  horizontalPadding?: boolean;
  children: React.ReactNode;
  className?: string;
  contentContainerStyle?: ViewStyle;
  keyboardAvoiding?: boolean;
}

export function ScreenContainer({
  scrollable = false,
  backgroundColor = '#F3F6FA',
  horizontalPadding = true,
  children,
  className,
  contentContainerStyle,
  keyboardAvoiding = false,
}: ScreenContainerProps) {
  const inner = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        { flexGrow: 1, paddingHorizontal: horizontalPadding ? 20 : 0 },
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      className={cn('flex-1', horizontalPadding && 'px-5', className)}
    >
      {children}
    </View>
  );

  const wrapped = keyboardAvoiding ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      {inner}
    </KeyboardAvoidingView>
  ) : inner;

  return (
    <SafeAreaView
      className={cn('flex-1', className)}
      style={{ backgroundColor }}
    >
      {wrapped}
    </SafeAreaView>
  );
}
