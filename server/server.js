// server/server.js

const express = require('express');
const cors = require('cors');
const claimsRoutes = require('./routes/claims');

const app = express();
const PORT = 5000;

const debug = true;  // Simple debug flag

app.use(cors());
app.use(express.json());

app.use('/api/claims', claimsRoutes(debug));  // Pass debug flag to routes

if (debug) console.log(`🚀 Debug mode enabled`);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
