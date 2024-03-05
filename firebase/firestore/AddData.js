import firebaseApp from "../fireBaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function addData(collectName, data) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, collectName), data);
  } catch (e) {
    //console.error("Error adding document: ", e);
    error = e;
  }

  return { result, error };
}
