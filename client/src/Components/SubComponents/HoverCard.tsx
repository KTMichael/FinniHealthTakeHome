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
import { Styled } from "./SubComponentStyles/hoverCardStyles";
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
        <Styled.Container aria-label="Hover Card Container">
          <Styled.Header>
            <Styled.Name aria-label="Hover Card Patient Name">
              {rowData.firstName} {rowData.middleName} {rowData.lastName}
            </Styled.Name>
            <Styled.ButtonContainer>
              <Styled.ViewProfile
                onClick={() => goToProfile()}
                aria-label="View Patient Profile Button"
              >
                View Profile
              </Styled.ViewProfile>
            </Styled.ButtonContainer>
          </Styled.Header>
          <Styled.Line />
          <Styled.Content aria-label="Hover Card Patient Date of Birth">
            <FontAwesomeIcon icon={faCakeCandles} />
            <Styled.Value>{rowData.dob}</Styled.Value>
          </Styled.Content>
          <Styled.Content aria-label="Hover Card Patient Phone Number">
            <FontAwesomeIcon icon={faMobileScreenButton} />
            <Styled.Value>
              {formatPhoneNumber(rowData.phoneNumber)}
            </Styled.Value>
          </Styled.Content>
          <Styled.Content aria-label="Hover Card Patient Email">
            <FontAwesomeIcon icon={faKeyboard} />
            <Styled.Value>{rowData.email}</Styled.Value>
          </Styled.Content>
          <Styled.Content aria-label="Hover Card Patient Primary Address">
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
