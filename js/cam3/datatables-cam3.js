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
                $('#dataTable').DataTable({
                    data: dataSet,
                    columns: [
                        { title: 'Date', "width": "20%" },
                        { title: 'Camera', "width": "15%" },
                        {
                            title: 'Number of Detections', "width": "15%",
                            render: function (data) {
                                // console.log(data)
                                return '<h3 class="progress-num">' + data + '</h3>'
                            }
                        },

                        {
                            title: 'Detection Confidence', "width": "35%",
                            render: function (data) {
                                const c = data.toString().split(" ");
                                const d = c.length;
                                const e = [];
                                const h = [];
                                //  console.log(c)
                                for (let index = 2; index < d; index = index + 3) {
                                    e.push(parseInt(c[index] * 100));
                                    h.push(c[index])
                                }

                                const esort = e.sort((a, b) => b - a);

                                //Remove Mildew
                                for (let i = 0; i < c.length; i++) {
                                    if (c[i] === 'Mildew') {
                                        c.splice(i, 1);
                                        i--;
                                    }
                                }



                                for (let i = 0; i < c.length; i = i + 2) {
                                    c[i] = c[i] + " " + c[i + 1]
                                    c.splice(i + 1, 1)
                                    i--;
                                }

                                const cs = c.toString().split(" ");
                                const cs2 = cs.toString().split(",");
                                const temp = [];
                                for (let i = 0; i < cs2.length; i++) {
                                        if (cs2[i] < cs2[i + 2]) {
                                            temp[0] = c[i];
                                            c[i] = c[i + 1];
                                            c[i + 1] = temp[0];
                                            // console.log(test2[i]+">"+test2[i+2]);
                                        }
                                }

                                for (let i = 0; i < c.length; i++) {
                                if (c[i] === undefined) {
                                    c.splice(i, 1);
                                    i--;
                                }
                                }

                                const csort = c.toString().split(" ");
                                const csort2 = csort.toString().split(",")

                                //Remove confi value
                                for (let i = 0; i < csort2.length; i++) {
                                    for (let j = 0; j < e.length; j++) {
                                        if (csort2[i] === h[j]) {
                                            csort2.splice(i, 1);
                                            i--;
                                        }
                                    }
                                }
                                // console.log(e.sort((a, b) => b-a));
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
                                    if (csort2[i] == 'Downy') {
                                        //z.push('<div>'+c[i]+' Midew </div><div class="animated-progress progress-green"><span data-progress="'+ e[i] + '"></span></div>');
                                        z.push('<h4 class="progress-label"> ' + csort2[i] + ' Mildew&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4><div class="animated-progress progress-downy"><span data-progress="' + esort[i] + '"></span></div><br>');
                                        //z.push('<progress style="Color = red" value="'+e[i]+'" max="100"> '+e[i]+'% </progress><label>'+e[i]+'% '+c[i]+' Mildew</label><br>');
                                    } else if (csort2[i] == 'Powdery') {
                                        //  z.push('<div>'+c[i]+' Midew </div><div class="animated-progress progress-yellow"><span data-progress="'+ e[i] + '"></span></div>');
                                        z.push('<h4 class="progress-label"> ' + csort2[i] + ' Mildew&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4><div class="animated-progress progress-yellow"><span data-progress="' + esort[i] + '"></span></div><br>');
                                    } else {
                                        z.push('None')
                                    }
                                }
                                return z.join(" ");
                            }
                        },
                        {
                            title: 'Detected Image', "width": "15%",
                            render: function (data) {
                                return '<img src=" ' + data + ' " class="center" width="200" height="200" >'
                            }
                        }

                    ]
                });
            }
        });

});