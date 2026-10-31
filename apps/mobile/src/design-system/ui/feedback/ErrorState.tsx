import React from 'react';
import { View, Text } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { cn } from '../utils/cn';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  action,
  className,
}: ErrorStateProps) {
  return (
    <View
      className={cn(
        'flex-1 items-center justify-center gap-3 p-8',
        className,
      )}
    >
      <View className="w-12 h-12 rounded-xl bg-error/10 items-center justify-center">
        <AlertCircle size={24} color="#C93636" />
      </View>
      <View className="items-center gap-1 max-w-xs">
        <Text className="text-heading-md text-text-primary font-semibold text-center">
          {title}
        </Text>
        <Text className="text-body-md text-text-secondary text-center leading-relaxed">
          {description}
        </Text>
      </View>
      {action && <View className="mt-2">{action}</View>}
    </View>
  );
}
