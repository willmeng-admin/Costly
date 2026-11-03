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
  badge?: React.ReactNode;
  indicatorType?: 'radio' | 'check';
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
  iconContainerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SelectableCard({
  selected,
  onPress,
  title,
  description,
  icon,
  badge,
  indicatorType = 'radio',
  disabled = false,
  accessibilityLabel,
  className,
  iconContainerClassName,
  titleClassName,
  descriptionClassName,
}: SelectableCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : disabled ? 0.45 : 1 })}
      className={cn(
        'flex-row items-center gap-3.5 p-4 rounded-2xl border min-h-[80px]',
        selected
          ? 'bg-[#F3F7FF] border-[#246BFF] border-[1.5px]'
          : 'bg-surface border-border-default border',
        className,
      )}
    >
      {icon && (
        <View
          className={cn(
            'w-12 h-12 rounded-[14px] items-center justify-center',
            selected ? 'bg-primary-blue/10' : 'bg-[#F1F5F9]',
            iconContainerClassName,
          )}
        >
          {icon}
        </View>
      )}

      <View className="flex-1 justify-center mr-2">
        <View className="flex-row items-center gap-2 flex-wrap">
          <Text
            className={cn(
              'text-[15.5px] font-bold tracking-tight text-text-primary',
              titleClassName,
            )}
          >
            {title}
          </Text>
          {badge}
        </View>
        {description && (
          <Text
            className={cn(
              'text-[12.5px] text-text-secondary leading-[17px] mt-1',
              descriptionClassName,
            )}
          >
            {description}
          </Text>
        )}
      </View>

      <View className="items-center justify-center self-center pl-1">
        {indicatorType === 'radio' ? (
          <View
            className={cn(
              'w-5 h-5 rounded-full items-center justify-center',
              selected ? 'bg-primary-blue' : 'border-2 border-[#CBD5E1] bg-transparent',
            )}
          >
            {selected && <View className="w-2 h-2 rounded-full bg-white" />}
          </View>
        ) : (
          <View
            className={cn(
              'w-5 h-5 rounded-full border-2 items-center justify-center',
              selected ? 'bg-primary-blue border-primary-blue' : 'border-border-default',
            )}
          >
            {selected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
          </View>
        )}
      </View>
    </Pressable>
  );
}
