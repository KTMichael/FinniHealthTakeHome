import React from "react";
import type { FieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Styled } from "./formStyles";
import { updateAdditionalField } from "../databaseFunctions";
import { AdditionalField } from "../../types";

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
  formValues: AdditionalField;
}

const AdditionalInfoForm = ({ setOpen, formValues }) => {
  console.log(formValues);
  const form = useForm({
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
      };
      if (payload) {
        updateAdditionalField(payload, formValues.id, formValues.title).then(
          () => {
            setOpen(false);
          }
        );
      }
    },
    defaultValues: formValues,
  });

  return (
    <Styled.Container aria-label="Update Additional Info Form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Styled.FormFieldContainer aria-label="Update Additional Info Form Container">
          <form.Field
            aria-label="Update Additional Info Form Field"
            name={formValues.fieldName}
            validators={{
              onChange: z
                .string({
                  required_error: `${formValues.fieldName} is required`,
                  invalid_type_error: `${formValues.fieldName} must be a string`,
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
                    aria-label="Update Additional Info Label"
                  >
                    {formValues.fieldName}*:
                  </Styled.Label>
                  <Styled.Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={formValues.fieldName}
                    aria-label="Update Additional Info Input"
                  />
                </Styled.Section>
                <FieldInfo
                  field={field}
                  aria-label="Update Additional Info Field Info"
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
                aria-label="Update Additional Info Submit Button"
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

export default AdditionalInfoForm;
