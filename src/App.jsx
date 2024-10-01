import { useState, useEffect } from "react";
import BookingCalendar from "./components/BookingCalendar";
import AvailableTimes from "./components/AvailableTimes";
import ClientForm from "./components/ClientForm";
import styled from "styled-components";

const DoubleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  min-height: 500px;
  justify-items: center;
`;

const HalfWidthContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [clientData, setClientData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    petName: "",
    petSpecies: "",
    petBreed: "",
    petAge: "",
  });

  const [formStage, setFormStage] = useState(1);

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  function advanceStage() {
    console.log(clientData);

    if (formStage === 1 && (!selectedDate || !selectedTime)) {
      alert("Selecione uma data e um horário para continuar.");
      return;
    } else if (formStage === 2 && !clientData.clientName) {
      alert("Preencha o nome do cliente para continuar.");
      return;
    }
    setFormStage(formStage + 1);
  }

  return (
    <>
      <h1>Agendamento Veterinário</h1>

      {formStage === 1 && (
        <>
          <DoubleContainer>
            <HalfWidthContainer>
              <BookingCalendar
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            </HalfWidthContainer>
            <HalfWidthContainer>
              <AvailableTimes
                selectedDate={selectedDate}
                onTimeSelect={setSelectedTime}
                selectedTime={selectedTime}
              />
            </HalfWidthContainer>
          </DoubleContainer>

          <button onClick={advanceStage}>Avançar</button>
        </>
      )}

      {formStage === 2 && (
        <ClientForm
          clientData={clientData}
          setClientData={setClientData}
          advanceStage={advanceStage}
          RetrieveStage={() => setFormStage(formStage - 1)}
        />
      )}

      {formStage === 3 && (
        <div>
          <h2>Resumo do agendamento:</h2>
          <p>
            <strong>Data:</strong> {selectedDate}
          </p>
          <p>
            <strong>Horário:</strong> {selectedTime}
          </p>
          <p>
            <strong>Cliente:</strong> {clientData.clientName}
          </p>
          <p>
            <strong>Email:</strong> {clientData.clientEmail}
          </p>
          <p>
            <strong>Telefone:</strong> {clientData.clientPhone}
          </p>
          <p>
            <strong>Pet:</strong> {clientData.petName}
          </p>
          <p>
            <strong>Espécie:</strong> {clientData.petSpecies}
          </p>
          <p>
            <strong>Raça:</strong> {clientData.petBreed}
          </p>
          <p>
            <strong>Idade:</strong> {clientData.petAge}
          </p>

          <button onClick={() => setFormStage(formStage - 1)}>Voltar</button>

          <button onClick={() => alert("Agendamento confirmado!")}>
            Confirmar
          </button>
        </div>
      )}
    </>
  );
}

export default App;
