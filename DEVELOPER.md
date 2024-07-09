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

Create a new package using the built-in schematic tool:

```sh
npm run new-package
```

Reorder alphabetically what was generated in `README.md` and `.github/workflows/ci_release.yml`.

If this new package has any other internal packages as peer dependencies:
- make sure that this new package is also tested during the tests of the other packages

*(have a look at [ci_test_core.yml](https://github.com/DSI-HUG/ngx-components/blob/main/.github/workflows/ci_test_core.yml#L27-L29) for examples)*

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

## Building a package

Building a package can be executed with the following command:

```sh
npm run build -w=projects/<package_name>
```

## Publishing a package to NPM repository

This project comes with automatic continuous delivery (CD) using *GitHub Actions*.

To publish a package:

1. Trigger a new: [Workflow release](https://github.com/dsi-hug/ngx-components/actions/workflows/ci_release.yml)
2. Watch the results in: [Actions](https://github.com/dsi-hug/ngx-components/actions)

### ⚠️ First release

> A previous tag needs to be found to compute the next semver version.

So when you publish a package for the first time, you will have to do the following:

1. Commit and push the package, using this commit message:
```sh
feat(<package_name>): first commit
```

2. Add a tag to the commit prior to the one you just created, and push it:
```sh
@hug/ngx-<package_name>@1.0.0
```

3. Trigger a new release

4. Once done, remove the tag you previously created


[git]: https://git-scm.com/
[nodejs]: https://nodejs.org/
