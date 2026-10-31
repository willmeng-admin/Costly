import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../utils/cn';

export interface SectionProps {
  title?: string;
  subtitle?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const spacingStyles: Record<NonNullable<SectionProps['spacing']>, string> = {
  none: '',
  sm: 'mb-3',
  md: 'mb-5',
  lg: 'mb-8',
};

export function Section({
  title,
  subtitle,
  spacing = 'md',
  children,
  className,
}: SectionProps) {
  return (
    <View className={cn(spacingStyles[spacing], className)}>
      {(title || subtitle) && (
        <View className="mb-3">
          {title && (
            <Text className="text-heading-md text-text-primary font-semibold">{title}</Text>
          )}
          {subtitle && (
            <Text className="text-body-md text-text-secondary mt-0.5">{subtitle}</Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}
