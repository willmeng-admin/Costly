import React from 'react';
import { View, Text, Image } from 'react-native';
import { cn } from '../../utils/cn';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface AvatarProps {
  imageUri?: string;
  initials?: string;
  size?: AvatarSize;
  accessibilityLabel?: string;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; px: number }> = {
  small: { container: 'w-8 h-8 rounded-pill', text: 'text-overline font-bold', px: 32 },
  medium: { container: 'w-10 h-10 rounded-pill', text: 'text-body-sm font-bold', px: 40 },
  large: { container: 'w-14 h-14 rounded-pill', text: 'text-heading-md font-bold', px: 56 },
  xlarge: { container: 'w-20 h-20 rounded-pill', text: 'text-heading-xl font-bold', px: 80 },
};

export function Avatar({
  imageUri,
  initials,
  size = 'medium',
  accessibilityLabel,
  className,
}: AvatarProps) {
  const ss = sizeStyles[size];

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        accessibilityLabel={accessibilityLabel ?? 'Avatar'}
        className={cn(ss.container, className)}
        style={{ width: ss.px, height: ss.px, borderRadius: ss.px / 2 }}
      />
    );
  }

  const displayInitials = (initials ?? '?').slice(0, 2).toUpperCase();

  return (
    <View
      className={cn(
        'items-center justify-center bg-primary-blue/10',
        ss.container,
        className,
      )}
      accessibilityLabel={accessibilityLabel ?? displayInitials}
    >
      <Text className={cn('text-primary-blue', ss.text)}>{displayInitials}</Text>
    </View>
  );
}
