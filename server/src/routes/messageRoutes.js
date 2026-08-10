const express = require('express');
const validateMessage = require('../middleware/validateMessage');
const { sendMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

router.post('/', validateMessage, sendMessage);
router.get('/', getMessages);

module.exports = router;
