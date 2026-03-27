import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Typography } from '@/constants/Colors';

const classSchedule = [
  {
    code: 'POT2002',
    name: 'Introduction to Political Theory',
    time: '11:45 AM - 12:35 PM',
    room: 'EN 1064',
  },
  {
    code: 'MAC2312',
    name: 'Analytic Geometry and Calculus 2',
    time: '12:50 PM - 1:40 PM',
    room: 'MOW 1029',
  },
  {
    code: 'POS2041',
    name: 'American Federal Government',
    time: '3:00 PM - 3:50 PM',
    room: 'TUR 2332',
  },
  {
    code: 'CPO2001',
    name: 'Comparative Politics',
    time: '4:05 PM - 4:55 PM',
    room: 'MCHL 100',
  },
  {
    code: 'PHI2010',
    name: 'Introduction to Philosophy',
    time: '6:15 PM - 7:05 PM',
    room: 'LIT 0109',
  },
] as const;

const interests = [
  'Career Prep',
  'Creative Writing',
  'Religion',
  'Gaming',
  'Volunteering',
  'Foodies',
  'Sustainability',
  'Outdoors',
  'Technology',
  'Culture',
  'Academic',
  'Student Government',
] as const;

export default function ProfileScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.headerRow}>
          <View style={styles.headerCopy}>
            <Text style={styles.screenTitle}>My Profile</Text>
            <Text style={styles.screenSubtitle}>
              Keep your academic snapshot and campus interests in one place.
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JG</Text>
          </View>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.name}>Jordan Gator</Text>
          <Text style={styles.major}>Political Science Major</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Junior (Third Year)</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Track</Text>
              <Text style={styles.summaryValue}>Pre-Law</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Minor</Text>
              <Text style={styles.summaryValue}>History</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Classes</Text>
          <View style={styles.termPill}>
            <Text style={styles.termPillText}>Spring 2026</Text>
          </View>
        </View>

        <View style={styles.scheduleCard}>
          {classSchedule.map((course, index) => (
            <View
              key={course.code}
              style={[
                styles.classRow,
                index < classSchedule.length - 1 && styles.classRowBorder,
              ]}>
              <View style={styles.classAccent} />

              <View style={styles.classCopy}>
                <Text style={styles.classCode}>{course.code}</Text>
                <Text style={styles.className}>{course.name}</Text>
                <Text style={styles.classMeta}>
                  {course.time} · {course.room}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Interests</Text>
        </View>

        <View style={styles.interestsCard}>
          <View style={styles.interestsWrap}>
            {interests.map((interest) => (
              <View key={interest} style={styles.interestChip}>
                <Text style={styles.interestChipText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  headerCopy: {
    flex: 1,
    gap: Spacing.xs,
  },
  screenTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.display,
    fontWeight: '800',
    lineHeight: 38,
  },
  screenSubtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.md,
    lineHeight: 22,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#EAF1FF',
    borderWidth: 2,
    borderColor: '#C7D7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.ufBlue,
    fontSize: 24,
    fontWeight: '800',
  },
  profileCard: {
    backgroundColor: Colors.cardWhite,
    borderRadius: 24,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
    marginBottom: Spacing.xl,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: Typography.xxl,
    fontWeight: '800',
    lineHeight: 32,
  },
  major: {
    color: Colors.textSecondary,
    fontSize: Typography.md,
    lineHeight: 22,
    marginTop: Spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
    borderRadius: 999,
    backgroundColor: '#EAF1FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  badgeText: {
    color: Colors.ufBlue,
    fontSize: Typography.sm,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryLabel: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  summaryValue: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.xl,
    fontWeight: '800',
    lineHeight: 26,
  },
  termPill: {
    borderRadius: 999,
    backgroundColor: '#FFF1EA',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  termPillText: {
    color: Colors.ufOrange,
    fontSize: Typography.sm,
    fontWeight: '700',
  },
  scheduleCard: {
    backgroundColor: Colors.cardWhite,
    borderRadius: 24,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
    marginBottom: Spacing.xl,
  },
  classRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: 16,
  },
  classRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEFF5',
  },
  classAccent: {
    width: 4,
    minHeight: 54,
    borderRadius: 999,
    backgroundColor: Colors.ufOrange,
    marginTop: 2,
  },
  classCopy: {
    flex: 1,
    gap: 4,
  },
  classCode: {
    color: Colors.ufBlue,
    fontSize: Typography.sm,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  className: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    fontWeight: '700',
    lineHeight: 21,
  },
  classMeta: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    lineHeight: 18,
  },
  interestsCard: {
    backgroundColor: Colors.cardWhite,
    borderRadius: 24,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },
  interestsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#B7CBF7',
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  interestChipText: {
    color: Colors.ufBlue,
    fontSize: Typography.sm,
    fontWeight: '600',
  },
});
