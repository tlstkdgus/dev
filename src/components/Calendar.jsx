import styled from 'styled-components';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useState } from 'react';

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: white;
  padding: 10px;
  border-radius: 8px;
`;

const DayCell = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  background: ${({ isSelected }) => isSelected ? '#e6efff' : 'white'};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const WeekdayHeader = styled(DayCell)`
  font-weight: bold;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: default;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const Calendar = ({ selectedDate, onSelectDate }) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date) => {
    onSelectDate(date);
  };

  const isSelectedDay = (date) => {
    return selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  };

  return (
    <CalendarWrapper>
      {weekdays.map(day => (
        <WeekdayHeader key={day}>{day}</WeekdayHeader>
      ))}
      {Array(monthStart.getDay()).fill(null).map((_, i) => (
        <DayCell key={`empty-${i}`} />
      ))}
      {days.map(day => (
        <DayCell
          key={day.toISOString()}
          onClick={() => handleDateClick(day)}
          isSelected={isSelectedDay(day)}
        >
          {format(day, 'd')}
        </DayCell>
      ))}
    </CalendarWrapper>
  );
};