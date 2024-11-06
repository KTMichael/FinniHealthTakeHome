import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  MainDemographicsForm,
  AdditionalAddressForm,
  AdditionalInfoForm,
  AddAdditionalInfoFieldForm,
} from "../Forms";
import {
  DialogContent,
  DialogOverlay,
  Title,
  Button,
} from "./SubComponentStyles/popOverStyles";
import styled from "styled-components";
import {
  DefaultMainDemographicValues,
  DefaultAdditionalAddress,
  MainDemoTitles,
  AdditionalAddressTitles,
  AdditionalInfoTitles,
  AdditionalInfoButtonText,
} from "../constants";
import { Patient, AdditionalAddresses, AdditionalField } from "../../types";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeleteUniversalInfoFields } from ".";

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
    margin: 0 0 -10px 0;
    font-size: 35px;
  `,
  Icon: styled(FontAwesomeIcon)`
    padding-left: 10px;
    cursor: pointer;
    :hover {
      color: #ed762f;
    }
  `,
  Details: styled(Dialog.Description)`
    color: white;
    margin: 0 0 0 10px;
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
  allUniversalAdditionalInfoFields?: { [x: string]: string };
  details?: string;
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
  allUniversalAdditionalInfoFields,
  details,
}) => {
  const [open, setOpen] = React.useState(false);
  const [formComponent, setFormComponent] = React.useState(
    <MainDemographicsForm
      setOpen={setOpen}
      formValues={DefaultMainDemographicValues}
      setGetUpdatedData={setGetUpdatedData}
      allUniversalAdditionalInfoFields={allUniversalAdditionalInfoFields}
    />
  );

  React.useEffect(() => {
    if (Object.values(MainDemoTitles).includes(title)) {
      setFormComponent(
        <MainDemographicsForm
          setOpen={setOpen}
          formValues={mainDemographics ?? DefaultMainDemographicValues}
          setGetUpdatedData={setGetUpdatedData}
          allUniversalAdditionalInfoFields={allUniversalAdditionalInfoFields}
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
        if (
          buttonText === AdditionalInfoButtonText.allAdd &&
          setGetUpdatedData
        ) {
          setFormComponent(
            <AddAdditionalInfoFieldForm
              setOpen={setOpen}
              formValues={id}
              fieldDestination="all"
              fieldNames={fieldNames}
              setGetUpdatedData={setGetUpdatedData}
            />
          );
        } else {
          setFormComponent(
            <AddAdditionalInfoFieldForm
              setOpen={setOpen}
              formValues={id}
              fieldDestination="current"
              fieldNames={fieldNames}
              setGetUpdatedData={setGetUpdatedData}
            />
          );
        }
      } else if (title === AdditionalInfoTitles.edit) {
        setFormComponent(
          <AdditionalInfoForm setOpen={setOpen} formValues={additionalField} />
        );
      } else if (setGetUpdatedData && title === AdditionalInfoTitles.delete) {
        setFormComponent(
          <DeleteUniversalInfoFields
            fieldNames={fieldNames}
            setGetUpdatedData={setGetUpdatedData}
          />
        );
      }
    }
  }, [mainDemographics, additionalAddress, fieldNames, additionalField]);
  return (
    <div>
      <Dialog.Root
        open={open}
        onOpenChange={setOpen}
        aria-label="Pop Over Container"
        aria-describedby={undefined}
      >
        <Dialog.Trigger asChild>
          {triggerType === "button" ? (
            <Styled.ButtonContainer>
              <Button aria-label={`Pop Over ${buttonText} Button`}>
                {buttonText}
              </Button>
            </Styled.ButtonContainer>
          ) : (
            <Styled.Icon icon={faPen} aria-label="Edit" />
          )}
        </Dialog.Trigger>
        <Dialog.Portal>
          <DialogOverlay />
          <Styled.DialogContent aria-describedby={undefined}>
            <Styled.Title aria-label="Pop Over Title">{title}</Styled.Title>
            {details ? (
              <Styled.Details>{details}</Styled.Details>
            ) : (
              <Styled.Details></Styled.Details>
            )}
            {formComponent}
          </Styled.DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default PopOver;
