import styled from "styled-components";
import { Button } from "../../SubComponents/SubComponentStyles/popOverStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: #e1d2c6;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: scroll;
  `,
  Line: styled.div`
    border-bottom: 2px solid black;
    width: 100%;
    padding-top: 2px;
  `,
  MainSection: styled.div`
    margin: 5px;
    height: calc(100vh - 150px);
  `,
  Title: styled.h1`
    color: #b1d2df;
  `,
  ButtonContainer: styled.div`
    :hover {
      background-color: #141414;
      color: white;
    }
  `,
  Button: styled(Button)`
    display: flex;
    flex-direction: row;
    gap: 2px;
  `,
  ArrowIcon: styled(FontAwesomeIcon)`
    padding-right: 5px;
  `,
  PatientIcon: styled(FontAwesomeIcon)`
    font-size: 80px;
  `,
  Icon: styled(FontAwesomeIcon)`
    padding-left: 10px;
    :hover {
      color: #ed762f;
    }
    cursor: pointer;
  `,
  PatientInfo: styled.div`
    width: 95%;
    height: calc(100% - 100px);
    margin: 10px auto 0 auto;
    background-color: #f1eade;
    border: solid #333333 1px;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    min-width: 675px;
    min-height: 240px;
  `,
  MainDemographics: styled.div`
    width: 30%;
    min-width: 250px;
    height: calc(100% - 50px);
    margin: 10px auto 0 auto;
    background-color: #f1eade;
    border: solid #333333 1px;
    border-radius: 10px;
    padding: 15px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  `,
  Header: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  Name: styled.div`
    margin: 10px;
    word-wrap: break-word;
    overflow-wrap: anywhere;
    font-weight: bold;
  `,
  Body: styled.div`
    margin-top: 5px;
    height: calc(100% - 135px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: scroll;
  `,
  Label: styled.span`
    font-weight: bold;
  `,
  Value: styled.div`
    padding-left: 10px;
  `,
  Content: styled.div`
    margin: 5px;
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  AdditionalAddress: styled.div`
    margin-left: 10px;
    border-bottom: solid 1px black;
    width: 95%;
  `,
  ContentContainer: styled.div`
    overflow-wrap: anywhere;
  `,
  AddAddress: styled.div`
    text-align: center;
    margin-top: 3px;
  `,
  EditDelete: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  CardTitle: styled.h2`
    margin: 0 0 0 10px;
  `,
  BacktoDashBoard: styled(Button)`
    margin-left: 20px;
  `,
  AddressTitle: styled.div`
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  `,
  AdditionalInfo: styled.div`
    width: 70%;
  `,
  AddAdditionalInfoFields: styled.div`
    font-weight: bold;
    display: flex;
    flex-direction: row;
    gap: 10px;
  `,
  AdditionalInfoHeader: styled.div`
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 10px;
    padding-bottom: 10px;
  `,
  AdditionalFieldTitle: styled.div`
    font-weight: bold;
    margin-right: 8px;
  `,
  AdditionalInfoValue: styled.div`
    overflow-wrap: anywhere;
    max-height: 90px;
    overflow: scroll;
  `,
  AdditionalField: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    border-bottom: solid 1px black;
    padding: 5px;
    font-weight: normal;
    font-size: 16px;
  `,
  AdditionalInfoContentContainer: styled.div`
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
    font-size: 18px;
    height: calc(100% - 34px);
    @media (max-width: 1250px) {
      flex-direction: column;
      justify-content: start;
      gap: 10px;
      width: 100%;
      height: calc(100% - 100px);
    }
  `,
  AdditionalInfoContentTitle: styled.div`
    text-align: center;
    @media (max-width: 1250px) {
      text-align: left;
      margin-left: 5px;
    }
  `,
  AdditionalInfoContent: styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    @media (max-width: 1250px) {
      width: 97%;
      height: 50%;
    }
  `,
  AdditionalInfoContentBody: styled.div`
    height: calc(100% - 96px);
    width: 95%;
    margin: 10px auto 0 auto;
    background-color: #f1eade;
    border: solid #333333 1px;
    border-radius: 10px;
    padding: 10px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    @media (max-width: 1250px) {
      height: calc(100% - 65px);
      min-height: 25px;
    }
  `,
};
