
//

const express = require('express')
const fs = require('fs')
const https = require('https')


const opts = { key: fs.readFileSync('server_key.pem')
             , cert: fs.readFileSync('server_cert.pem')
             , requestCert: true

             , rejectUnauthorized: false

             , ca: [ fs.readFileSync('server_cert.pem') ]
             }



const app = express()


// app.get('/', (req, res) => {
// 	res.send('<a href="authenticate">Log in using client certificate</a>')
// })



app.get('/', (req, res) => {
	const cert = req.connection.getPeerCertificate()



	if (req.client.authorized) {
		res.status(200)
		//res.send(JSON.stringify({code:200,message:`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`}))
		res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`)

	} else if (cert.subject) {
		res.status(403)
		//res.send(JSON.stringify({code:403,message:`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`}) )
		res.send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
	} else {
		res.status(401)
		res.send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
		//res.send(JSON.stringify({code:401,message:`Sorry, but you need to provide a client certificate to continue.`}) )
	}
})

https.createServer(opts, app).listen(process.env.PORT)



