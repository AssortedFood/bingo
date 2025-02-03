// server/routes/claims.js

const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const claimsFilePath = path.join(__dirname, '../data/claims.json');

module.exports = (debug) => {
  const router = express.Router();

  const log = (message, data) => {
    if (debug) console.log(message, data || '');
  };

  let writeQueue = Promise.resolve();

  // GET claims
  router.get('/', async (req, res) => {
    try {
      const data = await fs.readJson(claimsFilePath);
      log('📥 Claims data retrieved:', data);
      res.json(data);
    } catch (err) {
      log('❌ Error reading claims.json:', err);
      res.status(500).json({ error: 'Failed to read claims file.' });
    }
  });

  // POST claims (update)
  router.post('/', (req, res) => {
    const updatedTile = req.body;  // Expecting full tile object
    log(`🗂️ Attempting to update Tile ID: ${updatedTile.id}`);
    log('🔍 New claimedBy:', updatedTile.claimedBy);

    if (!updatedTile.id || !Array.isArray(updatedTile.claimedBy)) {
      log('❌ Invalid data format:', updatedTile);
      return res.status(400).json({ error: 'Invalid data format.' });
    }

    writeQueue = writeQueue
      .then(async () => {
        let currentData = [];
        try {
          currentData = await fs.readJson(claimsFilePath);
        } catch (err) {
          log('ℹ️ claims.json not found, creating a new one.');
        }

        // ✅ Fix: Use `id` instead of `tileId`
        const existingTileIndex = currentData.findIndex(tile => tile.id === updatedTile.id);

        if (existingTileIndex !== -1) {
          // 🔄 Update only the claimedBy field
          currentData[existingTileIndex].claimedBy = updatedTile.claimedBy;
          log(`♻️ Updated tile ID ${updatedTile.id}`, currentData[existingTileIndex]);
        } else {
          // ➕ Add new tile if not found
          currentData.push(updatedTile);
          log(`✨ Added new tile ID ${updatedTile.id}`, updatedTile);
        }

        await fs.writeJson(claimsFilePath, currentData, { spaces: 2 });
        log('✅ Claims updated successfully:', currentData);

        res.json({ message: 'Claims updated successfully.' });
      })
      .catch((err) => {
        log('❌ Error writing claims.json:', err);
        res.status(500).json({ error: 'Failed to save claims.' });
      });
  });

  return router;
};
