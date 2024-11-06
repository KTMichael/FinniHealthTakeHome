import * as React from "react";
import styled from "styled-components";
import { PatientTable, SideBar, TopBar } from "..";
import {
  getAllPatientData,
  getUniversalAdditionalInfoFields,
} from "../../../firebase/databaseFunctions";
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
  Loading: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Spinner: styled.div`
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};

const Dashboard = () => {
  const [patientData, setPatientData] = React.useState();
  const [getUpdatedData, setGetUpdatedData] = React.useState(false);
  const [additionalInfoFields, setAdditionalInfoFields] = React.useState();

  React.useEffect(() => {
    setGetUpdatedData(false);
    getAllPatientData().then((data: any) => {
      setPatientData(data);
    });
    getUniversalAdditionalInfoFields().then((data: any) => {
      setAdditionalInfoFields(data);
    });
  }, [getUpdatedData]);

  const fullPatientData: Patient[] | undefined = React.useMemo(() => {
    return patientData;
  }, [patientData]);

  const allUniversalAdditionalInfoFields = React.useMemo(() => {
    return additionalInfoFields;
  }, [additionalInfoFields]);

  return (
    <Styled.Container aria-label="Patient Management Dashboard">
      <SideBar />
      <Styled.MainSection>
        <TopBar title="Patient Management Dashboard"></TopBar>
        {fullPatientData && allUniversalAdditionalInfoFields ? (
          <PatientTable
            patientData={fullPatientData}
            setGetUpdatedData={setGetUpdatedData}
            allUniversalAdditionalInfoFields={allUniversalAdditionalInfoFields}
          />
        ) : (
          <Styled.Loading>
            <Styled.Spinner></Styled.Spinner>
          </Styled.Loading>
        )}
      </Styled.MainSection>
    </Styled.Container>
  );
};

export default Dashboard;
