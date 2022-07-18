const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const port = 5000
const apiURL = "https://www.google.com/recaptcha/api/siteverify"
const axios = require('axios')
const querystring = require('querystring');
var Recaptcha = require('express-recaptcha').RecaptchaV3
var recaptcha = new Recaptcha("6LfxzNwgAAAAAKTHGLz0G4kYKxgyesgjWbyCPcNY", "6LfxzNwgAAAAACbpKC9BJqnjRWrl-xwdRy2xX1Eq")
const secret = "6LfxzNwgAAAAACbpKC9BJqnjRWrl-xwdRy2xX1Eq"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/api/captcha', function (req, res) {
    console.log(req.body.token)
    axios.post(apiURL, querystring.stringify({secret: secret, response: req.body.token})).then(function(reply){
        console.log(reply.data)
        res.status(200).send(reply.data)
    })
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})