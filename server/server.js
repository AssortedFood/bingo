const express = require('express');
const cors = require('cors');
const path = require('path');
const claimsRoutes = require('./routes/claims');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/claims', claimsRoutes(/* debug flag if needed */));

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route to serve index.html for any non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
