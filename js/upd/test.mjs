import { initializeApp } from "firebase/app";

import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
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


const storage = getStorage(app)

const file = readFileSync('./123.jpg').toString('base64');

// Upload file and metadata to the object 'images/mountains.jpg'

const storageRef = ref(storage, 'Melon-img/123.jpg');
const uploadTask = uploadString(storageRef,file);

