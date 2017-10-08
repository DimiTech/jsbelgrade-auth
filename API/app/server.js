const express  = require('express')

const accessControl = require('./access-control')

const app = express()

app.set('port', process.env.PORT || 8000)

app.disable('etag')
app.disable('x-powered-by')

app.use(accessControl.middleware())

app.get('/', accessControl.lock(), (req, res, next) => {

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
