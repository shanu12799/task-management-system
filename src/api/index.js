import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const saveUser = async (id, data) => {
  const { name, email, password } = data;
  try {
    const res = await setDoc(doc(db, "users", id), {
      name: name,
      email: email,
      password: password,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    const user = await getDoc(doc(db, "users", id));
    console.log("res", user);
  } catch (error) {
    console.log(error);
  }
};

export const saveData = async (id, data) => {
  try {
    const ref = await setDoc(doc(db, "taskList", id), {
      data,
    });
    console.log("res", ref);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (id) => {
  if (id === null) return;
  try {
    const docRef = doc(db, "taskList", localStorage.getItem("userID"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("ppp", docSnap);
    }
  } catch (error) {
    console.log(error);
  }
};
