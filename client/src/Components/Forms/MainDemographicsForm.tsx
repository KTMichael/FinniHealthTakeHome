import * as React from "react";
import type { FieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Styled } from "./formStyles";
import {
  createNewPatient,
  updatePatientData,
} from "../../../../firebase/databaseFunctions";
import { TFormData, Patient } from "../../types";
import { deepCompare } from "../helpers";

const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
      {field.state.meta.isDirty}
    </>
  );
};

interface Props {
  setOpen: (boolean) => void;
  setGetUpdatedData: (boolean) => void;
  formValues: Patient;
  allUniversalAdditionalInfoFields: { [x: string]: string };
}

const MainDemographicsForm = ({
  setOpen,
  formValues,
  setGetUpdatedData,
  allUniversalAdditionalInfoFields,
}) => {
  const form = useForm<TFormData>({
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        intakeStatus: "Active",
      };
      const diffs = deepCompare(formValues, payload);
      if (payload) {
        if (formValues.firstName !== "" && diffs) {
          updatePatientData(diffs, formValues.id).then(() => {
            setOpen(false);
          });
        } else {
          payload["universalAdditionalInfoFields"] =
            allUniversalAdditionalInfoFields;
          createNewPatient(payload).then(() => {
            setOpen(false);
            setGetUpdatedData(true);
          });
        }
      }
    },
    defaultValues: formValues,
  });

  return (
    <Styled.ExpandingContainer aria-label="Main Demographics Form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Styled.FormFieldContainer aria-label="Main Demographics Form Container">
          <form.Field
            aria-label="Main Demographics First Name Field"
            name="firstName"
            validators={{
              onChange: z
                .string({
                  required_error: "First Name is required",
                  invalid_type_error: "First Name must be a string",
                })
                .trim()
                .regex(/^[A-Za-z]+$/, "Required - May only contain letters"),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics First Name Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics First Name Label"
                  >
                    First Name*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    placeholder={"Jane"}
                    aria-label="Main Demographics First Name Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics First Name Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Middle Name Form Container">
          <form.Field
            aria-label="Main Demographics Middle Name Field"
            name="middleName"
            validators={{
              onChange: z
                .string({
                  required_error: "Middle Name is required",
                  invalid_type_error: "Middle Name must be a string",
                })
                .trim()
                .regex(/^[A-Za-z]+$/, "Required - May only contain letters"),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics Middle Name Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Middle Name Label"
                  >
                    Middle Name*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    placeholder={"Marie"}
                    aria-label="Main Demographics Middle Name Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Middle Name Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Last Name Form Container">
          <form.Field
            aria-label="Main Demographics Last Name Field"
            name="lastName"
            validators={{
              onChange: z
                .string({
                  required_error: "Last Name is required",
                  invalid_type_error: "Last Name must be a string",
                })
                .trim()
                .regex(/^[A-Za-z]+$/, "Required - May only contain letters"),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Last Name Label"
                  >
                    Last Name*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"Doe"}
                    aria-label="Main Demographics Last Name Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Last Name Field Form"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Phone Number Form Container">
          <form.Field
            aria-label="Main Demographics Phone Number Field"
            name="phoneNumber"
            validators={{
              onChange: z
                .string({
                  required_error: "Phone Number is required",
                  invalid_type_error: "Phone Number must be a number",
                })
                .trim()
                .regex(/^[0-9]+$/, "Required - May only contain Numbers"),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics Phone Number Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Phone Number Label"
                  >
                    Phone Number*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"5095559876"}
                    maxLength={10}
                    aria-label="Main Demographics Phone Number Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Phone Number Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Date Of Birth Form Container">
          <form.Field
            aria-label="Main Demographics Date Of Birth Field"
            name="dob"
            validators={{
              onChange: z
                .string({
                  required_error: "Date of Birth is required",
                  invalid_type_error: "Date of Birth must be a string",
                })
                .trim(),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics Date Of Birth Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Date Of Birth Label"
                  >
                    Date of Birth*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"01/01/2001"}
                    aria-label="Main Demographics Date Of Birth Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Date Of Birth Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Email Form Container">
          <form.Field
            aria-label="Main Demographics Email Field"
            name="email"
            validators={{
              onChange: z
                .string({
                  required_error: "Main Demographics Email is required",
                  invalid_type_error:
                    "Main Demographics Email must be a string",
                })
                .trim(),
              onChangeAsync: z
                .string()
                .email()
                .trim()
                .refine(async (value) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return !value.includes("error");
                }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics Email Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Email Label"
                  >
                    Email*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"example@email.com"}
                    aria-label="Main Demographics Email Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Email Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Primary Address Field Container">
          <form.Field
            aria-label="Main Demographics Primary Address Field"
            name="primaryAddress"
            validators={{
              onChange: z
                .string({
                  required_error: "Primary Address is required",
                  invalid_type_error: "Primary Address must be a string",
                })
                .trim(),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Primary Address Label"
                  >
                    Primary Address*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"1234 1st Ave"}
                    aria-label="Main Demographics Primary Address Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Primary Address Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Primary Address2 Field Container">
          <form.Field
            aria-label="Main Demographics Primary Address2 Field"
            name="primaryAddress2"
            validators={{
              onChange: z
                .string({
                  required_error: "Primary Address 2 is required",
                  invalid_type_error: "Primary Address must be a string",
                })
                .trim(),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics Primary Address2 Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Primary Address2 Label"
                  >
                    Primary Address 2:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"Apt 34"}
                    aria-label="Main Demographics Primary Address2 Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Primary Address2 Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Primary City Form Container">
          <form.Field
            aria-label="Main Demographics Primary City Field"
            name="primaryCity"
            validators={{
              onChange: z
                .string({
                  required_error: "Primary City is required",
                  invalid_type_error: "Primary City must be a string",
                })
                .trim()
                .regex(/^[A-Za-z]+$/, "Required - May only contain letters"),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics Primary City Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Primary City Label"
                  >
                    Primary City*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"City"}
                    aria-label="Main Demographics Primary City Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Primary City Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Primary State Field Container">
          <form.Field
            aria-label="Main Demographics Primary State Field"
            name="primaryState"
            validators={{
              onChange: z
                .string({
                  required_error: "Primary State 2 is required",
                  invalid_type_error: "Primary State must be a string",
                })
                .trim()
                .regex(/^[A-Za-z]+$/, "Required - May only contain letters"),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics Primary State Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Primary State Label"
                  >
                    Primary State*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"State"}
                    aria-label="Main Demographics Primary State Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Primary State Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Main Demographics Primary Zipcode Form Container">
          <form.Field
            aria-label="Main Demographics Primary Zipcode Field"
            name="primaryZipcode"
            validators={{
              onChange: z
                .string({
                  required_error: "Primary Zipcode is required",
                  invalid_type_error: "Primary Zipcode must be a number",
                })
                .min(5, "Must have 5 Numbers")
                .trim()
                .regex(/^[0-9]+$/, "May only contain Numbers"),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Main Demographics Primary Zipcode Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Main Demographics Primary Zipcode Label"
                  >
                    Primary Zipcode*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"98002"}
                    maxLength={5}
                    aria-label="Main Demographics Primary Zipcode Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Main Demographics Primary Zipcode Field Info"
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
                aria-label="Main Demographics Submit Button"
              >
                {isSubmitting ? "..." : "Submit"}
              </Styled.Button>
            </Styled.ButtonContainer>
          )}
        />
      </form>
    </Styled.ExpandingContainer>
  );
};

export default MainDemographicsForm;
