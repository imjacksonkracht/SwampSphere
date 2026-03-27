import React, { useState } from 'react';
import { SymbolView } from 'expo-symbols';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryChip from '@/components/CategoryChip';
import EventCard from '@/components/EventCard';
import { Colors, Spacing, Typography } from '@/constants/Colors';

const categories = [
  'CS',
  'Engineering',
  'Business',
  'Health',
  'Arts',
  'Pre-Law',
  'Outdoors',
  'Social',
] as const;

type EventItem = {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  description: string;
  spotsLeft: number;
  registered: boolean;
  isSaved: boolean;
};

const initialEvents: EventItem[] = [
  {
    id: 'mental-health-workshop',
    title: 'Mental Health Workshop',
    organizer: 'Counseling and Wellness Center',
    date: 'Tuesday, February 24',
    time: '1:00 PM - 2:45 PM',
    location: 'Reitz Union G230',
    description:
      'Interactive workshop on mental health advocacy, peer support, and campus resources. Learn how to start conversations about mental health and support your friends.',
    spotsLeft: 5,
    registered: true,
    isSaved: false,
  },
  {
    id: 'mock-interview-night',
    title: 'Mock Interview Night',
    organizer: 'Career Connections Center',
    date: 'Tuesday, February 24',
    time: '6:00 PM - 8:00 PM',
    location: 'Hillel Foundation',
    description:
      'Sign up to hold mock interviews with professionals from various industries. Receive feedback on your resume, interviewing skills, and professional presence. Business casual attire required.',
    spotsLeft: 35,
    registered: false,
    isSaved: false,
  },
];

export default function SwampSphereScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>('CS');
  const [events, setEvents] = useState(initialEvents);

  const handleSave = (id: string, nextSavedState: boolean) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id ? { ...event, isSaved: nextSavedState } : event
      )
    );
  };

  const handleRegister = (id: string) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id ? { ...event, registered: true } : event
      )
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.date}>Tuesday, February 24, 2026</Text>
          <Text style={styles.title}>SwampSphere</Text>
        </View>

        <View style={styles.searchBar}>
          <SymbolView name="magnifyingglass" size={18} tintColor={Colors.textMuted} />
          <TextInput
            placeholder="Search clubs, events, and more"
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.chipRow}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <CategoryChip
              isActive={selectedCategory === category}
              key={category}
              label={category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Clubs</Text>
          <Text style={styles.sectionSubtitle}>Curated for your campus interests</Text>
        </View>

        <View style={styles.eventList}>
          {events.map((event) => (
            <EventCard
              date={event.date}
              description={event.description}
              id={event.id}
              isSaved={event.isSaved}
              key={event.id}
              location={event.location}
              onRegister={handleRegister}
              onSave={handleSave}
              organizer={event.organizer}
              registered={event.registered}
              spotsLeft={event.spotsLeft}
              style={styles.eventCard}
              time={event.time}
              title={event.title}
            />
          ))}
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
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  header: {
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: Typography.md,
    lineHeight: 22,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.display,
    fontWeight: '800',
    lineHeight: 38,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.cardWhite,
    borderWidth: 1,
    borderColor: '#DFE5EC',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.md,
    paddingVertical: 0,
  },
  chipRow: {
    paddingVertical: Spacing.xs,
    paddingRight: Spacing.md,
    gap: Spacing.sm,
  },
  sectionHeader: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    gap: 2,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.xl,
    fontWeight: '800',
    lineHeight: 26,
  },
  sectionSubtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    lineHeight: 18,
  },
  eventList: {
    gap: Spacing.md,
  },
  eventCard: {
    marginBottom: 0,
  },
});
