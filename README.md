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
docker cp ./API/node_modules/keycloak-connect <CONTAINER_ID>:/usr/src/node_modules/
```

*Important:* Open and save the `./API/app/server.js` file (without changing it) in order to trigger _supervisor_ to restart the app.

### 3. Import the realm on KeyCloak:

```
./jsbelgrade-realm.json
```

### 4. Copy the theme and enable it on KeyCloak:

```
docker cp ./themes/* <CONTAINER_ID>:/opt/jboss/keycloak/themes
