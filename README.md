<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Roadmap

- **User Management**

  - [x] `POST /register`: Register user.
  - [x] `POST /login`: Login and return JWT.

- **Product Management**

  - [x] `GET /products`: List all products.
  - [x] `GET /products/{id}`: Product details.
  - [x] `POST`, `PUT`, `DELETE /products`: Manage products (auth required).

- **Order Management**

  - [x] `POST /orders`: Place order (auth required).
  - [x] `GET /orders/{id}`: Order details (auth required).
  - [x] `GET /orders`: List user orders (auth required).

- **Authentication & Authorization**

  - [x] Use JWT for authentication.
  - [x] Protect product and order endpoints.

- **Product Catalog**

  - [x] Product attributes: id, name, description, price, stock, createdAt, updatedAt.

- **Order Processing & Payment Simulation**

  - [x] Deduct stock upon order, simulate async payment, restore stock on failure.

- **Asynchronous Processing**

  - [x] Use job queue for async order processing and retries on payment failure.

- **Error Handling & Edge Cases**

  - [x] Handle insufficient stock, unauthorized access, invalid input.
  - [x] Ensure idempotency in order processing.

- **Optimizations**

  - [x] Caching (e.g., Redis) for frequent GET requests.
  - [x] Pagination, indexing for efficient database queries.

- **Bonus Features**

  - [x] WebSocket for real-time notifications.
  - [x] Rate limiting for login and API requests.

- **Stack & Authentication**

  - [x] Use NestJS, PostgreSQL, Redis
  - [x] JWT or Auth0 for authentication.

- **Asynchronous Processing & Data Consistency**

  - [x] Redis for job queue; exponential backoff on failures.
  - [x] Use transactions or compensatory actions for consistency.

- **Testing**
  - [ ] Write unit tests (auth, product mgmt) and integration tests (order, payment).

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# run migrations
$ yarn prisma:migrate:run

# run seeder to create a default admin user with default password: password
$ yarn prisma db seed

# production mode
$ yarn run start:prod


# For development mode first run to generate prisma models
$ yarn prisma:generate

# Then run
$ yarn run start:dev

```

## Other Database set up

```bash
# create new migration
$ yarn prisma:migrate:save

# run migrations
$ yarn prisma:migrate:run

# run seeder to create a default admin user with default password: password
$ yarn prisma db seed

# generate models
$ yarn prisma:generate

# reset database
$ yarn prisma:migrate:reset
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Endpoints

This repository includes a `Postman collection` named: `Skill test - HTTP.postman_collection.json`. Import it into `Postman` to test all available endpoints

## Websocket

### Headers

Header of the websocket connection should include the following values:

```json
{
  "Authorization": "Bearer your-jwt-token"
}
```

### Order Status

To get Order status updates these are the details:

#### Connection Details

- Server URL: `ws://localhost:3000`
- Namespace: `/orders`
- Event name: `status`
- Transport: Socket.IO (WebSocket with fallback mechanisms)

### Payment Status

To get Payment status updates these are the details:

#### Connection Details

- Server URL: `ws://localhost:3000`
- Namespace: `/payment`
- Event name: `status`
- Transport: Socket.IO (WebSocket with fallback mechanisms)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
