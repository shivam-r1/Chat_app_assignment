const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const healthRoutes = require('./routes/healthRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: config.CLIENT_URL }));
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/messages', messageRoutes);

app.use(errorHandler);

module.exports = app;
