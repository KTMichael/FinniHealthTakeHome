import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

import { Patient } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMobileScreenButton,
  faCakeCandles,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { formatPhoneNumber } from ".././helpers";
import { Styled } from "../ComponentStyles/hoverCardStyles";
import { useNavigate } from "react-router-dom";

interface Props {
  rowData: Patient;
}
const HoverCardContainer: React.FC<Props> = ({ rowData }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/patientProfile/${rowData.id}`, { state: rowData });
  };
  return (
    <HoverCard.Portal>
      <HoverCard.Content sideOffset={5}>
        <Styled.Container>
          <Styled.Header>
            <Styled.Name>
              {rowData.firstName} {rowData.middleName} {rowData.lastName}
            </Styled.Name>
            <Styled.ButtonContainer>
              <Styled.ViewProfile onClick={() => goToProfile()}>
                View Profile
              </Styled.ViewProfile>
            </Styled.ButtonContainer>
          </Styled.Header>
          <Styled.Line />
          <Styled.Content>
            <FontAwesomeIcon icon={faCakeCandles} />
            <Styled.Value>{rowData.dob}</Styled.Value>
          </Styled.Content>
          <Styled.Content>
            <FontAwesomeIcon icon={faMobileScreenButton} />
            <Styled.Value>
              {formatPhoneNumber(rowData.phoneNumber)}
            </Styled.Value>
          </Styled.Content>
          <Styled.Content>
            <FontAwesomeIcon icon={faKeyboard} />
            <Styled.Value>{rowData.email}</Styled.Value>
          </Styled.Content>
          <Styled.Content>
            <FontAwesomeIcon icon={faHouse} />
            <Styled.Value>
              {rowData.primaryAddress}, {rowData.primaryAddress2}{" "}
              {rowData.primaryCity}, {rowData.primaryState}{" "}
              {rowData.primaryZipcode}
            </Styled.Value>
          </Styled.Content>
        </Styled.Container>
        <HoverCard.Arrow className="HoverCardArrow" />
      </HoverCard.Content>
    </HoverCard.Portal>
  );
};

export default HoverCardContainer;
