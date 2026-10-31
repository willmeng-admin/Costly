import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../utils/cn';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <View
      className={cn(
        'flex-1 items-center justify-center gap-3 p-8',
        className,
      )}
    >
      {icon && <View className="mb-1 opacity-40">{icon}</View>}
      <View className="items-center gap-1 max-w-xs">
        <Text className="text-heading-md text-text-primary font-semibold text-center">
          {title}
        </Text>
        {description && (
          <Text className="text-body-md text-text-secondary text-center leading-relaxed">
            {description}
          </Text>
        )}
      </View>
      {action && <View className="mt-2">{action}</View>}
    </View>
  );
}
