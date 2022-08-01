//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
//import { getFirestore, getDocs, collection, query } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, Timestamp, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { readFileSync, rename, readdirSync } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;

}

function getCurrentFilenames() {
    console.log("Current filenames:");
    readdirSync(__dirname).forEach(file => {
        console.log(file);
    });
}

const Confi = syncReadFile('../text/Confidence_value.txt');
const mili = +new Date();

const docData = {
    Camera: 1,
    Confidence_value: Confi.toString(),
    Date: Timestamp.fromDate(new Date()),
};




//getCurrentFilenames();

// Rename the file
// rename('123.jpg', mili + '.jpg', (error) => {
//     if (error) {

//         console.log(error);

//     }
//     else {

//         console.log("\nFile Renamed\n");


//     }
// });

//await setDoc(doc(db, "Melon", "cam1-" + mili.toString()), docData);

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, `Melon-img/123.jpg`);
const uploadTask = uploadBytesResumable(storageRef,`./123.jpg`);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
    (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log('Upload is ' + progress + '% done');
        // console.log(snapshot.bytesTransferred);
        // console.log(snapshot.totalBytes);
        // console.log(snapshot);
        // console.log(snapshot.state);
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
    },
    (error) => {

        switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
        }
    },
    () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
        });
    }
); 