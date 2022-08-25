




import { q, querySnapshot } from "./db-cam1.js";

import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";

const dataSet = [];

const storage = getStorage();
let millis;

let i = 0 ;
let w = 0 ;
querySnapshot.forEach(function (doc) {
    const timestamp = doc.data().Date;
    const date = timestamp.toDate().toDateString();
    const time = timestamp.toDate().toLocaleTimeString('th-TH');
    millis = timestamp.toMillis();
    const wlistRef = ref(storage, 'Melon-img/' + millis + '.jpg');

    i ++;
const data=[];
    getDownloadURL(wlistRef)
        .then((url) => {

            data.push(date + "  " + time);
            data.push(doc.data().Confidence_value);
            data.push(url);

            dataSet.push(data);
            w++;
            console.log("w = " + w);

            if(w == i ){
                console.log(dataSet);
                $('#dataTable').DataTable({
                    data: dataSet,
                    columns: [
                        { title: 'Date' },
                        { title: 'Confidence_value' },
                        { title: 'Images',
                            render: function (data) {
                                return '<img src=" ' + data + ' " class="center" width="200" height="200" >'
                            }
                        }
                    ]
                });

            }

        });


        console.log("I = " + i);
});










