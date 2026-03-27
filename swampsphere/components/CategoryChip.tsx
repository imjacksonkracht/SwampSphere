import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors } from '@/constants/Colors';

export type CategoryChipProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export default function CategoryChip({
  label,
  isActive,
  onPress,
}: CategoryChipProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.chip, isActive ? styles.activeChip : styles.inactiveChip]}>
      <Text style={[styles.label, isActive ? styles.activeLabel : styles.inactiveLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    minWidth: 88,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  activeChip: {
    backgroundColor: Colors.ufOrange,
    borderWidth: 0,
  },
  inactiveChip: {
    backgroundColor: Colors.cardWhite,
    borderWidth: 1,
    borderColor: Colors.ufOrange,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeLabel: {
    color: Colors.cardWhite,
  },
  inactiveLabel: {
    color: Colors.ufOrange,
  },
});
