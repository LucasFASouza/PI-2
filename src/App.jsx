import { useState } from "react";
import BookingCalendar from "./components/BookingCalendar";
import AvailableTimes from "./components/AvailableTimes";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
`;

const HalfWidthContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <h1>Agendamento Veterinário</h1>
      <Container>
        <HalfWidthContainer>
          <BookingCalendar onDateSelect={setSelectedDate} />
        </HalfWidthContainer>
        <HalfWidthContainer>
          <AvailableTimes selectedDate={selectedDate} />
        </HalfWidthContainer>
      </Container>
    </>
  );
}

export default App;
