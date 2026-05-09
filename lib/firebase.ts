import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARp88GW1ng6jV4jbyA51PiRnyPXjrGAmM",
  authDomain: "jumlaecommerce.firebaseapp.com",
  projectId: "jumlaecommerce",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
