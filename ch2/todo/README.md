# Todo app

This is an example app from "2.3 Bonus app".

# How to run this app?

1. Install NodeJS.

2. Run those commands in your console:

```bash
npm install
npm run start:dev
```

3. Open your browser at `localhost:5000`.

# How to run tests?

Be sure to have run `npm install`.

## Unit tests

```bash
npm run test
```

## End-To-End tests

We need to enter the `cypress` container.
To do so, open the terminal from the host and run this command:

```bash
npm run cy:dc:exec
```

Inside the terminal from the `cypress` container, you can run any `cypress` command or those aliases:

- `npm run cy:open` and browse `localhost:6006`
- `npm run cy:run`
