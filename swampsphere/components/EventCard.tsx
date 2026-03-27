import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/Colors';

export type EventCardProps = {
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  description: string;
  spotsLeft: number;
  id: string;
  registered: boolean;
  isSaved: boolean;
  onRegister?: (id: string) => void;
  onSave?: (id: string, nextSavedState: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export default function EventCard({
  title,
  organizer,
  date,
  time,
  location,
  description,
  spotsLeft,
  id,
  registered,
  isSaved,
  onRegister,
  onSave,
  style,
}: EventCardProps) {
  const handleRegister = () => {
    if (!registered) {
      onRegister?.(id);
    }
  };

  const handleSave = () => {
    onSave?.(id, !isSaved);
  };

  const spotsLabel =
    spotsLeft === 0 ? 'No spots left' : `${spotsLeft} Spot${spotsLeft === 1 ? '' : 's'} Left`;

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.organizer}>{organizer}</Text>
        </View>

        <Pressable
          accessibilityLabel={isSaved ? 'Remove event from saved items' : 'Save event'}
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleSave}
          style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
          <Text style={styles.saveIcon}>{isSaved ? '♥' : '♡'}</Text>
        </Pressable>
      </View>

      <View style={styles.metaGroup}>
        <DetailRow icon="📅" text={`${date} • ${time}`} />
        <DetailRow icon="📍" text={location} />
      </View>

      <Text numberOfLines={3} style={styles.description}>
        {description}
      </Text>

      <View style={styles.footerRow}>
        <Text style={styles.spots}>{spotsLabel}</Text>

        <Pressable
          accessibilityRole="button"
          disabled={registered}
          onPress={handleRegister}
          style={({ pressed }) => [
            styles.registerButton,
            registered ? styles.registeredButton : styles.registerNowButton,
            pressed && !registered && styles.pressed,
          ]}>
          <Text
            style={[
              styles.registerButtonText,
              registered ? styles.registeredButtonText : styles.registerNowButtonText,
            ]}>
            {registered ? 'Registered' : 'Register Now'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

type DetailRowProps = {
  icon: string;
  text: string;
};

function DetailRow({ icon, text }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text numberOfLines={1} style={styles.detailText}>
        {text}
      </Text>
    </View>
  );
}

const shadow: ViewStyle = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 18,
  elevation: 4,
};

const buttonTextBase: TextStyle = {
  fontSize: Typography.sm,
  fontWeight: '700',
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardWhite,
    borderRadius: 16,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: '#E7ECF2',
    ...shadow,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  headerCopy: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: '700',
    lineHeight: 22,
  },
  organizer: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    fontWeight: '500',
  },
  saveButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveIcon: {
    color: Colors.ufOrange,
    fontSize: 18,
    lineHeight: 20,
  },
  metaGroup: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailIcon: {
    width: 18,
    color: Colors.ufBlue,
    fontSize: Typography.sm,
    textAlign: 'center',
  },
  detailText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    fontWeight: '500',
  },
  description: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    lineHeight: 22,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  spots: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: Typography.sm,
    fontWeight: '600',
  },
  registerButton: {
    minWidth: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerNowButton: {
    backgroundColor: Colors.registerNow,
  },
  registeredButton: {
    backgroundColor: '#EAF1FF',
  },
  registerButtonText: buttonTextBase,
  registerNowButtonText: {
    color: Colors.cardWhite,
  },
  registeredButtonText: {
    color: Colors.registered,
  },
  pressed: {
    opacity: 0.8,
  },
});
