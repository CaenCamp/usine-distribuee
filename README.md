# Usine Partagée

## Prérequis

[Docker](https://docs.docker.com/install/) et [Docker Compose](https://docs.docker.com/compose/)

## Installation du projet

`make install`

## Lancer le projet

`make start` / `make stop`

Une fois le projet lancé :

-   l'api est disponible en http://localhost:8001
-   l'admin est disponible en http://localhost:8002

Lors de la première installation, vous devrez lancer initialiser la base de donnée :

`make migrate-latest`

et créer un administrateur en base, en vous connectant au container de l'api :

`make connect-api`

puis dans le container :

`ADMIN_EMAIL=admin@exemple.org ADMIN_PASSWORD=n33dToB3=Str0ng node ./cli/create-admin.js`

Pour obtenir plus d'information sur les commandes disponibles : `make`
