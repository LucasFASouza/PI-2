import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const TimesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const TimesTitle = styled.h2`
  margin: 10px 0;
`;

const TimeButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  margin: 5px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #45a049;
  }
`;

const TimeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NoTimesMessage = styled.div`
  margin: 10px 0;
  color: #888;
`;

const AvailableTimes = ({ selectedDate }) => {
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3030/time-slots");
      const data = await response.json();
      const times = data
        .filter((slot) => slot.date === selectedDate)
        .map((slot) => slot.time);
      setAvailableTimes(times);
    };

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  return (
    <TimesContainer>
      <TimesTitle>
        {selectedDate
          ? `Horários Disponíveis para ${format(
              parseISO(selectedDate),
              "dd/MM/yyyy",
              { locale: ptBR }
            )}`
          : "Selecione uma data para ver os horários disponíveis"}
      </TimesTitle>
      {selectedDate &&
        (availableTimes.length > 0 ? (
          <TimeList>
            {availableTimes.map((time, index) => (
              <li key={index}>
                <TimeButton>{time}</TimeButton>
              </li>
            ))}
          </TimeList>
        ) : (
          <NoTimesMessage>Nenhum horário disponível</NoTimesMessage>
        ))}
    </TimesContainer>
  );
};

export default AvailableTimes;
