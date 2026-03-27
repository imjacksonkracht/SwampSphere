import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Typography } from '@/constants/Colors';

const stats = [
  { icon: '⏳', label: 'Holds', value: 1 },
  { icon: '✓', label: 'To-Do', value: 0 },
  { icon: '📅', label: 'Events Today', value: 2, highlighted: true },
];

const scheduleItems = [
  {
    title: 'PB002 Introduction to Political Theory',
    time: '4:45 AM - 12:35 PM',
    location: 'Weil Hall 192',
    backgroundColor: '#EAF1FF',
    borderColor: '#B8CDF7',
    accentColor: Colors.ufBlue,
  },
  {
    title: 'Mental Health Workshop',
    time: '1:00 PM - 2:15 PM',
    location: 'Reitz Union G230',
    backgroundColor: '#FFF1EA',
    borderColor: '#FFC8B5',
    accentColor: Colors.ufOrange,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.headerSection}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>Albert</Text>
          <Text style={styles.subheading}>Your campus snapshot for today.</Text>
        </View>

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <StatTile
              highlighted={stat.highlighted}
              icon={stat.icon}
              key={stat.label}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEyebrow}>TODAY&apos;S FEATURED EVENT</Text>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>Upcoming</Text>
          </View>
        </View>

        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleTitle}>TODAY&apos;S SCHEDULE</Text>

          <View style={styles.scheduleList}>
            {scheduleItems.map((item) => (
              <View
                key={item.title}
                style={[
                  styles.scheduleCard,
                  {
                    backgroundColor: item.backgroundColor,
                    borderColor: item.borderColor,
                  },
                ]}>
                <View
                  style={[
                    styles.scheduleAccent,
                    { backgroundColor: item.accentColor },
                  ]}
                />
                <View style={styles.scheduleCopy}>
                  <Text style={styles.scheduleItemTitle}>{item.title}</Text>
                  <Text style={styles.scheduleMeta}>
                    {item.time} · {item.location}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <LinearGradient
          colors={[Colors.ufOrange, '#8E4CF3']}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.banner}>
          <Text style={styles.bannerTitle}>New SwampSphere</Text>
          <Text style={styles.bannerSubtitle}>
            Discover involvement opportunities tailored to your interests. Build
            your personalized campus agenda.
          </Text>

          <Pressable accessibilityRole="button" style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Get Started</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

type StatTileProps = {
  icon: string;
  label: string;
  value: number;
  highlighted?: boolean;
};

function StatTile({ icon, label, value, highlighted = false }: StatTileProps) {
  return (
    <View style={[styles.statCard, highlighted && styles.statCardHighlighted]}>
      <View
        style={[
          styles.statIconBadge,
          highlighted && styles.statIconBadgeHighlighted,
        ]}>
        <Text
          style={[styles.statIconText, highlighted && styles.statIconTextHighlighted]}>
          {icon}
        </Text>
      </View>

      <Text style={[styles.statValue, highlighted && styles.statValueHighlighted]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, highlighted && styles.statLabelHighlighted]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  headerSection: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    color: Colors.textSecondary,
    fontSize: Typography.md,
    lineHeight: 22,
  },
  name: {
    marginTop: 2,
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
  },
  subheading: {
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
    fontSize: Typography.md,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    minHeight: 128,
    backgroundColor: Colors.cardWhite,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E1E8F0',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  statCardHighlighted: {
    backgroundColor: Colors.ufOrange,
    borderColor: Colors.ufOrange,
  },
  statIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconBadgeHighlighted: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statIconText: {
    fontSize: Typography.md,
  },
  statIconTextHighlighted: {
    color: Colors.cardWhite,
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
  },
  statValueHighlighted: {
    color: Colors.cardWhite,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16,
  },
  statLabelHighlighted: {
    color: '#FFE2D8',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  sectionEyebrow: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.sm,
    fontWeight: '800',
    letterSpacing: 1,
  },
  sectionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#FFF1EA',
  },
  sectionBadgeText: {
    color: Colors.ufOrange,
    fontSize: Typography.sm,
    fontWeight: '700',
  },
  scheduleSection: {
    marginBottom: Spacing.xl,
  },
  scheduleTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  scheduleList: {
    gap: Spacing.sm,
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  scheduleAccent: {
    width: 6,
  },
  scheduleCopy: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    gap: 6,
  },
  scheduleItemTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    fontWeight: '700',
    lineHeight: 22,
  },
  scheduleMeta: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    fontWeight: '600',
    lineHeight: 18,
  },
  banner: {
    borderRadius: 24,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  bannerTitle: {
    color: Colors.cardWhite,
    fontSize: Typography.xxl,
    fontWeight: '800',
    lineHeight: 32,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: Typography.md,
    lineHeight: 22,
  },
  bannerButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.cardWhite,
    marginTop: Spacing.xs,
  },
  bannerButtonText: {
    color: Colors.cardWhite,
    fontSize: Typography.sm,
    fontWeight: '800',
  },
});
