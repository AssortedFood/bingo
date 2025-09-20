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

  // serialize writes so we never race
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

  // POST claims (create or update)
  router.post('/', (req, res) => {
    const updatedTile = req.body;  // expecting { id, description, image, info, points, claimedBy }
    log(`🗂️ Attempting to update Tile ID: ${updatedTile.id}`);
    log('🔍 New claimedBy:', updatedTile.claimedBy);

    if (!updatedTile.id || !Array.isArray(updatedTile.claimedBy)) {
      log('❌ Invalid data format:', updatedTile);
      return res.status(400).json({ error: 'Invalid data format.' });
    }

    writeQueue = writeQueue
      .then(async () => {
        // 1) load existing claims (or start fresh)
        let currentData = [];
        try {
          currentData = await fs.readJson(claimsFilePath);
        } catch (err) {
          log('ℹ️ claims.json not found, initializing new array.');
        }

        // 2) stamp the update
        const now = new Date().toISOString();

        // 3) find existing or push new
        const idx = currentData.findIndex((t) => t.id === updatedTile.id);
        if (idx !== -1) {
          // update in place
          currentData[idx].claimedBy    = updatedTile.claimedBy;
          currentData[idx].lastModified = now;
          log(`♻️ Updated tile ID ${updatedTile.id}`, currentData[idx]);
        } else {
          // add brand-new
          const record = {
            ...updatedTile,
            lastModified: now,
          };
          currentData.push(record);
          log(`✨ Added new tile ID ${updatedTile.id}`, record);
        }

        // 4) write back to disk
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