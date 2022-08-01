import { querySnapshot } from "./db.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";

import dateFormat  from "../dateformat.js";

const dataSet = [];
const storage = getStorage();

let millis;
let i = 0;
let w = 0;

querySnapshot.forEach(function (doc) {

    const timestamp = doc.data().Date;
    const date2 = timestamp.toDate();
    const date = dateFormat(date2, " mmm dd, yyyy (ddd)");
    const time = dateFormat(date2, " hh:MM:ss TT");
   //const time = timestamp.toDate().toLocaleTimeString('th-TH');
    millis = timestamp.toMillis();
    const wlistRef = ref(storage, 'Melon-img/' + millis + '.jpg');
    const data = [];
    i++;
    getDownloadURL(wlistRef)
        .then((url) => {
            data.push("<span style = \"  width: 150px ; display: inline-block \">"+ date +"</span>"+time);
            //data.push("<td>"+ date +"</td>"+ time);
            data.push(doc.data().Confidence_value);
            data.push(url);
            dataSet.push(data);
            w++;

            if (w == i) {
                $('#dataTable').DataTable({
                    data: dataSet,
                    columns: [
                        { title: 'Date',},
                        { title: 'Detection Confidence' },
                        {
                            title: 'Detected Image',
                            render: function (data) {
                                return '<img src=" ' + data + ' " class="center" width="200" height="200" >'
                            }
                        }
                    ]
                });
            }
        });

});










