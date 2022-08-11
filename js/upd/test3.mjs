


import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, Timestamp, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { readFileSync, rename, readdirSync } from "fs";

const firebaseConfig = {
    apiKey: "AIzaSyAhfpKgLgE553HnqUjVgQeTNrGmYaZMShU",
    authDomain: "web-melon01.firebaseapp.com",
    projectId: "web-melon01",
    storageBucket: "web-melon01.appspot.com",
    messagingSenderId: "437275991929",
    appId: "1:437275991929:web:7af5b4e5b0f0745a8499a8",
    measurementId: "G-RPG07G5C8X"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore();
const q = query(collection(db, "Melon"));
const storage = getStorage();


    const wlistRef = ref(storage, 'gs://web-melon01.appspot.com/123.jpg');
    getDownloadURL(wlistRef)
        .then((url) => {
            console.log(url);
        });











