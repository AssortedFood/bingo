// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const claimsFileDir  = path.join(__dirname, 'data');
const claimsFilePath = path.join(claimsFileDir, 'claims.json');

async function bootstrapClaimsFile() {
  try {
    // make sure the data directory exists
    await fs.ensureDir(claimsFileDir);

    // if claims.json does not exist, write an empty array
    const exists = await fs.pathExists(claimsFilePath);
    if (!exists) {
      console.log('💾 claims.json not found, creating with []');
      await fs.writeJson(claimsFilePath, [], { spaces: 2 });
    }
  } catch (err) {
    console.error('❌ Failed to bootstrap claims.json:', err);
    process.exit(1);
  }
}

(async () => {
  await bootstrapClaimsFile();

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());

  // Now safe to mount routes — claims.json is guaranteed to exist
  const claimsRoutes = require('./routes/claims');
  app.use('/api/claims', claimsRoutes(/* debug? */));

  // Serve React
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})();