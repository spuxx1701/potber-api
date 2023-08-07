# potber API

## Description

potber API is a RESTful API for the german board [forum.mods.de](https://forum.mods.de) built with [Nest](https://github.com/nestjs/nest). The API is a modern JSON API that comes with full OpenAPI documentation and follows REST meticulously.

## How to use the API

You can find the OpenAPI documentation here:

- [Test environment](https://test-api.potber.de/swagger)
- [Production environment](https://api.potber.de/swagger)

Even though the API was built primarily for serving the [potber client](https://github.com/spuxx1701/potber-client), it was designed with the ability of serving other usescases in mind. If you need your application's hostname added to the API's allowed origins, feel free to contact me.

### ⚠ About accessing the API ⚠

In contrast to the original forum and its API, almost all potber-api routes require you to be signed in. Since potber-api follows modern standards and patterns, it also makes it much easier to extract a lot of data. Thus, restricting access to forum members was done to decrease the risk of abuse. If a route does not require authentication, it's stated explicitely in the API documentation.

## Development

### Installation

```bash
$ git clone https://github.com/spuxx1701/potber-api.git
$ cd potber-api
$ npm install
```

### Setting up the environment

The application expects a couple of environment variables to be set. In a local environment you may provide them by adding an `.env` file into the root folder and copy the following values. Note that `AUTH_JWT_SECRET` can be any kind of string. It will be used for encrypt the session JWT.

```env
# App
APP_PORT=3000
APP_CLIENT_URL=http://localhost:4200
APP_API_URL=http://localhost:3000

# Swagger
SWAGGER_TEST_THREAD_ID=219289

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:4200

# Authentication
AUTH_JWT_SECRET=***
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

This software is [GNU licensed](LICENSE).
