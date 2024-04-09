import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "./firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

export const registerWithEmailAndPassword = async (
  fullName,
  username,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "Users"), {
      uid: user.uid,
      authProvider: "local",
      fullName: fullName,
      username: username,
      email: email,
      charactersUnlocked: [],
      levelsUnlocked: [],
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

export const logOut = () => {
  return auth.signOut();
};
