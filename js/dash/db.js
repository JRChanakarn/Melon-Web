import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import { getFirestore, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";




const firebaseConfig = {
    apiKey: "AIzaSyAhfpKgLgE553HnqUjVgQeTNrGmYaZMShU",
    authDomain: "web-melon01.firebaseapp.com",
    projectId: "web-melon01",
    storageBucket: "web-melon01.appspot.com",
    messagingSenderId: "437275991929",
    appId: "1:437275991929:web:7af5b4e5b0f0745a8499a8",
    measurementId: "G-RPG07G5C8X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore();
export const q = query(collection(db, "Melon"));
export const querySnapshot = await getDocs(q);
export let d = 0;
export let p = 0;

export const storage = getStorage();


const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();


//database

querySnapshot.forEach((doc) => {


    
    const test = doc.data().Confidence_value;

    //Count Midew
    const wordDowny = test.match(/Downy/g);
    //console.log(wordDowny);
    let countDowny = wordDowny ? wordDowny.length : 0;
    d = d + countDowny;

    const wordPowdery = test.match(/Powdery/g);
    //console.log(wordPowdery);
    let countPowdery = wordPowdery ? wordPowdery.length : 0;
    p = p + countPowdery;



});



$("#C1").append('<div class="h5 mb-0 font-weight-bold text-gray-800">'+`${d}`+'</div>')
$("#C2").append('<div class="h5 mb-0 font-weight-bold text-gray-800">'+`${p}`+'</div>')
$("#C3").append('<div class="h5 mb-0 font-weight-bold text-gray-800">'+`${p+d}`+'</div>')
$("#D1").append('<div class="h5 mb-0 font-weight-bold text-gray-800">'+`${day}`+'/'+`${month}`+'/'+`${year}`+'</div>' )