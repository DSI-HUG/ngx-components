# Development

This document describes how you can create, lint, test, build and publish packages in this project.

## Prerequisite

Before you can start you must install and configure the following products on your development machine:

* [Git][git]
* [Node.js][nodejs]

You will then need to clone this project and install the required dependencies:

```sh
git clone <repository_url> <dir_name>
cd <dir_name>
npm install
```

## Creating a new package

Create a new package using the built-in schematic tool.

```sh
run run new-package
```

## Linting/verifying source code

Check that the code is properly formatted and adheres to coding style.

```sh
npm run lint
```

You can also verify it per package:

```sh
npm run lint -w=projects/<package_name>
```

## Unit testing a package

Unit testing a package can be executed with the following command:

```sh
npm run test -w=projects/<package_name>
```

## Building a package

Building a package can be executed with the following command:

```sh
npm run build -w=projects/<package_name>
```

## Publishing a package to NPM repository

This project comes with automatic continuous delivery (CD) using *GitHub Actions*.

1. Trigger a new: [Workflow release](https://github.com/dsi-hug/ngx-components/actions/workflows/ci_release.yml)
2. Watch the results in: [Actions](https://github.com/dsi-hug/ngx-components/actions)



[git]: https://git-scm.com/
[nodejs]: https://nodejs.org/
