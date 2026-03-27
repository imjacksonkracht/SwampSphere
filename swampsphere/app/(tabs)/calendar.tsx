import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Typography } from '@/constants/Colors';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
const WEEKDAY_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
const TODAY = new Date(2026, 1, 24);

type AgendaEvent = {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  accentColor: string;
};

const agendaEvents: AgendaEvent[] = [
  {
    id: 'career-chat',
    title: 'Career Chat',
    date: new Date(2026, 1, 11),
    time: '3:30 PM - 4:15 PM',
    location: 'Heavener 235',
    accentColor: '#88AEEB',
  },
  {
    id: 'club-meeting',
    title: 'Club Meeting',
    date: new Date(2026, 1, 18),
    time: '7:00 PM - 8:00 PM',
    location: 'Little Hall 101',
    accentColor: '#FDB08F',
  },
  {
    id: 'theory',
    title: 'Theory',
    date: TODAY,
    time: '11:45 AM - 12:35 PM',
    location: 'EN 1064',
    accentColor: Colors.ufBlue,
  },
  {
    id: 'workshop',
    title: 'Workshop',
    date: TODAY,
    time: '1:00 PM - 2:15 PM',
    location: 'Reitz Union G230',
    accentColor: Colors.ufOrange,
  },
  {
    id: 'study-group',
    title: 'Study Group',
    date: new Date(2026, 1, 27),
    time: '6:30 PM - 8:00 PM',
    location: 'Marston 215',
    accentColor: '#88AEEB',
  },
];

