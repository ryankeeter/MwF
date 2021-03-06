const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({path: "variables.env"});
const createServer = require("./createServer");
const db = require("./db");
const server = createServer();

server.express.use(cookieParser());
     /*server.express.use((req, res, next) => {
const { token } = req.cookies;
   if(token){
        const { userId } = jwt.verify(token, process.env.APP_SECRET)
    }
    next()
;*/
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