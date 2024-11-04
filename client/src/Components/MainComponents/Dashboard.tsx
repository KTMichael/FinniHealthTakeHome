import * as React from "react";
import styled from "styled-components";
import { PatientTable, SideBar, TopBar } from "..";
import { getAllPatientData } from "../databaseFunctions";
import { Patient } from "../../types";

const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: #e1d2c6;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: scroll;
  `,
  MainSection: styled.div`
    margin: 5px;
    height: calc(100vh - 150px);
  `,
};

const Dashboard = () => {
  const [patientData, setPatientData] = React.useState();
  const [getUpdatedData, setGetUpdatedData] = React.useState(false);

  React.useEffect(() => {
    setGetUpdatedData(false);
    getAllPatientData().then((data: any) => {
      setPatientData(data);
    });
  }, [getUpdatedData]);

  const fullPatientData: Patient[] | undefined = React.useMemo(() => {
    return patientData;
  }, [patientData]);

  return (
    <Styled.Container>
      <SideBar />
      <Styled.MainSection>
        <TopBar title="Patient Management Dashboard"></TopBar>
        {fullPatientData ? (
          <PatientTable
            patientData={fullPatientData}
            setGetUpdatedData={setGetUpdatedData}
          />
        ) : (
          <div>is Loading</div>
        )}
      </Styled.MainSection>
    </Styled.Container>
  );
};

export default Dashboard;
