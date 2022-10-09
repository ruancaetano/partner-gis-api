# Parter GIS api

This project was inspired by a challenge proposed by [ZéDelivery](https://ze.delivery/), which consists of:

- Create endpoint to register partners, including service coverage area and address using [GIS - Geographic information system](https://en.wikipedia.org/wiki/Geographic_information_system) and [GeoJSON](https://geojson.org/)
- Create endpoint to search partner by identifier
- Create endpoint to search for the closest partner based on a location informed through latitude and longitude

More details about the challenge can be found [here](https://github.com/ZXVentures/ze-code-challenges/blob/master/backend.md).

`Examples of requests can be found in the 'client' folder`

## Technologies, methodologies and the like.

- Clean Architecture
- DDD
- TDD (Coverage with unit and integration tests)
- Typescript
- Express
- Typeorm + Mysql

## How to play with it?

### Run application with docker

```
git clone git@github.com:ruancaetano/partner-gis-api.git

docker compose up -d

docker exec partner-gis-server  /bin/sh -c "yarn setup:dev"
```

### Run unit tests locally

```
git clone git@github.com:ruancaetano/partner-gis-api.git

yarn install

yarn test:unit
```

### Run integration tests locally

```
git clone git@github.com:ruancaetano/partner-gis-api.git

docker compose up database -d

docker exec partner-gis-database mysql -u root -pdevelopment -e "drop database if exists `partner-gis-test`; create database `partner-gis-test`;"

yarn install

yarn setup:test

yarn test:integration
```
