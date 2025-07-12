import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useUserSchedule } from '../../hooks/useUserSchedule';
import { colors, spacing, typography } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(new Date()));
  const { loading, schedule } = useUserSchedule();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function getWeekDates(date) {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startDate);
      weekDate.setDate(diff + i);
      week.push(weekDate);
    }
    return week;
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek[0]);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentWeek(getWeekDates(newDate));
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  const getEventsForDate = (date) => {
    return schedule.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDate(eventDate, date);
    });
  };

  const renderTimeSlot = (hour) => {
    const events = getEventsForDate(selectedDate).filter(event => {
      const eventHour = new Date(`1970-01-01T${event.startTime}`).getHours();
      return eventHour === hour;
    });

    return (
      <View key={hour} style={styles.timeSlot}>
        <View style={styles.timeLabel}>
          <Text style={styles.timeText}>
            {hour.toString().padStart(2, '0')}:00
          </Text>
        </View>
        <View style={styles.eventContainer}>
          {events.map((event, index) => (
            <TouchableOpacity key={index} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>
                {event.startTime} - {event.endTime}
              </Text>
              {event.location && (
                <Text style={styles.eventLocation}>{event.location}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Week Navigation */}
      <View style={styles.weekHeader}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateWeek(-1)}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekContainer}
        >
          {currentWeek.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                isSameDate(date, selectedDate) && styles.selectedDay,
                isToday(date) && styles.todayButton,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={[
                styles.dayText,
                isSameDate(date, selectedDate) && styles.selectedDayText,
                isToday(date) && styles.todayText,
              ]}>
                {daysOfWeek[date.getDay()]}
              </Text>
              <Text style={[
                styles.dateText,
                isSameDate(date, selectedDate) && styles.selectedDateText,
                isToday(date) && styles.todayText,
              ]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateWeek(1)}
        >
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Selected Date Header */}
      <View style={styles.dateHeader}>
        <Text style={styles.selectedDateTitle}>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Schedule View */}
      <ScrollView style={styles.scheduleContainer} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 24 }, (_, i) => renderTimeSlot(i))}
      </ScrollView>

      {/* Add Event FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          // Navigate to add event screen
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    elevation: 2,
  },
  navButton: {
    padding: spacing.sm,
  },
  weekContainer: {
    paddingHorizontal: spacing.sm,
  },
  dayButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.xs,
    borderRadius: 12,
    minWidth: 50,
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  todayButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dayText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  selectedDayText: {
    color: colors.white,
  },
  todayText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  dateText: {
    ...typography.h6,
    color: colors.text,
  },
  selectedDateText: {
    color: colors.white,
  },
  dateHeader: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedDateTitle: {
    ...typography.h5,
    color: colors.text,
    textAlign: 'center',
  },
  scheduleContainer: {
    flex: 1,
  },
  timeSlot: {
    flexDirection: 'row',
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timeLabel: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  timeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  eventContainer: {
    flex: 1,
    padding: spacing.xs,
  },
  eventCard: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  eventTitle: {
    ...typography.body1,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  eventDetails: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.xs,
  },
  eventLocation: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  fab: {
    position: 'absolute',
    margin: spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

