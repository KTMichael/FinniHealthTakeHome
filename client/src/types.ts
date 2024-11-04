export type Address = {
  title?: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
};

export type AdditionalAddresses = {
  addresses: [Address];
  id: string;
};

export type AdditionalAddress = {
  address: Address;
  id: string;
};

export type Patient = {
  dob: string;
  firstName: string;
  intakeStatus: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  middleName: string;
  primaryAddress: string;
  primaryAddress2: string;
  primaryCity: string;
  primaryState: string;
  primaryZipcode: string;
  id: string;
  additionalAddress?: Address[];
};

export type TFormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  dob: string;
  email: string;
  primaryAddress: string;
  primaryAddress2: string;
  primaryCity: string;
  primaryState: string;
  primaryZipcode: string;
};

export type TFormDataAddressOnly = {
  title: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
};

export type UserData = {
  email: string | null;
};

type DynamicKeyValuePair = {
  [x: string]: string;
};

export type AdditionalInfo = {
  additionalInfo?: DynamicKeyValuePair;
  additionalPatientSpecificInfo?: DynamicKeyValuePair;
};

export type AdditionalField = {
  id: string;
  fieldName: string;
  fieldValue: string;
  title: string;
};
