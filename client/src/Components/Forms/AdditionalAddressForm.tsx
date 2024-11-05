import React from "react";
import type { FieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Styled } from "./formStyles";
import { TFormDataAddressOnly } from "../../types";
import { addAdditionalAddress, deleteAddress } from "../databaseFunctions";
import { DefaultAdditionalAddress } from ".././constants";

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
  formValues: any;
}

const AdditionalAddressForm = ({ setOpen, formValues }) => {
  const form = useForm<TFormDataAddressOnly>({
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
      };
      if (payload) {
        deleteAddress(formValues?.addresses[0], formValues.id);
        addAdditionalAddress(payload, formValues.id).then(() => {
          setOpen(false);
        });
      }
    },
    defaultValues: formValues?.addresses[0] ?? DefaultAdditionalAddress,
  });
  return (
    <Styled.Container aria-label="Add Additional Address Form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Styled.FormFieldContainer aria-label="Additional Address Title Form Container">
          <form.Field
            aria-label="Additional Address Title Field"
            name="title"
            validators={{
              onChange: z
                .string({
                  required_error: "title is required",
                  invalid_type_error: "Title must be a string",
                })
                .trim(),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Additional Address Title Form Field">
                <Styled.Section>
                  <Styled.Label
                    aria-label="Additional Address Title Label"
                    htmlFor={field.name}
                  >
                    Title*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"Grandparent"}
                    aria-label="Additional Address Title Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Additional Address Title Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Additional Address Form Container">
          <form.Field
            aria-label="Additional Address Field"
            name="address"
            validators={{
              onChange: z
                .string({
                  required_error: "Address is required",
                  invalid_type_error: "Address must be a string",
                })
                .trim(),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Additional Address Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Additional Address Label"
                  >
                    Address*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"1234 9th St"}
                    aria-label="Additional Address Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Additional Address Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Additional Address2 Form Container">
          <form.Field
            aria-label="Additional Address2 Field"
            name="address2"
            validators={{
              onChange: z
                .string({
                  required_error: "Address 2 is required",
                  invalid_type_error: "Address must be a string",
                })
                .trim(),
              onChangeAsync: z.string().refine(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes("error");
              }),
            }}
            validatorAdapter={zodValidator()}
            children={(field) => (
              <Styled.FormField aria-label="Additional Address2 Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Additional Address2 Label"
                  >
                    Address 2:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"Suite 45"}
                    aria-label="Additional Address2 Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Additional Address2 Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Additional City Form Container">
          <form.Field
            aria-label="Additional City Field"
            name="city"
            validators={{
              onChange: z
                .string({
                  required_error: "City is required",
                  invalid_type_error: "City must be a string",
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
              <Styled.FormField aria-label="Additional City Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Additional City Label"
                  >
                    City*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"City"}
                    aria-label="Additional City Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Additional City Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Additional State Form Container">
          <form.Field
            aria-label="Additional State Field"
            name="state"
            validators={{
              onChange: z
                .string({
                  required_error: "State 2 is required",
                  invalid_type_error: "State must be a string",
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
              <Styled.FormField aria-label="Additional State Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Additional State Label"
                  >
                    State*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="string"
                    placeholder={"State"}
                    aria-label="Additional State Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Additional State Field Info"
                />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer aria-label="Additional Zipcode Form Container">
          <form.Field
            aria-label="Additional Zipcode Field"
            name="zipcode"
            validators={{
              onChange: z
                .string({
                  required_error: "Zipcode is required",
                  invalid_type_error: "Zipcode must be a number",
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
              <Styled.FormField aria-label="Additional Zipcode Form Field">
                <Styled.Section>
                  <Styled.Label
                    htmlFor={field.name}
                    aria-label="Additional Zipcode Label"
                  >
                    Zipcode*:
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
                    aria-label="Additional Zipcode Input"
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
              <Styled.Button
                type="submit"
                disabled={!canSubmit}
                aria-label="Additional Address Submit Button"
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

export default AdditionalAddressForm;
