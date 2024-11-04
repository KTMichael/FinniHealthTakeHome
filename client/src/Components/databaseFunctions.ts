import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
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
export const addFieldToCollection = async (payload) => {
  let title = payload.fieldName;
  try {
    const PatientsSnapshot = await getDocs(patientDataCollection).then(
      (data) => {
        data.forEach((patient) => {
          setDoc(
            doc(db, "PatientData", patient.id),
            {
              additionalInfo: { [title]: "" },
            },
            { merge: true }
          );
        });
      }
    );
    return PatientsSnapshot;
  } catch (err) {
    console.error(err);
  }
};

export const addAdditionalFieldToPatient = async (payload, id) => {
  let title = payload.fieldName;
  try {
    const addData = doc(db, "PatientData", id);
    await setDoc(
      addData,
      {
        additionalPatientSpecificInfo: { [title]: "" },
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
};
export const updateAdditionalField = async (payload, id, dbTitle) => {
  let title = payload.fieldName;
  try {
    const addData = doc(db, "PatientData", id);
    await setDoc(
      addData,
      {
        [dbTitle]: { [title]: payload[title] },
      },
      { merge: true }
    );
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
