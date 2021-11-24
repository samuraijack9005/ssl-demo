'use strict';
const request = require('request');
const fs = require('fs');
let http=require('http');
let url='http://storageapi.yappes.local:98/serve/files/alice?format=p12&meta=securitkey&id=d9e9ee54e3e0132ce81333f1872d92dc&apiId=8ae006ce45c3ebcc675c0b91b2879573'
let buffer;
// http.get(url, (res) => {
// let data = [];
//   res.on('data', (chunk) => {
//     data.push(chunk);
//   }).on('end', () => {
//      buffer = Buffer.concat(data);
//     // Do something with the buffer
//   });
// }).on('error', (err) => {
//   console.log('download error:', err);
// });

var request1 = require('request').defaults({ encoding: null });
request1.get(url, function (err, res, body) {
    console.log(body)
     buffer=body;
});

setTimeout(()=>{
var options = {
    url: 'https://localhost:9999/authenticate',
    headers: {
        "content-type": "application/json",
    },
    agentOptions: {
        pfx: buffer,
        passphrase: ''
    }
};

request.get(options, (error, response, body) => {
    console.log(error);
     console.log(response.status);
    console.log(JSON.parse(body));
});


},10)