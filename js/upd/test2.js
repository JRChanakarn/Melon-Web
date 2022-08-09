

var admin = require("firebase-admin");
const uuid = require('uuid-v4');

// CHANGE: The path to your service account
var serviceAccount = require("./web-melon01-firebase-adminsdk-67r3m-fcae7459c8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "web-melon01.appspot.com"
});



var bucket = admin.storage("Melon-img/123.jpg").bucket();

var filename = "./123.jpg"

async function uploadFile() {



  // Uploads a local file to the bucket
  await bucket.upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
  });

console.log(`${filename} uploaded.`);

}

uploadFile().catch(console.error);