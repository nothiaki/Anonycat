import express from 'express';
import cors from 'cors';
import router from './routes/routes'
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(cors());
app.use('/', router);

export { httpServer, io };
