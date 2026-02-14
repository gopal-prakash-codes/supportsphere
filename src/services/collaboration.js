import { Server } from 'socket.io';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis();
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const CHANNEL = 'support_agents';

io.on('connection', (socket) => {
  console.log('A support agent connected:', socket.id);

  socket.on('join', async (agentId) => {
    try {
      socket.join(CHANNEL);
      const agent = await prisma.agent.findUnique({ where: { id: agentId } });
      if (!agent) {
        socket.emit('error', 'Agent not found');
        return;
      }
      console.log(`Agent ${agentId} joined the collaboration channel`);
    } catch (error) {
      console.error('Error joining channel:', error);
      socket.emit('error', 'Failed to join channel');
    }
  });

  socket.on('message', async (message) => {
    try {
      const { agentId, content } = message;
      if (!agentId || !content) {
        socket.emit('error', 'Invalid message format');
        return;
      }
      const msgData = { agentId, content, timestamp: new Date() };
      await redis.lpush(CHANNEL, JSON.stringify(msgData));
      io.to(CHANNEL).emit('message', msgData);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', 'Failed to send message');
    }
  });

  socket.on('disconnect', () => {
    console.log('A support agent disconnected:', socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});