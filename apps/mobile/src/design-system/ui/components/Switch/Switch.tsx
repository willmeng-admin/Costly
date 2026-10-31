import React from 'react';
import { View, Text, Switch as RNSwitch } from 'react-native';
import { cn } from '../../utils/cn';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  accessibilityLabel?: string;
  className?: string;
}

export function Switch({
  value,
  onValueChange,
  disabled = false,
  label,
  description,
  accessibilityLabel,
  className,
}: SwitchProps) {
  return (
    <View className={cn('flex-row items-center justify-between gap-3', className)}>
      {(label || description) && (
        <View className="flex-1 gap-0.5">
          {label && (
            <Text className="text-label text-text-primary font-semibold">{label}</Text>
          )}
          {description && (
            <Text className="text-body-sm text-text-secondary">{description}</Text>
          )}
        </View>
      )}
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: '#E1E9F3', true: '#246BFF' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E1E9F3"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
      />
    </View>
  );
}
