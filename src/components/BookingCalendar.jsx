import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  format,
  eachDayOfInterval,
  isSameDay,
  parseISO,
  startOfWeek,
  addDays,
  getDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeekRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DayButton = styled.button`
  background-color: ${(props) => (props.$isHighlighted ? "#4CAF50" : "#ddd")};
  color: ${(props) => (props.$isHighlighted ? "#fff" : "#888")};
  margin: 5px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
`;

const DayLabel = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  margin: 5px;
`;

const EmptyDay = styled.div`
  flex: 1;
  margin: 5px;
  padding: 10px;
`;

const BookingCalendar = ({ onDateSelect }) => {
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [interval, setInterval] = useState({ start: null, end: null });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3030/time-slots");
      const data = await response.json();
      const dates = data.map((slot) => parseISO(slot.date));
      setHighlightedDates(dates);

      if (dates.length > 0) {
        const start = dates.reduce(
          (min, date) => (date < min ? date : min),
          dates[0]
        );
        const end = dates.reduce(
          (max, date) => (date > max ? date : max),
          dates[0]
        );
        setInterval({ start, end });
      }
    };

    fetchData();
  }, []);

  if (!interval.start || !interval.end) {
    return <div>Loading...</div>;
  }

  const days = eachDayOfInterval({ start: interval.start, end: interval.end });

  const startDayOfWeek = startOfWeek(interval.start, { locale: ptBR });
  const dayLabels = Array.from({ length: 7 }).map((_, index) =>
    format(addDays(startDayOfWeek, index), "EEEEEE", { locale: ptBR })
  );

  const weeks = [];
  let daysInWeek = Array(getDay(interval.start))
    .fill(null)
    .map((_, index) => <EmptyDay key={`empty-start-${index}`} />);

  days.forEach((day, index) => {
    const isHighlighted = highlightedDates.some((highlightedDate) =>
      isSameDay(day, highlightedDate)
    );

    daysInWeek.push(
      <DayButton
        key={index}
        $isHighlighted={isHighlighted}
        onClick={() => onDateSelect(format(day, "yyyy-MM-dd"))}
      >
        {format(day, "dd/MM")}
      </DayButton>
    );

    if (daysInWeek.length === 7) {
      weeks.push(<WeekRow key={`week-${index}`}>{daysInWeek}</WeekRow>);
      daysInWeek = [];
    }
  });

  if (daysInWeek.length > 0) {
    while (daysInWeek.length < 7) {
      daysInWeek.push(<EmptyDay key={`empty-end-${daysInWeek.length}`} />);
    }
    weeks.push(<WeekRow key="last">{daysInWeek}</WeekRow>);
  }

  return (
    <CalendarContainer>
      <WeekRow>
        {dayLabels.map((label, index) => (
          <DayLabel key={index}>{label}</DayLabel>
        ))}
      </WeekRow>
      {weeks}
    </CalendarContainer>
  );
};

export default BookingCalendar;
