import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  MainDemographicsForm,
  AdditionalAddressForm,
  AdditionalInfoForm,
  AddAdditionalInfoField,
} from "../Forms";
import {
  DialogContent,
  DialogOverlay,
  Title,
  Button,
} from "../ComponentStyles/componentStyles";
import styled from "styled-components";
import {
  DefaultMainDemographicValues,
  DefaultAdditionalAddress,
  MainDemoTitles,
  AdditionalAddressTitles,
  AdditionalInfoTitles,
  AdditionalInfoButtonText,
} from ".././constants";
import { Patient, AdditionalAddresses, AdditionalField } from "../../types";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Styled = {
  DialogContent: styled(DialogContent)`
    background-color: #4a3a54;
  `,
  ButtonContainer: styled.div`
    :hover {
      background-color: #141414;
      color: white;
    }
  `,
  Title: styled(Title)`
    color: #fbf7f0;
    margin: 0 0 -5px 0;
    font-size: 35px;
  `,
  Icon: styled(FontAwesomeIcon)`
    padding-left: 10px;
    cursor: pointer;
    :hover {
      color: #ed762f;
    }
  `,
};

interface Props {
  title: string;
  buttonText?: string;
  mainDemographics?: Patient;
  additionalAddress?: AdditionalAddresses;
  setGetUpdatedData?: (boolean) => void;
  triggerType: string;
  fieldNames?: string[];
  id?: string;
  additionalField?: AdditionalField;
}

const PopOver: React.FC<Props> = ({
  title,
  buttonText,
  mainDemographics,
  additionalAddress,
  setGetUpdatedData,
  triggerType,
  fieldNames,
  id,
  additionalField,
}) => {
  const [open, setOpen] = React.useState(false);
  const [formComponent, setFormComponent] = React.useState(
    <MainDemographicsForm
      setOpen={setOpen}
      formValues={DefaultMainDemographicValues}
      setGetUpdatedData={setGetUpdatedData}
    />
  );

  React.useEffect(() => {
    if (Object.values(MainDemoTitles).includes(title)) {
      setFormComponent(
        <MainDemographicsForm
          setOpen={setOpen}
          formValues={mainDemographics ?? DefaultMainDemographicValues}
          setGetUpdatedData={setGetUpdatedData}
        />
      );
    }
    if (Object.values(AdditionalAddressTitles).includes(title)) {
      if (additionalAddress && !additionalAddress.addresses) {
        additionalAddress.addresses = [DefaultAdditionalAddress];
      }
      setFormComponent(
        <AdditionalAddressForm
          setOpen={setOpen}
          formValues={additionalAddress}
        />
      );
    }
    if (Object.values(AdditionalInfoTitles).includes(title)) {
      if (title === AdditionalInfoTitles.add) {
        setFormComponent(
          <AddAdditionalInfoField
            setOpen={setOpen}
            formValues={id}
            fieldDestination={
              buttonText === AdditionalInfoButtonText.all ? "all" : "current"
            }
            fieldNames={fieldNames}
          />
        );
      } else if (title === AdditionalInfoTitles.edit) {
        setFormComponent(
          <AdditionalInfoForm setOpen={setOpen} formValues={additionalField} />
        );
      }
    }
  }, [mainDemographics, additionalAddress, fieldNames, additionalField]);
  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          {triggerType === "button" ? (
            <Styled.ButtonContainer>
              <Button>{buttonText}</Button>
            </Styled.ButtonContainer>
          ) : (
            <Styled.Icon icon={faPen} />
          )}
        </Dialog.Trigger>
        <Dialog.Portal>
          <DialogOverlay />
          <Styled.DialogContent>
            <Styled.Title>{title}</Styled.Title>
            {formComponent}
          </Styled.DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default PopOver;
