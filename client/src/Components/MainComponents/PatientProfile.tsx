import * as React from "react";
import { SideBar, TopBar, PopOver } from "../";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import {
  db,
  deleteAddress,
  deleteAdditionalField,
} from "../../../../Firebase/databaseFunctions";
import { Styled } from "./MainComponentStyles/patientProfileStyles";
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
  AdditionalInfoDetails,
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
        universalAdditionalInfoFields:
          doc.data()?.universalAdditionalInfoFields,
        patientSpecificAdditionalInfoFields:
          doc.data()?.patientSpecificAdditionalInfoFields,
      });
    });
    return () => {
      unsub();
    };
  }, []);
  const displayAddress = () => {
    return additionalAddresses?.addresses?.map((address, index) => {
      return (
        <Styled.AdditionalAddress
          key={`address num ${index}`}
          aria-label="Additional Address"
        >
          <Styled.AddressTitle>
            {address.title}:
            <Styled.EditDelete>
              <Styled.Icon
                icon={faTrashCan}
                onClick={() => deleteAddress(address, additionalAddresses.id)}
                aria-label="Delete Additional Address"
              />
              <PopOver
                title={AdditionalAddressTitles.edit}
                triggerType="icon"
                additionalAddress={{
                  addresses: [address],
                  id: additionalAddresses.id,
                }}
                aria-label="Edit Additional Address"
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
      const additional = additionalInfo.universalAdditionalInfoFields;
      const patientSpecific =
        additionalInfo.patientSpecificAdditionalInfoFields;
      const additionalInfoData = { ...additional, ...patientSpecific };
      const fields = Object.keys(additionalInfoData).sort((a, b) =>
        a.localeCompare(b)
      );
      setAdditionalInfoFields(fields);
    }
  }, [additionalInfo]);

  const displayAdditionalInfo = (additionalInfo, dbTitle) => {
    if (additionalInfo) {
      const fields = Object.keys(additionalInfo).sort((a, b) =>
        a.localeCompare(b)
      );
      return fields.map((fieldName) => {
        return (
          <Styled.AdditionalField
            key={fieldName}
            aria-label={`Additional Info ${fieldName}`}
          >
            <Styled.AdditionalFieldTitle>
              {fieldName}:
            </Styled.AdditionalFieldTitle>
            <Styled.AdditionalInfoValue>
              {additionalInfo[fieldName].fieldLabel
                ? `${additionalInfo[fieldName].fieldValue} ${additionalInfo[fieldName].fieldLabel}`
                : additionalInfo[fieldName].fieldValue}
            </Styled.AdditionalInfoValue>
            <Styled.EditDelete>
              {dbTitle === "universalAdditionalInfoFields" ? null : (
                <Styled.Icon
                  icon={faTrashCan}
                  onClick={() =>
                    deleteAdditionalField(
                      fieldName,
                      additionalAddresses.id,
                      dbTitle
                    )
                  }
                  aria-label={`Delete ${fieldName} Field`}
                />
              )}

              <PopOver
                title={AdditionalInfoTitles.edit}
                triggerType="icon"
                additionalField={{
                  id: state.id,
                  fieldName: fieldName,
                  fieldValue: additionalInfo[fieldName],
                  title: dbTitle,
                }}
                aria-label={`Edit ${fieldName} Field`}
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
    <Styled.Container aria-label="Patient Profile">
      <SideBar />
      <Styled.MainSection>
        <TopBar title="Patient Profile"></TopBar>
        <Styled.ButtonContainer>
          <Styled.BacktoDashBoard
            onClick={() => goBackToDashboard()}
            aria-label="Back to Dashboard Button"
          >
            <Styled.ArrowIcon icon={faArrowLeft} />
            Back to Dashboard
          </Styled.BacktoDashBoard>
        </Styled.ButtonContainer>
        <Styled.PatientInfo>
          <Styled.MainDemographics aria-label="Main Demographics">
            <Styled.Header>
              <Styled.Name aria-label="Patient Full Name">
                <div>{mainDemographics.firstName}</div>
                <div>{mainDemographics.middleName} </div>
                <div>{mainDemographics.lastName}</div>
              </Styled.Name>
              <Styled.PatientIcon
                icon={faUserAstronaut}
                aria-label="Patient Icon"
              />
            </Styled.Header>
            <Styled.Line />
            <Styled.Body>
              <Styled.ContentContainer>
                <Styled.Content>
                  <Styled.Label>Intake Status:</Styled.Label>
                  <Styled.Value aria-label="Patient Intake Status">
                    {mainDemographics.intakeStatus}
                  </Styled.Value>
                  <Styled.Label>Date of Birth:</Styled.Label>
                  <Styled.Value aria-label="Patient Date of Birth">
                    {mainDemographics.dob}
                  </Styled.Value>
                </Styled.Content>
                <Styled.Content>
                  <Styled.Label>Phone Number:</Styled.Label>
                  <Styled.Value aria-label="Patient Phone Number">
                    {formatPhoneNumber(mainDemographics.phoneNumber)}
                  </Styled.Value>
                </Styled.Content>
                <Styled.Content>
                  <Styled.Label>Email:</Styled.Label>
                  <Styled.Value aria-label="Patient Email">
                    {mainDemographics.email}
                  </Styled.Value>
                </Styled.Content>
                <Styled.Content>
                  <Styled.Label>Primary Address:</Styled.Label>
                  <Styled.Value aria-label="Patient Primary Address">
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
              <div aria-label="Edit Main Demographics Button">
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
                aria-label="Add Additional Address Button"
              />
            </Styled.AddAddress>
          </Styled.MainDemographics>
          <Styled.AdditionalInfo aria-label="Additional Info Container">
            <Styled.AdditionalInfoHeader>
              <Styled.CardTitle>Additional Information</Styled.CardTitle>
              <Styled.AddAdditionalInfoFields>
                <PopOver
                  title={AdditionalInfoTitles.add}
                  buttonText={AdditionalInfoButtonText.singleAdd}
                  triggerType="button"
                  id={state.id}
                  fieldNames={additionalInfoFields}
                  aria-label="Add Additional Info Field to Current Patient"
                  details={AdditionalInfoDetails.singleAdd}
                />
              </Styled.AddAdditionalInfoFields>
            </Styled.AdditionalInfoHeader>
            <Styled.Line />
            <Styled.AdditionalInfoContentContainer>
              <Styled.AdditionalInfoContent aria-label="Patient Specific Additional Info">
                <Styled.AdditionalInfoContentTitle>
                  Patient Specific Fields:
                </Styled.AdditionalInfoContentTitle>
                <Styled.AdditionalInfoContentBody>
                  {displayAdditionalInfo(
                    additionalInfo?.patientSpecificAdditionalInfoFields,
                    "patientSpecificAdditionalInfoFields"
                  )}
                </Styled.AdditionalInfoContentBody>
              </Styled.AdditionalInfoContent>
              <Styled.AdditionalInfoContent aria-label="Universal Additional Info">
                <Styled.AdditionalInfoContentTitle>
                  Universal Fields:
                </Styled.AdditionalInfoContentTitle>
                <Styled.AdditionalInfoContentBody>
                  {displayAdditionalInfo(
                    additionalInfo?.universalAdditionalInfoFields,
                    "universalAdditionalInfoFields"
                  )}
                </Styled.AdditionalInfoContentBody>
              </Styled.AdditionalInfoContent>
            </Styled.AdditionalInfoContentContainer>
          </Styled.AdditionalInfo>
        </Styled.PatientInfo>
      </Styled.MainSection>
    </Styled.Container>
  );
};

export default PatientProfile;
