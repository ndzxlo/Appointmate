import firebaseApp from "../fireBaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function getData(collectName) {
  const querySnapshot = await getDocs(collection(db, collectName));
  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
}
