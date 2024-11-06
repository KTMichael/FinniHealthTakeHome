import * as React from "react";
import { deleteFieldFromCollection } from "../../../../firebase/databaseFunctions";
import styled from "styled-components";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Styled = {
  Container: styled.div`
    background-color: #f1eade;
    border-radius: 10px;
    padding: 10px;
    overflow: scroll;
  `,
  Icon: styled(FontAwesomeIcon)`
    padding-left: 10px;
    cursor: pointer;
    :hover {
      color: #ed762f;
    }
  `,
  AdditionalField: styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px black;
    padding: 5px;
    font-weight: normal;
    font-size: 16px;
  `,
  AdditionalFieldTitle: styled.div`
    font-weight: bold;
    margin-right: 8px;
  `,
  EditDelete: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  DeleteFieldText: styled.div`
    color: black;
    text-align: center;
  `,
};

interface Props {
  fieldNames?: string[];
  setGetUpdatedData: (boolean) => void;
}

const DeleteUniversalInfoFields: React.FC<Props> = ({
  fieldNames,
  setGetUpdatedData,
}) => {
  const displayFields = () => {
    if (fieldNames && fieldNames.length >= 1) {
      Object.keys(fieldNames).sort((a, b) => a.localeCompare(b));
      return fieldNames?.map((fieldName) => {
        return (
          <Styled.AdditionalField
            key={fieldName}
            aria-label={`Additional Info ${fieldName}`}
          >
            <Styled.AdditionalFieldTitle>
              {fieldName}:
            </Styled.AdditionalFieldTitle>
            <Styled.EditDelete>
              <Styled.Icon
                icon={faTrashCan}
                onClick={() => {
                  deleteFieldFromCollection(
                    fieldName,
                    "universalAdditionalInfoFields"
                  ).then(() => {
                    setGetUpdatedData(true);
                  });
                }}
                aria-label={`Delete ${fieldName} Field`}
              />
            </Styled.EditDelete>
          </Styled.AdditionalField>
        );
      });
    } else {
      return (
        <Styled.DeleteFieldText>
          There are currently no additional fields to display...
        </Styled.DeleteFieldText>
      );
    }
  };
  return <Styled.Container>{displayFields()} </Styled.Container>;
};

export default DeleteUniversalInfoFields;
