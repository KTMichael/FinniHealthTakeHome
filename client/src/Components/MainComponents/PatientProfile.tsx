import * as React from "react";
import { SideBar, TopBar, PopOver } from "..";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db, deleteAddress, deleteAdditionalField } from "../databaseFunctions";
import { Styled } from "../ComponentStyles/patientProfileStyles";
import {
  faArrowLeft,
  faUserAstronaut,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { formatPhoneNumber } from "../helpers";
import { Patient, AdditionalAddresses, AdditionalInfo } from "../../types";
import {
  MainDemoTitles,
  DefaultAdditionalAddresses,
  AdditionalAddressTitles,
  AdditionalInfoTitles,
  DefaultAdditionalAddress,
  AdditionalInfoButtonText,
  AdditionalAddressButtonText,
} from "../constants";

const PatientProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const goBackToDashboard = () => {
    navigate(`/dashboard`);
  };
  const [mainDemographics, setMainDemographics] = React.useState<Patient | any>(
    {
      firstName: state.firstName,
      middleName: state.middleName,
      lastName: state.lastName,
      dob: state.dob,
      email: state.email,
      phoneNumber: state.phoneNumber,
      intakeStatus: state.intakeStatus,
      primaryAddress: state.primaryAddress,
      primaryAddress2: state.primaryAddress2,
      primaryCity: state.primaryCity,
      primaryState: state.primaryState,
      primaryZipcode: state.primaryZipcode,
      id: state.id,
    }
  );
  const [additionalAddresses, setAdditionalAddresses] =
    React.useState<AdditionalAddresses>({
      addresses: state.addtionalAddresses ?? DefaultAdditionalAddresses,
      id: state.id,
    });
  const [additionalInfo, setAdditionalInfo] =
    React.useState<AdditionalInfo | null>();
  const [additionalInfoFields, setAdditionalInfoFields] =
    React.useState<string[]>();
  React.useEffect(() => {
    const id = state.id;
    const unsub = onSnapshot(doc(db, "PatientData", id), (doc) => {
      setMainDemographics({
        firstName: doc.data()?.firstName,
        middleName: doc.data()?.middleName,
        lastName: doc.data()?.lastName,
        dob: doc.data()?.dob,
        email: doc.data()?.email,
        phoneNumber: doc.data()?.phoneNumber,
        intakeStatus: doc.data()?.intakeStatus,
        primaryAddress: doc.data()?.primaryAddress,
        primaryAddress2: doc.data()?.primaryAddress2,
        primaryCity: doc.data()?.primaryCity,
        primaryState: doc.data()?.primaryState,
        primaryZipcode: doc.data()?.primaryZipcode,
        id: doc.id,
      });
      setAdditionalAddresses({
        addresses: doc.data()?.additionalAddress,
        id: doc.id,
      });
      setAdditionalInfo({
        additionalInfo: doc.data()?.additionalInfo,
        additionalPatientSpecificInfo:
          doc.data()?.additionalPatientSpecificInfo,
      });
    });
    return () => {
      unsub();
    };
  }, []);
  const displayAddress = () => {
    return additionalAddresses?.addresses?.map((address, index) => {
      return (
        <Styled.AdditionalAddress key={`address num ${index}`}>
          <Styled.AddressTitle>
            {address.title}:
            <Styled.EditDelete>
              <Styled.Icon
                icon={faTrashCan}
                onClick={() => deleteAddress(address, additionalAddresses.id)}
              />
              <PopOver
                title={AdditionalAddressTitles.edit}
                triggerType="icon"
                additionalAddress={{
                  addresses: [address],
                  id: additionalAddresses.id,
                }}
              />
            </Styled.EditDelete>
          </Styled.AddressTitle>
          <div>
            {address.address}, {address.address2} {address.city},{" "}
            {address.state} {address.zipcode}
          </div>
        </Styled.AdditionalAddress>
      );
    });
  };

  React.useEffect(() => {
    if (additionalInfo) {
      const additional = additionalInfo.additionalInfo;
      const patientSpecific = additionalInfo.additionalPatientSpecificInfo;
      const additionalInfoData = { ...additional, ...patientSpecific };
      const fields = Object.keys(additionalInfoData).sort((a, b) =>
        a.localeCompare(b)
      );
      setAdditionalInfoFields(fields);
    }
  }, [additionalInfo]);

  const displayAdditionalInfo = (additionalInfo, dbTitle) => {
    if (additionalInfo) {
      const fields = Object.keys(additionalInfo);
      return fields.map((fieldName) => {
        return (
          <Styled.AdditionalField key={fieldName}>
            <Styled.AdditionalFieldTitle>
              {fieldName}:
            </Styled.AdditionalFieldTitle>
            {additionalInfo[fieldName]}
            <Styled.EditDelete>
              <Styled.Icon
                icon={faTrashCan}
                onClick={() =>
                  deleteAdditionalField(
                    fieldName,
                    additionalAddresses.id,
                    dbTitle
                  )
                }
              />
              <PopOver
                title={AdditionalInfoTitles.edit}
                triggerType="icon"
                additionalField={{
                  id: state.id,
                  fieldName: fieldName,
                  fieldValue: additionalInfo[fieldName] && "",
                  title: dbTitle,
                }}
              />
            </Styled.EditDelete>
          </Styled.AdditionalField>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <Styled.Container>
      <SideBar />
      <Styled.MainSection>
        <TopBar title="Patient Profile"></TopBar>
        <Styled.ButtonContainer>
          <Styled.BacktoDashBoard onClick={() => goBackToDashboard()}>
            <Styled.ArrowIcon icon={faArrowLeft} />
            Back to Dashboard
          </Styled.BacktoDashBoard>
        </Styled.ButtonContainer>
        <Styled.PatientInfo>
          <Styled.MainDemographics>
            <Styled.Header>
              <Styled.Name>
                <div>{mainDemographics.firstName}</div>
                <div>{mainDemographics.middleName} </div>
                <div>{mainDemographics.lastName}</div>
              </Styled.Name>
              <Styled.UserIcon icon={faUserAstronaut} />
            </Styled.Header>
            <Styled.Line />
            <Styled.Body>
              <Styled.ContentContainer>
                <Styled.Content>
                  <Styled.Label>Intake Status:</Styled.Label>
                  <Styled.Value>{mainDemographics.intakeStatus}</Styled.Value>
                  <Styled.Label>Date of Birth:</Styled.Label>
                  <Styled.Value>{mainDemographics.dob}</Styled.Value>
                </Styled.Content>
                <Styled.Content>
                  <Styled.Label>Phone Number:</Styled.Label>
                  <Styled.Value>
                    {formatPhoneNumber(mainDemographics.phoneNumber)}
                  </Styled.Value>
                </Styled.Content>
                <Styled.Content>
                  <Styled.Label>Email:</Styled.Label>
                  <Styled.Value>{mainDemographics.email}</Styled.Value>
                </Styled.Content>
                <Styled.Content>
                  <Styled.Label>Primary Address:</Styled.Label>
                  <Styled.Value>
                    {mainDemographics.primaryAddress},{" "}
                    {mainDemographics.primaryAddress2}{" "}
                    {mainDemographics.primaryCity},{" "}
                    {mainDemographics.primaryState}{" "}
                    {mainDemographics.primaryZipcode}
                  </Styled.Value>
                </Styled.Content>
                <Styled.Content>
                  <Styled.Label>Additional Addresses: </Styled.Label>
                  {displayAddress()}
                </Styled.Content>
              </Styled.ContentContainer>
              <div>
                <PopOver
                  title={MainDemoTitles.edit}
                  mainDemographics={mainDemographics}
                  triggerType="icon"
                />
              </div>
            </Styled.Body>
            <Styled.AddAddress>
              <PopOver
                title={AdditionalAddressTitles.add}
                buttonText={AdditionalAddressButtonText.add}
                triggerType="button"
                additionalAddress={{
                  addresses: [DefaultAdditionalAddress],
                  id: state.id,
                }}
              />
            </Styled.AddAddress>
          </Styled.MainDemographics>
          <Styled.AdditionalInfo>
            <Styled.AdditionalInfoHeader>
              <Styled.CardTitle>Additional Information</Styled.CardTitle>
              <Styled.AddAdditionalInfoFields>
                <PopOver
                  title={AdditionalInfoTitles.add}
                  buttonText={AdditionalInfoButtonText.single}
                  triggerType="button"
                  id={state.id}
                  fieldNames={additionalInfoFields}
                />
                <PopOver
                  title={AdditionalInfoTitles.add}
                  buttonText={AdditionalInfoButtonText.all}
                  triggerType="button"
                  id={state.id}
                  fieldNames={additionalInfoFields}
                />
              </Styled.AddAdditionalInfoFields>
            </Styled.AdditionalInfoHeader>
            <Styled.Line />
            <Styled.AdditionalInfoFields>
              Patient Specific Fields:
              {displayAdditionalInfo(
                additionalInfo?.additionalPatientSpecificInfo,
                "additionalPatientSpecificInfo"
              )}
              Universal Fields:
              {displayAdditionalInfo(
                additionalInfo?.additionalInfo,
                "additionalInfo"
              )}
            </Styled.AdditionalInfoFields>
          </Styled.AdditionalInfo>
        </Styled.PatientInfo>
      </Styled.MainSection>
    </Styled.Container>
  );
};

export default PatientProfile;
