import React from 'react';
import { View, Pressable } from 'react-native';
import { cn } from '../../utils/cn';

export type CardVariant = 'default' | 'outlined' | 'subtle';

export interface CardProps {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
  accessibilityLabel?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface border border-border-default shadow-sm',
  outlined: 'bg-surface border border-border-default',
  subtle: 'bg-subtle-surface border border-border-default',
};

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

const radiusStyles: Record<NonNullable<CardProps['radius']>, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};

export function Card({
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  onPress,
  children,
  className,
  accessibilityLabel,
}: CardProps) {
  const baseClasses = cn(
    variantStyles[variant],
    paddingStyles[padding],
    radiusStyles[radius],
    className,
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        className={baseClasses}
      >
        {children}
      </Pressable>
    );
  }

  return <View className={baseClasses}>{children}</View>;
}
