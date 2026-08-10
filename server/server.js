require('dotenv').config();

const http = require('http');
const app = require('./src/app');
const config = require('./src/config/env');
const connectDB = require('./src/config/db');

require('./src/models/Message');

const PORT = config.PORT;
const server = http.createServer(app);

let listening = false;

connectDB().then(() => {
  if (!listening) {
    console.log('MongoDB connected before HTTP server started listening');
  }
});

server.listen(PORT, () => {
  listening = true;
  console.log(`Server running on port ${PORT}`);
});
