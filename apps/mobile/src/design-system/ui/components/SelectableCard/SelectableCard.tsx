import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { cn } from '../../utils/cn';

export interface SelectableCardProps {
  selected: boolean;
  onPress: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

export function SelectableCard({
  selected,
  onPress,
  title,
  description,
  icon,
  disabled = false,
  accessibilityLabel,
  className,
}: SelectableCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : disabled ? 0.45 : 1 })}
      className={cn(
        'flex-row items-center gap-3 p-4 rounded-lg border',
        selected
          ? 'bg-primary-blue/5 border-primary-blue'
          : 'bg-surface border-border-default',
        className,
      )}
    >
      {icon && (
        <View
          className={cn(
            'w-10 h-10 rounded-sm items-center justify-center',
            selected ? 'bg-primary-blue/10' : 'bg-canvas',
          )}
        >
          {icon}
        </View>
      )}

      <View className="flex-1 gap-0.5">
        <Text
          className={cn(
            'text-body-md font-semibold',
            selected ? 'text-primary-blue' : 'text-text-primary',
          )}
        >
          {title}
        </Text>
        {description && (
          <Text className="text-body-sm text-text-secondary">{description}</Text>
        )}
      </View>

      <View
        className={cn(
          'w-5 h-5 rounded-pill border-2 items-center justify-center',
          selected ? 'bg-primary-blue border-primary-blue' : 'border-border-default',
        )}
      >
        {selected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
      </View>
    </Pressable>
  );
}
