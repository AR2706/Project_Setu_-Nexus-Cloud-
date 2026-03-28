const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  nodeId: { type: String, required: true, unique: true },
  hostname: { type: String, required: true },
  status: { type: String, enum: ['online', 'offline', 'busy'], default: 'offline' },
  resources: {
    cpuCount: Number,
    totalMem: Number,
    freeMem: Number,
  },
  lastHeartbeat: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Node', NodeSchema);
