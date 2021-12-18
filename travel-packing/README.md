# Travel packing app

This is an example app through the book.

# How to run this app?

1. Install NodeJS.

2. Run those commands in your console:

```bash
npm install
npm run start:dev
```

3. Open your browser at `localhost:5000`.

## End-To-End tests

We need to enter the `cypress` container.
To do so, open the terminal from the host and run this command:

```bash
npm run cy:dc:exec
```

Inside the terminal from the `cypress` container, you can run any `cypress` command or those aliases:

- `npm run cy:open` and browse `localhost:6006`
- `npm run cy:run`

## Build and start HTTP server

```bash
npm run build
cd server
npm run start
```

Browse `localhost:1234`.
