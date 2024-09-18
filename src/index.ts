import express from 'express';
import http from 'http';
import bodyParseer from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import  cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParseer.json());

const server = http.createServer(app);

server.listen(8080, () =>{

    console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = 'mongodb+srv://spunky:123456!@cluster0.dauzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
                 //mongodb://spunky:<db_password>@<hostname>/?ssl=true&replicaSet=atlas-14g195-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error:Error) => console.log(error));

app.use('/', router());
