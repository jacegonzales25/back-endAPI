import 'dotenv/config'
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors'; 
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server listening at localhost:8080");
});

// Using environment variables for Password
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGO_URL = 'mongodb+srv://jacegonzales25:' + MONGODB_PASSWORD + '@back-endapi.flsxrcr.mongodb.net/?retryWrites=true&w=majority';
console.log(MONGO_URL);

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => {console.log(error)});

// Adding the path to the router in router folder. This loads the middleware of index.ts in router folder.
app.use('/', router());