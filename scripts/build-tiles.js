const fs   = require('fs');
const path = require('path');
const csv  = require('csv-parser');

const inputCsv = path.join(__dirname, 'tiles.csv');
const outputJs = path.join(__dirname, 'tiles.js');

const tiles = [];

fs.createReadStream(inputCsv)
  .pipe(csv({
    // Trim whitespace (and BOM) off all headers
    mapHeaders: ({ header }) => header.trim()
  }))
  .on('data', row => {
    // If there’s no “#” field, it’s a blank/junk row → skip it
    if (!row['#']) return;

    const idStr = row['#'].trim();
    // If it’s still empty after trimming, skip it
    if (!idStr) return;

    tiles.push({
      id:     Number(idStr),
      text:   row['Name'].trim(),
      points: Number(row['Points']),
      image:  `/images/${idStr}.png`
    });
  })
  .on('end', () => {
    const fileContent =
      'const rawTiles = ' +
      JSON.stringify(tiles, null, 2) +
      ';\n\nexport default rawTiles;\n';

    fs.writeFileSync(outputJs, fileContent, 'utf8');
    console.log(`Generated ${outputJs} with ${tiles.length} tiles.`);
  })
  .on('error', err => {
    console.error('Error reading CSV:', err);
  });