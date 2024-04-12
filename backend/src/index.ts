import express from 'express';
import cors from 'cors';
import router from './routes/routes'
import http from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { Message } from './types/Message';

const app = express();
const PORT: number = 3000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use('/', router);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log(`new user: ${socket.id}`);

  socket.on('send_message', (req: Message) => {
    socket.broadcast.emit('get_message', req);
  });

  socket.on('delete_user', async (req: User) => {
    await prisma.user.delete({
      where: { name: req.name }
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`> Server on: http://localhost:${PORT}`)
});
