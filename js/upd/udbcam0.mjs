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


const scriptName = __filename.split(/[\\/]/).pop(); // Remove the last array element
//console.log(scriptName);
let i = 1;
const Confi = syncReadFile('../text/Confidence_value.txt');
const mili = +new Date();

const docData = {
    Camera: 1,
    Confidence_value: Confi.toString(),
    Date: Timestamp.fromDate(new Date()),
};


function getCurrentFilenames() {
    readdirSync(__dirname).forEach(file => {


        if(i == 3){
            
            // rename(file, mili + '.jpg', (error) => {
            //     if (error) {
            
            //         console.log(error);
            
            //     }
            //     else {
            
            //         console.log("\nFile Renamed\n");
            
            
            //     }
            // });
        console.log(file);
        
        }
        i++;
        
    });


}




import admin from 'firebase-admin';

var serviceAccount = "./web-melon01-firebase-adminsdk-67r3m-fcae7459c8.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "web-melon01.appspot.com"
});



var bucket = admin.storage().bucket();

var filename = "./"+mili+".jpg";
const destinationFilename = "Melon-img/ç"+mili+".jpg";




async function uploadFile() {

    
    await bucket.upload(filename, {
        
        gzip: true,
        destination: destinationFilename 
    });

    console.log(`${filename} uploaded.`);

}

getCurrentFilenames();
//upload to Storage
//uploadFile();

//uplode to firestroage
//await setDoc(doc(db, "Melon", "cam0-" + mili.toString()), docData);
console.log(docData);