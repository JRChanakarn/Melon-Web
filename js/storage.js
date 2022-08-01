

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import { getFirestore, getDocs, collection, query } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
const q = query(collection(db, "Melon"));

//database
const querySnapshot = await getDocs(q);
$("#listgroup").html('');
querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    const timestamp = doc.data().Date;
    const millis = timestamp.toMillis();

    const storage = getStorage();
    const wlistRef = ref(storage, 'Melon-img/' + millis + '.jpg');
    //console.log(millis);

    getDownloadURL(wlistRef)
        .then((url) => {

            //Gallery
            $("#im1").append( `<img src="${url}" width="200" height="200">`)


        });

    //console.log(getDownloadURL(wlistRef));

});
