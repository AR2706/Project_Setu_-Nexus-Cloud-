require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(morgan('dev')); // Logs requests

app.get('/', (req, res) => {
  res.json({ message: 'Nexus Control Plane is Online' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
