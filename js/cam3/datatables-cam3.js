import { querySnapshot } from "./db-cam3.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";

import dateFormat from "../dateformat.js";

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
            data.push("<span style = \"  width: 150px ; display: inline-block \">" + date + "</span>" + time);
            //data.push("<td>"+ date +"</td>"+ time);
            data.push(doc.data().Confidence_value);
            data.push(doc.data().Camera);
            data.push(url);
            dataSet.push(data);
            w++;
            if (w == i) {
                $('#dataTable').DataTable({
                    data: dataSet,
                    columns: [
                        { title: 'Date', },
                        {
                            title: 'Detection Confidence',
                            render: function (data, type, row, meta) {


                                const c = data.toString().split(" ");
                                const d = c.length;
                                const e = [];
                                const h = [];
                                for (let index = 2; index < d; index = index + 3) {
                                    e.push(parseInt(c[index] * 100));
                                    h.push(c[index])
                                }
                                // console.log("Raw");
                                // console.log(c);
                                // console.log(" ");
                                //Remove confi value
                                for (let i = 0; i < c.length; i++) {
                                    for (let j = 0; j < e.length; j++) {
                                        if (c[i] === h[j]) {
                                            //console.log(c[i]+ " == "+(h[j]))
                                            c.splice(i, 1);
                                            i--;
                                        }
                                    }
                                }
                                // console.log("Remove confi value");
                                // console.log(c);
                                // console.log(" ");
                                //Remove Mildew
                                for (let i = 0; i < c.length; i++) {

                                    if (c[i] === 'Mildew') {
                                        //console.log(c[i]+ " == "+(h[j]))
                                        c.splice(i, 1);
                                        i--;
                                    }

                                }
                                // console.log("Remove Mildew");
                                // console.log(c);
                                // console.log(" ");

                                // for (let i = 0; i < c.length; i++) {
                                //     console.log(c[i] + " Mildew " + e[i] + "%");
                                // }

                                $(".animated-progress span").each(function () {
                                    $(this).animate(
                                        {
                                            width: $(this).attr("data-progress") + "%",
                                        },
                                        1000
                                    );
                                    $(this).text($(this).attr("data-progress") + "%");
                                });

                                const z = [];

                                for (let i = 0; i < c.length; i++) {

                                    if(c[i] == 'Downy'){
                                        z.push('<div>'+c[i]+' Midew </div><div class="animated-progress progress-green"><span data-progress="'+ e[i] + '"></span></div>');
                                    }else if(c[i] == 'Powdery'){
                                        z.push('<div>'+c[i]+' Midew </div><div class="animated-progress progress-yellow"><span data-progress="'+ e[i] + '"></span></div>');
                                    }else{
                                        z.push('None')
                                    }
                                    
                                


                                }
                                return z.join(" ");
                            }
                        },
                        { title: 'Camera' },
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

