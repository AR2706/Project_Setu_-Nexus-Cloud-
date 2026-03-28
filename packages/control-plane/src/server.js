require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const Node = require('./models/Node');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);

io.on('connection', (socket) => {
  socket.on('register-node', async (data) => {
    const { nodeId, hostname, resources } = data;
    
    await Node.findOneAndUpdate(
      { nodeId },
      { hostname, status: 'online', resources, lastHeartbeat: Date.now() },
      { upsert: true, returnDocument: 'after' }
    );

    socket.join('compute-nodes');
    socket.emit('registration-success', { message: 'Node registered successfully' });
  });

  socket.on('heartbeat', async (data) => {
    const { nodeId, resources } = data;
    
    await Node.findOneAndUpdate(
      { nodeId },
      { resources, status: 'online', lastHeartbeat: Date.now() },
      { returnDocument: 'after' }
    );
  });
});


app.get('/', (req, res) => {
    res.json({ message: 'Nexus Control Plane is Online' });
});

server.listen(PORT, () => {
});
