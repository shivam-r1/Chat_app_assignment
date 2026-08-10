require('dotenv').config();

const http = require('http');
const app = require('./src/app');
const config = require('./src/config/env');

const PORT = config.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
