import { querySnapshot } from "./db.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";

import dateFormat from "../dateformat.js";

const dataSet = [];
const storage = getStorage();

let millis;
let i = 0;
let w = 0;
let a = 0;
let b = 0;

querySnapshot.forEach(function (doc) {

   // console.log(doc.id, " => ", doc.data());
    const id=[];
    id.push(doc.id.toString().split("-"));
    id[0].splice(0, 1);
    
    console.log(id.toString());




    const timestamp = doc.data().Date;
    const date2 = timestamp.toDate();
    const date = dateFormat(date2, " mmm dd, yyyy (ddd)");
    const time = dateFormat(date2, " hh:MM:ss TT");
    //const time = timestamp.toDate().toLocaleTimeString('th-TH');
    const wlistRef = ref(storage, 'Melon-img/' + id.toString() + '.jpg');
    const data = [];
    i++;
    getDownloadURL(wlistRef)
        .then((url) => {
            const c = doc.data().Confidence_value.toString().split(" ");
            const d = c.length;
            const e = [];
            const h = [];

            for (let index = 2; index < d; index = index + 3) {
                e.push(parseInt(c[index] * 100));
                h.push(c[index])
            }
            //Remove confi value
            for (let i = 0; i < c.length; i++) {
                for (let j = 0; j < e.length; j++) {
                    if (c[i] === h[j]) {
                        c.splice(i, 1);
                        i--;
                    }
                }
            }
            //Remove Mildew
            for (let i = 0; i < c.length; i++) {
                if (c[i] === 'Mildew') {
                    c.splice(i, 1);
                    i--;
                }
            }
            data.push("<span style = \"  width: 150px ; display: inline-block \">" + date + "</span>" + time);
            data.push(doc.data().Camera);
            data.push(c.length);
            data.push(doc.data().Confidence_value);
            data.push(url);
            dataSet.push(data);
            w++;
            if (w == i) {
                console.log(dataSet)
            }
        });

});



