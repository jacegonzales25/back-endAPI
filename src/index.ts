import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors"; 

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
console.log("Hello Typescript!");

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server listening at localhost:8080");
});