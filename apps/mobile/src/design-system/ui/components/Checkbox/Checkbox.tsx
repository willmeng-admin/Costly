import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { cn } from '../../utils/cn';

export interface CheckboxProps {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  children?: React.ReactNode;
  accessibilityLabel?: string;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
}

export function Checkbox({
  checked,
  onValueChange,
  disabled = false,
  label,
  children,
  accessibilityLabel,
  className,
  checkboxClassName,
  labelClassName,
}: CheckboxProps) {
  const content = label ?? children;
  const isStringLabel = typeof content === 'string';

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!checked)}
      accessibilityLabel={accessibilityLabel ?? (isStringLabel ? (content as string) : undefined)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : disabled ? 0.45 : 1 })}
      className={cn('flex-row items-center gap-3', className)}
    >
      <View
        className={cn(
          'w-5 h-5 rounded-[6px] border items-center justify-center',
          checked
            ? 'bg-primary-blue border-primary-blue'
            : 'bg-surface border-border-default',
          checkboxClassName,
        )}
      >
        {checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
      </View>
      {isStringLabel ? (
        <Text className={cn('flex-1 text-body-md text-text-primary', labelClassName)}>
          {content as string}
        </Text>
      ) : content ? (
        <View className="flex-1">{content}</View>
      ) : null}
    </Pressable>
  );
}
