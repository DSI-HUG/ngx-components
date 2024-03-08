# Development

This document describes how you can test, build and publish the library and its documentation.

## Prerequisite

Before you can build and test this library you must install and configure the following products on your development machine:

* [Git][git]
* [Node.js][nodejs]

You will then need to install the required dependencies:

```sh
cd <library-path>
npm install
```

## Linting/verifying source code

Check that the code is properly formatted and adheres to coding style.

```sh
npm run lint
```

## Unit testing

Unit tests can be executed with the following command:

```sh
npm run test --prefix=projects/<PROJECT_NAME>
```

## Publishing the library to NPM repository

This project comes with automatic continuous delivery (CD) using *GitHub Actions*.

1. Bump the library version in `./projects/<PROJECT_NAME>/package.json`
2. Push the changes
3. TODO
4. Watch the results in: [Actions](https://github.com/dsi-hug/ngx-components/actions)



[git]: https://git-scm.com/
[nodejs]: https://nodejs.org/
