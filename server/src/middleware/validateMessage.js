function validationError(message) {
  const err = new Error(message);
  err.status = 400;
  err.code = 'VALIDATION_ERROR';
  return err;
}

function validateMessage(req, res, next) {
  const { username, message } = req.body;

  if (username === undefined || username === null) {
    return next(validationError('username is required'));
  }

  if (typeof username !== 'string') {
    return next(validationError('username must be a string'));
  }

  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    return next(validationError('username must be non-empty'));
  }

  if (trimmedUsername.length > 30) {
    return next(validationError('username must be at most 30 characters'));
  }

  if (message === undefined || message === null) {
    return next(validationError('message is required'));
  }

  if (typeof message !== 'string') {
    return next(validationError('message must be a string'));
  }

  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return next(validationError('message must be non-empty'));
  }

  if (trimmedMessage.length > 1000) {
    return next(validationError('message must be at most 1000 characters'));
  }

  req.body.username = trimmedUsername;
  req.body.message = trimmedMessage;

  next();
}

module.exports = validateMessage;
