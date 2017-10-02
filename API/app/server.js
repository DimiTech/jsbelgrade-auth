const express  = require('express')
const Keycloak = require('keycloak-connect')

const app = express()

const auth = new Keycloak('./keycloak.json')

app.set('port', process.env.PORT || 8000)

app.disable('etag')
app.disable('x-powered-by')

app.use(auth.middleware())

app.get('/', auth.protect(), (req, res, next) => { // TODO: Change the lock to "secure()"
    res.status(200).json({
        "data" : "Private API data!"
    })
})

app.use((err, req, res, next) => {
    res.status(err.statusCode).end()
})

app.listen(app.get('port'), () => {
    console.log(`API Listening on port: ${app.get('port')}`)
})

class HTTPError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