export default function CalendarScreen() {
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(TODAY.getFullYear(), TODAY.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(TODAY);

  const calendarDays = buildCalendarDays(visibleMonth);
  const selectedEvents = agendaEvents.filter((event) =>
    isSameDay(event.date, selectedDate)
  );
  const isSelectedToday = isSameDay(selectedDate, TODAY);
  const agendaDateLabel = `${WEEKDAY_SHORT[selectedDate.getDay()]} ${padNumber(
    selectedDate.getMonth() + 1
  )}/${padNumber(selectedDate.getDate())}`;

  const handleChangeMonth = (offset: number) => {
    setVisibleMonth((currentMonth) => {
      const nextMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + offset,
        1
      );

      return nextMonth;
    });
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);

    if (
      date.getMonth() !== visibleMonth.getMonth() ||
      date.getFullYear() !== visibleMonth.getFullYear()
    ) {
      setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>My Calendar</Text>
          <Text style={styles.subtitle}>Keep your UF schedule in one place.</Text>
        </View>

        <View style={styles.agendaCard}>
          <View style={styles.agendaHeader}>
            <View>
              <Text style={styles.agendaLabel}>{agendaDateLabel}</Text>
              <Text style={styles.agendaHeading}>
                {isSelectedToday ? 'Today' : 'Selected Day'}
              </Text>
            </View>

            <View style={styles.todayBadge}>
              <Text style={styles.todayBadgeText}>
                {isSelectedToday ? 'Today' : `${selectedEvents.length} item${selectedEvents.length === 1 ? '' : 's'}`}
              </Text>
            </View>
          </View>

          <View style={styles.agendaList}>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <View
                  key={event.id}
                  style={[
                    styles.agendaItem,
                    { borderLeftColor: event.accentColor },
                  ]}>
                  <Text style={styles.agendaItemTitle}>{event.title}</Text>
                  <Text style={styles.agendaItemMeta}>
                    {event.time} · {event.location}
                  </Text>
                </View>
              ))
            ) : (
              <View style={[styles.agendaItem, styles.emptyAgendaItem]}>
                <Text style={styles.agendaItemTitle}>No agenda items</Text>
                <Text style={styles.agendaItemMeta}>
                  Tap another day to view scheduled events.
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Pressable
              accessibilityLabel="Show previous month"
              accessibilityRole="button"
              onPress={() => handleChangeMonth(-1)}
              style={({ pressed }) => [
                styles.monthButton,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.monthButtonText}>{'<'}</Text>
            </Pressable>

            <View style={styles.monthControls}>
              <View style={styles.dropdownPill}>
                <Text style={styles.dropdownText}>
                  {MONTH_NAMES[visibleMonth.getMonth()]} v
                </Text>
              </View>
              <View style={styles.dropdownPill}>
                <Text style={styles.dropdownText}>{visibleMonth.getFullYear()} v</Text>
              </View>
            </View>

            <Pressable
              accessibilityLabel="Show next month"
              accessibilityRole="button"
              onPress={() => handleChangeMonth(1)}
              style={({ pressed }) => [
                styles.monthButton,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.monthButtonText}>{'>'}</Text>
            </Pressable>
          </View>

          <View style={styles.weekdayRow}>
            {WEEKDAY_LABELS.map((label) => (
              <Text key={label} style={styles.weekdayLabel}>
                {label}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {calendarDays.map((day) => {
              const inMonth =
                day.getMonth() === visibleMonth.getMonth() &&
                day.getFullYear() === visibleMonth.getFullYear();
              const selected = isSameDay(day, selectedDate);
              const eventsForDay = agendaEvents.filter((event) =>
                isSameDay(event.date, day)
              );

              return (
                <Pressable
                  accessibilityRole="button"
                  key={day.toISOString()}
                  onPress={() => handleSelectDate(day)}
                  style={({ pressed }) => [
                    styles.dayCell,
                    selected && styles.dayCellSelected,
                    !inMonth && styles.dayCellMuted,
                    pressed && styles.pressed,
                  ]}>
                  <Text
                    style={[
                      styles.dayNumber,
                      !inMonth && styles.dayNumberMuted,
                      selected && styles.dayNumberSelected,
                    ]}>
                    {day.getDate()}
                  </Text>

                  {selected && isSameDay(day, TODAY) ? (
                    <Text style={styles.todayTag}>TODAY</Text>
                  ) : (
                    <View style={styles.dotRow}>
                      {eventsForDay.slice(0, 2).map((event) => (
                        <View
                          key={event.id}
                          style={[
                            styles.eventDot,
                            { backgroundColor: event.accentColor },
                          ]}
                        />
                      ))}
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function buildCalendarDays(month: Date) {
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = new Date(firstDayOfMonth);
  gridStart.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function padNumber(value: number) {
  return String(value).padStart(2, '0');
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
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  headerBlock: {
    gap: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.display,
    fontWeight: '800',
    lineHeight: 38,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.md,
    lineHeight: 22,
  },
  agendaCard: {
    alignSelf: 'flex-end',
    width: '86%',
    maxWidth: 340,
    backgroundColor: Colors.ufBlue,
    borderRadius: 24,
    padding: Spacing.md,
    gap: Spacing.md,
    shadowColor: '#001B4F',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },
  agendaHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  agendaLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: Typography.sm,
    fontWeight: '700',
    letterSpacing: 1,
  },
  agendaHeading: {
    marginTop: 6,
    color: Colors.cardWhite,
    fontSize: Typography.xxl,
    fontWeight: '800',
    lineHeight: 30,
  },
  todayBadge: {
    backgroundColor: Colors.ufOrange,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  todayBadgeText: {
    color: Colors.cardWhite,
    fontSize: Typography.sm,
    fontWeight: '800',
  },
  agendaList: {
    gap: Spacing.sm,
  },
  agendaItem: {
    backgroundColor: Colors.cardWhite,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4E2FA',
    borderLeftWidth: 5,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 4,
  },
  emptyAgendaItem: {
    borderLeftColor: '#B9CBEA',
  },
  agendaItemTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    fontWeight: '800',
    lineHeight: 20,
  },
  agendaItemMeta: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    fontWeight: '600',
    lineHeight: 18,
  },
  calendarCard: {
    backgroundColor: Colors.cardWhite,
    borderRadius: 28,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E3EAF3',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  monthControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  monthButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F2F6FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
  dropdownPill: {
    minWidth: 96,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: '#E1E8F0',
    alignItems: 'center',
  },
  dropdownText: {
    color: Colors.textPrimary,
    fontSize: Typography.sm,
    fontWeight: '700',
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '14.2857%',
    minHeight: 66,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#FBFCFE',
  },
  dayCellSelected: {
    backgroundColor: '#EAF1FF',
  },
  dayCellMuted: {
    backgroundColor: '#F7F8FB',
  },
  dayNumber: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    fontWeight: '700',
    lineHeight: 20,
  },
  dayNumberSelected: {
    color: Colors.ufBlue,
  },
  dayNumberMuted: {
    color: Colors.textMuted,
  },
  dotRow: {
    minHeight: 10,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  todayTag: {
    marginTop: 6,
    color: Colors.ufBlue,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  pressed: {
    opacity: 0.82,
  },
});
