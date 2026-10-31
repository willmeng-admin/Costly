import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '../../utils/cn';

export interface RadioItem {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  items: RadioItem[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export interface RadioItemComponentProps {
  item: RadioItem;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
  className?: string;
}

export function RadioItemComponent({ item, selected, disabled, onSelect, className }: RadioItemComponentProps) {
  return (
    <Pressable
      onPress={() => !disabled && onSelect()}
      accessibilityLabel={item.label}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : disabled ? 0.45 : 1 })}
      className={cn('flex-row items-start gap-3', className)}
    >
      <View
        className={cn(
          'w-5 h-5 rounded-pill border-2 items-center justify-center mt-0.5',
          selected ? 'border-primary-blue' : 'border-border-default',
        )}
      >
        {selected && <View className="w-2.5 h-2.5 rounded-pill bg-primary-blue" />}
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="text-body-md text-text-primary font-medium">{item.label}</Text>
        {item.description && (
          <Text className="text-body-sm text-text-secondary">{item.description}</Text>
        )}
      </View>
    </Pressable>
  );
}

export function Radio({ items, value, onValueChange, disabled, className }: RadioGroupProps) {
  return (
    <View className={cn('gap-3', className)}>
      {items.map((item) => (
        <RadioItemComponent
          key={item.value}
          item={item}
          selected={value === item.value}
          disabled={disabled}
          onSelect={() => onValueChange(item.value)}
        />
      ))}
    </View>
  );
}
