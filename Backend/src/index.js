require("dotenv").config({path: "variables.env"});
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

///TODO use express middleware to handle cookes and populate current user

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    },
    port: process.env.BACKEND_PORT
    },
    ({ port }) => {
        console.log(`server butt is now running on port http://localhost:${port}`);
    }
);