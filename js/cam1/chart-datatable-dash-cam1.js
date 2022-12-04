import { p, d } from './db-cam1.js';
import { querySnapshot } from "./db-cam1.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";
import dateFormat from "../dateformat.js";

Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


var xValues = ["Powdary mildew", "Downy mildew"];
var barColors = [
    '#ffa54f', '#8d5524'
];

new Chart("myPieChart", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: [p, d]
        }]
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
        },
        legend: {
            display: false
        },
        cutoutPercentage: 80,
    },
});


new Chart("myBarChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: [p, d],

        }]
    },
    options: {
        scales: {
            yAxes: [{
                gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                },
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                barPercentage: 0.3
            }]
        },
        maintainAspectRatio: false,

        tooltips: {
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: true,
            caretPadding: 10,
        },

        legend: {
            display: false
        }

    },
});








const dataSet = [];
const storage = getStorage();

let i = 0;
let w = 0;


querySnapshot.forEach(function (doc) {
    w++;

});
querySnapshot.forEach(function (doc) {

    const id = [];
    id.push(doc.id.toString().split("-"));
    id[0].splice(0, 1);
    const timestamp = doc.data().Date;
    const date2 = timestamp.toDate();
    const date = dateFormat(date2, " mmm dd, yyyy (ddd)");
    const time = dateFormat(date2, " hh:MM:ss TT");
    // const wlistRef = ref(storage,  'Melon-img/'+id.toString() + '.jpg');
    const data = [];
    i++;

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
    data.push("<div style=display:none;>" + timestamp + "</div><span style = \"  width: 150px ; display: inline-block \">" + date + "</span>" + time);
    data.push(doc.data().Camera);
    data.push(c.length);
    data.push(doc.data().Confidence_value);
    data.push(doc.data().URL);
    dataSet.push(data);

    if (w == i) {
        $('#dataTable').DataTable({
            data: dataSet,
            "columnDefs": [{ "type": "numeric-comma", targets: 0 }],
            order: [[0, "desc"]],
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

                        // console.log("E = " + esort);

                        // console.log("C = " + csort2);
                        const z = [];
                        for (let i = 0; i < c.length; i++) {
                            if (csort2[i] == 'Downy') {
                                z.push('<div class="meter"><span style="width:' + esort[i] + '%;"><span class="progress-dow"></span></span><span style="display=inline">test</span></div><span class="progress-label">' + esort[i] + "% " + csort2[i] + " Mildew" + '</span><br><br>');
                            } else if (csort2[i] == 'Powdery') {
                                z.push('<div class="meter"><span style="width:' + esort[i] + '%;"><span class="progress-pow"></span></span><span style="display=inline">test</span></div><span class="progress-label">' + esort[i] + "% " + csort2[i] + " Mildew" + '</span><br><br>');
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

            ],
        });
    }

});



