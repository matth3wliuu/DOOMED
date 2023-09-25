### Doomed

### Server setup
1. `cd` into the `server` directory and create a `.env` file containing
    ```
    NODE_ENV=development
    SERVER_PORT=8080
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=mysecretpassword
    DB_NAME=doomed
    JWT_SECRET=DOOMED
    ```
2. run the `npm i` command

**Local Development**
1. create a local instance of Postgres with details matching the `.env` file
2. run `npm run dev` to start up the server

**Development on Docker**
1. run `docker compose build` to build the server with the latest dependencies
2. run `docker compose up` to start up the server