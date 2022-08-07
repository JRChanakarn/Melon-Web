
import {Storage} from'@google-cloud/storage';
import express from "express";
import {app} from "./index.mjs";
// const app2 = new express();


const storage = new Storage("AIzaSyAhfpKgLgE553HnqUjVgQeTNrGmYaZMShU");

let bucketName = "web-melon01.appspot.com";

let filename = '123.jpg';

// Testing out upload of file
const uploadFile = async() => {

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
});

console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile();
