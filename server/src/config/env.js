const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;

if (!CLIENT_URL) {
  console.warn(
    'Warning: CLIENT_URL is not set. CORS will not allow cross-origin requests from a client.'
  );
}

module.exports = {
  PORT,
  MONGODB_URI,
  CLIENT_URL,
};
