import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDtrYi4nQV6gyODHjM3kKtlCjptRiEdIiQ",
    authDomain: "site-sabrina-loja.firebaseapp.com",
    projectId: "site-sabrina-loja",
    storageBucket: "site-sabrina-loja.firebasestorage.app",
    messagingSenderId: "630812352429",
    appId: "1:630812352429:web:2745a83fc4c44638520b24",
    measurementId: "G-DH3FVBLXBK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
