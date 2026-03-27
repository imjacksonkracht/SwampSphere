import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/Colors';

export type StatCardProps = {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const shadow: ViewStyle = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 18,
  elevation: 4,
};

export default function StatCard({
  value,
  label,
  icon,
  style,
  valueStyle,
  labelStyle,
}: StatCardProps) {
  const iconContent =
    typeof icon === 'string' || typeof icon === 'number' ? (
      <Text style={styles.iconText}>{icon}</Text>
    ) : React.isValidElement(icon) ? (
      icon
    ) : null;

  return (
    <View style={[styles.card, style]}>
      <View style={styles.iconRow}>
        {iconContent ? <View style={styles.iconBadge}>{iconContent}</View> : null}
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={[styles.value, valueStyle]}>
          {value}
        </Text>
        <Text numberOfLines={1} style={[styles.label, labelStyle]}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 148,
    backgroundColor: Colors.cardWhite,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7ECF2',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md + 2,
    paddingBottom: Spacing.md,
    ...shadow,
  },
  iconRow: {
    minHeight: 32,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  iconBadge: {
    minWidth: 32,
    height: 32,
    paddingHorizontal: Spacing.sm,
    borderRadius: 16,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: Colors.ufBlue,
    fontSize: Typography.md,
    fontWeight: '700',
    lineHeight: 18,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  value: {
    color: Colors.ufBlue,
    fontSize: Typography.display,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 38,
  },
  label: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
});
