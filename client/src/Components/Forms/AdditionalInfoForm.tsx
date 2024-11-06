import * as React from "react";
import type { FieldApi, FieldValidateFn } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Styled } from "./formStyles";
import { updateAdditionalField } from "../../../firebase/databaseFunctions";
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
    defaultValues: formValues ?? "",
  });

  const fieldValidator: FieldValidateFn<any, any, any, any, any> = ({
    value,
  }) => (!value ? "Value is required" : undefined);

  const createFormField = () => {
    if (formValues.fieldValue.fieldType === "Number") {
      return (
        <>
          <Styled.FormFieldContainer aria-label="Update Additional Info Form Container">
            <form.Field
              aria-label="Update Additional Info Form Field"
              name={formValues.fieldName}
              validators={{
                onChange: fieldValidator,
              }}
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
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Value"
                      aria-label="Update Additional Info Input"
                      pattern="^\d*(\.\d{1,2})?$"
                      type={formValues.fieldValue.fieldType}
                    />
                  </Styled.Section>
                  <FieldInfo
                    field={field}
                    aria-label="Add Additional Info Field Info"
                  />
                </Styled.FormField>
              )}
            />
          </Styled.FormFieldContainer>
          <Styled.FormFieldContainer aria-label="Update Additional Info Field Label Field Label Form Container">
            <form.Field
              aria-label="Update Additional Info Field Label Form Field"
              name="fieldLabel"
              validators={{
                onChange: fieldValidator,
              }}
              validatorAdapter={zodValidator()}
              children={(field) => (
                <Styled.FormField>
                  <Styled.Section>
                    <Styled.Label
                      htmlFor={field.name}
                      aria-label="Update Additional Info Field Label Label"
                    >
                      Field Label*:
                    </Styled.Label>
                    <Styled.Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Label"
                      aria-label="Update Additional Info Field Label Input"
                      type="text"
                    />
                  </Styled.Section>
                  <FieldInfo
                    field={field}
                    aria-label="UUpdate Additional Info Field Label Field Info"
                  />
                </Styled.FormField>
              )}
            />
          </Styled.FormFieldContainer>
        </>
      );
    } else {
      return (
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
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={formValues.fieldName}
                    aria-label="Update Additional Info Input"
                    type={formValues.fieldValue.fieldType}
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
      );
    }
  };

  return (
    <Styled.Container aria-label="Update Additional Info Form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {createFormField()}
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
