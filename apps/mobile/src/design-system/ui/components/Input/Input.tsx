import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import type { TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { cn } from '../../utils/cn';

export interface InputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  secureTextEntry?: boolean;
  leadingElement?: React.ReactNode;
  trailingElement?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad';
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholderTextColor?: string;
  accessibilityLabel?: string;
  className?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
}

export function Input({
  label,
  placeholder,
  helperText,
  errorMessage,
  value,
  onChangeText,
  disabled = false,
  secureTextEntry = false,
  leadingElement,
  trailingElement,
  multiline = false,
  numberOfLines = 1,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  keyboardType = 'default',
  returnKeyType,
  onSubmitEditing,
  onFocus,
  onBlur,
  placeholderTextColor = '#8A9AB0',
  accessibilityLabel,
  className,
  inputContainerClassName,
  inputClassName,
  labelClassName,
  helperTextClassName,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [secure, setSecure] = useState(secureTextEntry);
  const hasError = Boolean(errorMessage);

  const borderColor = hasError
    ? 'border-error'
    : focused
    ? 'border-primary-blue'
    : 'border-border-default';

  return (
    <View className={cn('gap-1', className)}>
      {label && (
        <Text className={cn('text-label text-text-primary font-semibold mb-1', labelClassName)}>
          {label}
        </Text>
      )}

      <View
        className={cn(
          'flex-row items-center bg-surface border rounded-md px-3',
          borderColor,
          disabled && 'bg-canvas opacity-60',
          multiline ? 'min-h-[88px] items-start py-3' : 'h-13',
          inputContainerClassName,
        )}
      >
        {leadingElement && (
          <View className="mr-2 opacity-60">{leadingElement}</View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          editable={!disabled}
          secureTextEntry={secure}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.();
          }}
          accessibilityLabel={accessibilityLabel ?? label}
          className={cn('flex-1 text-body-lg text-text-primary', inputClassName)}
          style={{ paddingVertical: 0 }}
        />

        {secureTextEntry && (
          <Pressable
            onPress={() => setSecure((s) => !s)}
            accessibilityLabel={secure ? 'Show password' : 'Hide password'}
            className="ml-2 p-1"
          >
            {secure ? (
              <Eye size={18} color="#5F7392" />
            ) : (
              <EyeOff size={18} color="#5F7392" />
            )}
          </Pressable>
        )}

        {trailingElement && !secureTextEntry && (
          <View className="ml-2">{trailingElement}</View>
        )}
      </View>

      {hasError && (
        <Text className="text-body-sm text-error mt-0.5">{errorMessage}</Text>
      )}
      {helperText && !hasError && (
        <Text className={cn("text-body-sm text-text-tertiary mt-0.5", helperTextClassName)}>{helperText}</Text>
      )}
    </View>
  );
}
