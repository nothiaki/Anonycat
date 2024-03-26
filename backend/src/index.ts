import express from 'express';
import cors from 'cors';
import router from './routes/routes'
import http from 'http';
import { Server } from 'socket.io';
import * as middleware from './middleware/middleware';

const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use(cors());
app.use('/', router);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  console.log(`new user: ${socket.id}`);

  socket.on('on_chat', req => {
    middleware.onChat(req, socket);
  });

  socket.on('message', req => {
    middleware.onMessage(req);
  });

  socket.on('delete_user', req => {
    middleware.deleteUser(req);
  });
});

httpServer.listen(PORT, () => {
  console.log(`> Server on: http://localhost:${PORT}`)
});
