const Keycloak = require('keycloak-connect')

const keycloak = new Keycloak('./keycloak.json')

function middleware() {
    return keycloak.middleware()
}
function lock() {
    return keycloak.protect()
}

module.exports = {
    middleware,
    lock
}
