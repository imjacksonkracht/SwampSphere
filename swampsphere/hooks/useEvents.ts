import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from '../firebaseConfig';

export type Event = {
  id: string;
  title: string;
  organizer: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  capacity: number;
  spotsLeft: number;
  category: string;
  type: string;
  isVirtual: boolean;
  isFree: boolean;
  tags: string[];
};

type FirestoreEvent = Omit<Event, 'id'> & {
  createdAt?: unknown;
};

const mapEvent = (id: string, event: FirestoreEvent): Event => ({
  id,
  title: event.title ?? '',
  organizer: event.organizer ?? '',
  date: event.date ?? '',
  startTime: event.startTime ?? '',
  endTime: event.endTime ?? '',
  location: event.location ?? '',
  description: event.description ?? '',
  capacity: event.capacity ?? 0,
  spotsLeft: event.spotsLeft ?? 0,
  category: event.category ?? '',
  type: event.type ?? '',
  isVirtual: event.isVirtual ?? false,
  isFree: event.isFree ?? false,
  tags: Array.isArray(event.tags) ? event.tags : [],
});

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const eventsQuery = query(collection(db, 'events'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const nextEvents = snapshot.docs.map((doc) =>
        mapEvent(doc.id, doc.data() as FirestoreEvent)
      );

      setEvents(nextEvents);
    });

    return unsubscribe;
  }, []);

  return events;
};

export default useEvents;
