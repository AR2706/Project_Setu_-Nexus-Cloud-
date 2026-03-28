const { io } = require('socket.io-client');
const si = require('systeminformation');
const crypto = require('crypto');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:8000';
const socket = io(SERVER_URL);

const nodeId = crypto.randomUUID();

const getSystemStats = async () => {
  const mem = await si.mem();
  const cpu = await si.cpu();
  const os = await si.osInfo();

  return {
    hostname: os.hostname,
    resources: {
      cpuCount: cpu.cores,
      totalMem: mem.total,
      freeMem: mem.free
    }
  };
};

socket.on('connect', async () => {
  const stats = await getSystemStats();
  
  socket.emit('register-node', {
    nodeId,
    hostname: stats.hostname,
    resources: stats.resources
  });
});

socket.on('registration-success', () => {
  setInterval(async () => {
    const stats = await getSystemStats();
    socket.emit('heartbeat', {
      nodeId,
      resources: stats.resources
    });
  }, 10000);
});
