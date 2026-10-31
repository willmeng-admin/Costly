import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../utils/cn';

export interface BottomActionBarProps {
  primaryAction: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function BottomActionBar({
  primaryAction,
  secondaryAction,
  className,
}: BottomActionBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn(
        'bg-surface border-t border-border-default px-5 pt-3 gap-2',
        className,
      )}
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      {primaryAction}
      {secondaryAction && secondaryAction}
    </View>
  );
}
