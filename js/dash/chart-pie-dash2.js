// Set new default font family and font color to mimic Bootstrap's default styling

import{ p , d }from './db.js';

Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';



// Pie Chart Example
var ctx = document.getElementById("myPieChart2");

var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Downy mildew", "Powdary mildew"],
        datasets: [{
            data: [p, d],
            backgroundColor: ['#f6c23e', '#1cc88a'],
            hoverBackgroundColor: ['#bc942f', '#17a673'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
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

