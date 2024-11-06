import * as React from "react";
import { Login, Dashboard, PatientProfile } from "./Components/MainComponents";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

const Styled = {
  Container: styled.div`
    background-color: #b7a692;
    margin: 0;
    display: inline-block;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    position: fixed;
  `,
};

const App = () => {
  return (
    <Styled.Container>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patientProfile/:id" element={<PatientProfile />} />
      </Routes>
    </Styled.Container>
  );
};

export default App;
