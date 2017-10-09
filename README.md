# JS Belgrade - API Security talk demo

## Requirements:

* unix environment / bash terminal emulator
* make
* docker
* docker-compose

## Setup:

Before using the demo edit your machine's virtual hosts:

```
sudo bash -c "cat << _EOF_ >> /etc/hosts

# JS Belgrade talk temporary aliases:
127.0.0.1   jsbelgrade.com
127.0.0.1   www.jsbelgrade.com
127.0.0.1   auth_server

_EOF_"
```

## Run it:

### 1. Run the containers: 

```
make up
```

### 2. Edit the 'keycloak-auth-utils' module and copy it along with 'keycloak-connect' to the docker container:

```
docker cp ./API/node_modules/keycloak-connect fb56d1ce56ba:/usr/src/node_modules/
```

*Important:* Save the `./API/app/server.js` in order to trigger the app restart.

### 3. Import the realm on KeyCloak:

```
./jsbelgrade-realm.json
```

### 4. Copy the theme and enable it on KeyCloak:

```
docker cp ./themes/* d8735375339a:/opt/jboss/keycloak/themes
```

### 5. Open the Client App front-end:

Go to: `jsbelgrade.com`

