import React from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '../../utils/cn';

export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps {
  icon: React.ReactNode;
  size?: IconButtonSize;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel: string;
  className?: string;
  variant?: 'ghost' | 'outline' | 'filled';
}

const sizeStyles: Record<IconButtonSize, string> = {
  small: 'w-8 h-8 rounded-sm',
  medium: 'w-10 h-10 rounded-md',
  large: 'w-12 h-12 rounded-md',
};

const variantStyles: Record<NonNullable<IconButtonProps['variant']>, string> = {
  ghost: 'bg-transparent',
  outline: 'bg-transparent border border-border-default',
  filled: 'bg-canvas',
};

export function IconButton({
  icon,
  size = 'medium',
  disabled = false,
  onPress,
  accessibilityLabel,
  className,
  variant = 'ghost',
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : disabled ? 0.4 : 1 })}
      className={cn(
        'items-center justify-center',
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
    >
      <View>{icon}</View>
    </Pressable>
  );
}
