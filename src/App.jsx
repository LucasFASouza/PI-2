import { Routes, Route, Link } from "react-router-dom";
import Agendamento from "./components/Agendamento";
import Admin from "./components/Admin"; // Import your new component
import styled from "styled-components";

const AppContainer = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Agendamento />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
