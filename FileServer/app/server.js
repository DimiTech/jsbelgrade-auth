const fs   = require('fs')
const path = require('path')

const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3000)

app.disable('etag')
app.disable('x-powered-by')

app.use(express.static(path.join(__dirname, 'static')))

app.use((err, req, res, next) => {
    res.status(err.statusCode).end()
})

app.listen(app.get('port'), () => {
    console.log(`Serving static files at port: ${app.get('port')}`)
})
