import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'small' | 'medium';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  label: string;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  neutral: { bg: 'bg-canvas', text: 'text-text-secondary' },
  success: { bg: 'bg-success/10', text: 'text-success' },
  warning: { bg: 'bg-warning/10', text: 'text-warning' },
  error: { bg: 'bg-error/10', text: 'text-error' },
  info: { bg: 'bg-primary-blue/10', text: 'text-primary-blue' },
};

const sizeStyles: Record<BadgeSize, { container: string; text: string }> = {
  small: { container: 'px-1.5 py-0.5 rounded-xs', text: 'text-overline' },
  medium: { container: 'px-2 py-1 rounded-sm', text: 'text-body-sm font-medium' },
};

export function Badge({ variant = 'neutral', size = 'small', label, className }: BadgeProps) {
  const vs = variantStyles[variant];
  const ss = sizeStyles[size];

  return (
    <View className={cn('self-start flex-row items-center', vs.bg, ss.container, className)}>
      <Text className={cn('font-semibold', vs.text, ss.text)}>{label}</Text>
    </View>
  );
}
