import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
} from "firebase/firestore";

export const db = getFirestore();
export const patientDataCollection = collection(db, "PatientData");

export const getAllPatientData = async () => {
  try {
    const response = await getDocs(patientDataCollection).then((data) => {
      return data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
export const getUniversalAdditionalInfoFields = async () => {
  try {
    const response = await getDocs(collection(db, "AdditionalFields")).then(
      (data) => {
        return data.docs.map((doc) => ({
          ...doc.data(),
        }));
      }
    );
    return response[0];
  } catch (err) {
    console.error(err);
  }
};

export const addFieldToCollection = async (payload) => {
  try {
    const PatientsSnapshot = await getDocs(patientDataCollection)
      .then((data) => {
        data.forEach((patient) => {
          setDoc(
            doc(db, "PatientData", patient.id),
            {
              universalAdditionalInfoFields: {
                [payload.fieldName]: {
                  fieldType: payload.fieldType,
                  fieldValue: "",
                  fieldLabel: "",
                },
              },
            },
            { merge: true }
          );
        });
      })
      .then(() => {
        setDoc(
          doc(db, "AdditionalFields", "AdditionalFields"),
          {
            [payload.fieldName]: {
              fieldType: payload.fieldType,
              fieldValue: "",
              fieldLabel: "",
            },
          },
          { merge: true }
        );
      });
    return PatientsSnapshot;
  } catch (err) {
    console.error(err);
  }
};

export const deleteAdditionalField = async (payload, id, dbTitle) => {
  try {
    const addData = doc(db, "PatientData", id);
    await updateDoc(addData, {
      [`${dbTitle}.${payload}`]: deleteField(),
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteFieldFromCollection = async (payload, dbTitle) => {
  try {
    const PatientsSnapshot = await getDocs(patientDataCollection)
      .then((data) => {
        data.forEach((patient) => {
          updateDoc(doc(db, "PatientData", patient.id), {
            [`${dbTitle}.${payload}`]: deleteField(),
          });
        });
      })
      .then(() => {
        setDoc(
          doc(db, "AdditionalFields", "AdditionalFields"),
          {
            [`${payload}`]: deleteField(),
          },
          { merge: true }
        );
      });
    return PatientsSnapshot;
  } catch (err) {
    console.error(err);
  }
};

export const addAdditionalFieldToPatient = async (payload, id) => {
  try {
    const addData = doc(db, "PatientData", id);
    await setDoc(
      addData,
      {
        patientSpecificAdditionalInfoFields: {
          [payload.fieldName]: {
            fieldType: payload.fieldType,
            fieldValue: "",
            fieldLabel: "",
          },
        },
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
};
export const updateAdditionalField = async (payload, id, dbTitle) => {
  try {
    const addData = doc(db, "PatientData", id);
    await setDoc(
      addData,
      {
        [dbTitle]: {
          [payload.fieldName]: {
            fieldValue: payload[payload.fieldName],
            fieldLabel: payload.fieldLabel ?? "",
          },
        },
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
};

export const getPatientDataById = async (id) => {
  const docRef = doc(db, "PatientData", id);
  try {
    const response = await getDoc(docRef)
      .then((data) => {
        return data.data();
      })
      .then((info) => info);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const createNewPatient = async (payload) => {
  try {
    await addDoc(patientDataCollection, payload);
  } catch (err) {
    console.error(err);
  }
};

export const deleteAddress = async (payload, id) => {
  try {
    const deleteVal = doc(db, "PatientData", id);
    await setDoc(
      deleteVal,
      {
        additionalAddress: arrayRemove(payload),
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
};

export const updatePatientData = async (payload, id) => {
  try {
    const updateData = doc(db, "PatientData", id);
    await updateDoc(updateData, payload);
  } catch (err) {
    console.error(err);
  }
};

export const addAdditionalAddress = async (payload, id) => {
  try {
    const updateData = doc(db, "PatientData", id);
    await setDoc(
      updateData,
      {
        additionalAddress: arrayUnion(payload),
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
};
