import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { cn } from '../utils/cn';

export interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  className?: string;
}

export function Loading({
  message,
  size = 'large',
  color = '#246BFF',
  className,
}: LoadingProps) {
  return (
    <View
      className={cn('flex-1 items-center justify-center gap-3 p-8', className)}
    >
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="text-body-md text-text-secondary text-center">{message}</Text>
      )}
    </View>
  );
}
