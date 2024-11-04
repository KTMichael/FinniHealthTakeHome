import React from "react";
import type { FieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Styled } from "./formStyles";
import { TFormDataAddressOnly } from "../../types";
import { addAdditionalAddress, deleteAddress } from "../databaseFunctions";
import { DefaultAdditionalAddress } from ".././constants";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>Title*:</Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"Grandparent"}
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>Address*:</Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"1234 9th St"}
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>Address 2:</Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"Suite 45"}
                  />
                </Styled.Section>
                <FieldInfo field={field} />
              </Styled.FormField>
            )}
          />
        </Styled.FormFieldContainer>
        <Styled.FormFieldContainer>
          <form.Field
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>City*:</Styled.Label>
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>State*:</Styled.Label>
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
              <Styled.FormField>
                <Styled.Section>
                  <Styled.Label htmlFor={field.name}>Zipcode*:</Styled.Label>
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

export default AdditionalAddressForm;
