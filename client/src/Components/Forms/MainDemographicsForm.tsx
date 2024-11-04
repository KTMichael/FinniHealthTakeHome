import React from "react";
import type { FieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { MainDemoStyled as Styled } from "./formStyles";
import { createNewPatient, updatePatientData } from "../databaseFunctions";
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
}

const MainDemographicsForm = ({ setOpen, formValues, setGetUpdatedData }) => {
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
    <Styled.Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>First Name*:</Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    placeholder={"Jane"}
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>
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
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
                  <Styled.Label htmlFor={field.name}>Last Name*:</Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"Doe"}
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>
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
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>
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
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
            name="email"
            validators={{
              onChange: z
                .string({
                  required_error: "Email is required",
                  invalid_type_error: "Email must be a string",
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>Email*:</Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"example@email.com"}
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
                  <Styled.Label htmlFor={field.name}>
                    Primary Address*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"1234 1st Ave"}
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>
                    Primary Address 2:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"Apt 34"}
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>
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
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>
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
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>
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
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Styled.ButtonContainer>
              <Styled.Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Submit"}
              </Styled.Button>
            </Styled.ButtonContainer>
          )}
        />
      </form>
    </Styled.Container>
  );
};

export default MainDemographicsForm;
