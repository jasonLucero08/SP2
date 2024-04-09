import { app } from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);
const usersRef = collection(db, "Users");

export const getCurrentUser = async (uid) => {
  const q = query(usersRef, where("uid", "==", uid));
  const user = await getDocs(q);
  return user.docs[0].data();
};
