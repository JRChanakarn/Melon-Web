import { querySnapshot } from "./db.js";
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
    var rowids = [];
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
                                return '<progress value="' + 5000 + '" max="9999"></progress>' + '<br>'+'<progress value="' + 9000 + '" max="9999"></progress>'
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
                // Bar Chart Example
                var ctx = document.getElementById("myBarChart95");
                var myBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["Downy Midew", "Powdary Midew"],
                        datasets: [{
                            maxBarThickness: 100,
                            label: "Detect",
                            backgroundColor: ['#1cc88a', '#f6c23e'],
                            hoverBackgroundColor: ['#17a673', '#bc942f'],
                            borderColor: "#4e73df",
                            data: [d, p],
                        }],
                    },
                    options: {
                        maintainAspectRatio: false,
                        layout: {
                            padding: {
                                left: 10,
                                right: 25,
                                top: 25,
                                bottom: 0
                            }
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                },
                                ticks: {
                                    maxTicksLimit: 2
                                },
                                maxBarThickness: 100,
                            }],
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: max,
                                    maxTicksLimit: 10,
                                    padding: 10,
                                },
                                gridLines: {
                                    color: "rgb(234, 236, 244)",
                                    zeroLineColor: "rgb(234, 236, 244)",
                                    drawBorder: false,
                                    borderDash: [2],
                                    zeroLineBorderDash: [2]
                                }
                            }],
                        },
                        legend: {
                            display: false
                        },
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
                            displayColors: false,
                            caretPadding: 10,


                        },

                    }
                });


            }
        });

});


import { p, d } from './db.js';

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}


var max = p + d;
var j = 0;

do {
    if (max % 100 != 0) {

        max++;
    } else {
        break;
    }


} while (true);











