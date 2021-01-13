# Birras

## Framework

The project uses this technologies:

- Angular 11
- Nodejs 12
- MongoDB 4
- Express 4
- Passport (for local authentication)
- @auth0/angular-jwt (for manage JWT)
- Bootstrap Material 10
- Angular Material 11

## Install dependencies

- Run `npm install` to install project dependencies.

## Build

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Database - MongoDB 4

- Create a MongoDB database with name "meetups".

## Run app (needed for PWA)

- Run `npm run start:server` to run server.
- Navigate to `http://localhost:8080`. The app will automatically reload if you change any of the source files.

## Development server (optional for development)

- Run `npm run start:client` for a dev server.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Users
- To create new users for attend meetups, just sign up with login and then switch to register.

## Admins
- To create admin users just change user role ("role" field) from "USER" to "ADMIN" in user collection.

## Swagger endpoints
- To see swagger docs navigate to `http://localhost:8080/api-docs/`.

## Running unit tests (ToDo)

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Contact

- [Rosales Ruben](rosalesruben@gmail.com)