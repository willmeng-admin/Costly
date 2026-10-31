import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../../utils/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  label?: string;
  labelClassName?: string;
  className?: string;
}

const spacingStyles: Record<NonNullable<DividerProps['spacing']>, string> = {
  none: '',
  sm: 'my-2',
  md: 'my-3',
  lg: 'my-4',
};

export function Divider({
  orientation = 'horizontal',
  spacing = 'md',
  label,
  labelClassName,
  className,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <View className={cn('w-px self-stretch bg-border-default', className)} />
    );
  }

  if (label) {
    return (
      <View className={cn('flex-row items-center', spacingStyles[spacing], className)}>
        <View className="flex-1 h-px bg-border-default" />
        <Text className={cn('text-text-tertiary text-xs px-3 font-medium', labelClassName)}>
          {label}
        </Text>
        <View className="flex-1 h-px bg-border-default" />
      </View>
    );
  }

  return (
    <View
      className={cn('w-full h-px bg-border-default', spacingStyles[spacing], className)}
    />
  );
}
