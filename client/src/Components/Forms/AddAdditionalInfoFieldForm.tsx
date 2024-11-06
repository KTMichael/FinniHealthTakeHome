import React from "react";
import type { FieldApi, FieldValidateFn } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Styled } from "./formStyles";
import {
  addFieldToCollection,
  addAdditionalFieldToPatient,
} from "../databaseFunctions";
import { upperCase } from "../helpers";

const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
};

interface Props {
  setOpen: (boolean) => void;
  formValues: string;
  fieldDestination: string;
  fieldNames?: string[];
  details: string;
  setGetUpdatedData?: (boolean) => void;
}

export const AddAdditionalInfoField = ({
  setOpen,
  formValues,
  fieldDestination,
  fieldNames,
  setGetUpdatedData,
}) => {
  const form = useForm({
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
      };
      if (payload) {
        if (fieldDestination === "all" && setGetUpdatedData) {
          addFieldToCollection(payload).then(() => {
            setOpen(false);
            setGetUpdatedData(true);
          });
        } else {
          addAdditionalFieldToPatient(payload, formValues).then(() => {
            setOpen(false);
          });
        }
      }
    },
    defaultValues: formValues,
  });

  const fieldNameValidator: FieldValidateFn<any, any, any, any, any> = ({
    value,
  }) =>
    value && fieldNames && fieldNames.includes(value.trim())
      ? "Field already exists"
      : undefined;

  const fieldTypeValidator: FieldValidateFn<any, any, any, any, any> = ({
    value,
  }) => (!value ? "Type is required" : undefined);

  return (
    <Styled.Container aria-label="Add Additional Patient Information Fields Form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Styled.FormFieldContainer aria-label="Add Additional Patient Information Field Name Form Container">
          <form.Field
            name="fieldName"
            validators={{
              onChange: fieldNameValidator,
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Add Additional Info Name Field Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="New Field Name Title Label"
                  >
                    New Field Name*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(upperCase(e.target.value))
                    }
                    placeholder={"Height"}
                    aria-label="New Field Name Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Add Additional Info Name Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Add Additional Patient Information Field Type Form Container">
          <form.Field
            name="fieldType"
            validators={{
              onChange: fieldTypeValidator,
            }}
            children={(field) => (
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="New Field Type Title Label"
                  >
                    New Field Type*:
                  </Styled.Label>
                  <Styled.Select
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    aria-label="New Field Type Input"
                  >
                    <option hidden>Select your option</option>
                    <option>Number</option>
                    <option>Text</option>
                  </Styled.Select>
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="New Field Type Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Styled.ButtonContainer>
              <Styled.Button
                type="submit"
                disabled={!canSubmit}
                aria-label="New Field Submit Button"
              >
                {isSubmitting ? "..." : "Submit"}
              </Styled.Button>
            </Styled.ButtonContainer>
          )}
        />
      </form>
    </Styled.Container>
  );
};

export default AddAdditionalInfoField;
