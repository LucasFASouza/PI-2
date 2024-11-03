import React, { useState, useEffect } from "react";
import BookingCalendar from "./BookingCalendar";
import AvailableTimes from "./AvailableTimes";
import ClientForm from "./ClientForm";
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

function Admin() {

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}

export default Admin;
