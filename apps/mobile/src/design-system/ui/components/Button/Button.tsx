import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'destructive';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  title?: string;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onPress?: () => void;
  children?: React.ReactNode;
  accessibilityLabel?: string;
  className?: string;
  textClassName?: string;
}

const variantStyles: Record<
  ButtonVariant,
  { container: string; text: string; loader: string; color: string }
> = {
  primary: {
    container: 'bg-primary-blue border border-primary-blue',
    text: 'text-white',
    loader: '#FFFFFF',
    color: '#FFFFFF',
  },
  secondary: {
    container: 'bg-surface border border-border-default',
    text: 'text-text-primary',
    loader: '#102544',
    color: '#102544',
  },
  outline: {
    container: 'bg-transparent border border-primary-blue',
    text: 'text-primary-blue',
    loader: '#246BFF',
    color: '#246BFF',
  },
  text: {
    container: 'bg-transparent border border-transparent',
    text: 'text-primary-blue',
    loader: '#246BFF',
    color: '#246BFF',
  },
  destructive: {
    container: 'bg-error border border-error',
    text: 'text-white',
    loader: '#FFFFFF',
    color: '#FFFFFF',
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string; iconSize: number }> = {
  small: {
    container: 'h-9 px-3 rounded-sm gap-1.5',
    text: 'text-[13px] font-semibold',
    iconSize: 14,
  },
  medium: {
    container: 'h-11 px-4 rounded-md gap-2',
    text: 'text-[15px] font-semibold',
    iconSize: 16,
  },
  large: {
    container: 'h-13 px-5 rounded-md gap-2',
    text: 'text-[15px] font-semibold',
    iconSize: 18,
  },
};

export function Button({
  variant = 'primary',
  size = 'medium',
  title,
  label,
  loading = false,
  disabled = false,
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  onPress,
  children,
  accessibilityLabel,
  className,
  textClassName,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const vs = variantStyles[variant];
  const ss = sizeStyles[size];
  const buttonContent = children ?? title ?? label;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel ?? (typeof buttonContent === 'string' ? buttonContent : undefined)}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : isDisabled ? 0.45 : 1 })}
      className={cn(
        'flex-row items-center justify-center',
        vs.container,
        ss.container,
        fullWidth && 'w-full',
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator size="small" color={vs.loader} />
      ) : (
        <>
          {leadingIcon && <View>{leadingIcon}</View>}
          {buttonContent && (
            <Text
              style={{ color: vs.color }}
              className={cn('font-semibold', ss.text, vs.text, textClassName)}
            >
              {buttonContent}
            </Text>
          )}
          {trailingIcon && <View>{trailingIcon}</View>}
        </>
      )}
    </Pressable>
  );
}
