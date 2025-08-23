# RuneScape Bingo Board

A full-stack React + Express application showcasing a collaborative Bingo board for RuneScape challenges.
Players can toggle dark/light mode, enable auto-refresh, and claim tiles by team. Claims persist on the server and update in real-time on refresh.

---

## 🚀 Features

- Responsive bingo grid (unlimited tiles via CSV → JSON script)
- Configurable teams (edit `client/src/data/teams.js`)
- Dark/Light mode toggle (persists in `localStorage`, respects OS preference)
- Auto-refresh toggle with configurable interval
- Claim tiles per team; changes POST to `/api/claims` and persist in `server/data/claims.json`
- **Bulk tile generator**: `scripts/build-tiles.js` reads `scripts/tiles.csv` and outputs `client/src/data/tiles.js`
- CSV supports any number of rows → unlimited tiles
- Teams array supports any number of teams → dynamic badges
- Docker & Docker Compose support for quick deployment

---

## ⚙️ Prerequisites

- Node.js ≥16 & npm (or yarn)
- Git
- **Optional**: Docker & Docker Compose

---

## 🔧 Installation

```bash
git clone https://github.com/AssortedFood/bingo.git
cd bingo

# Install server + client deps
npm install
cd client && npm install
cd ..
```

---

## 📝 Scripts

### Build Tile Data

```bash
node scripts/build-tiles.js
```

- Reads `scripts/tiles.csv` → regenerates `client/src/data/tiles.js`
- Supports *any* number of CSV rows and columns `#, Name, Points, image`

> [!TIP]
> Run this whenever you update `tiles.csv` to refresh your bingo content.

### Development Server

```bash
npm run dev
```

- Starts Express API + serves React dev client
- API on `http://localhost:5000/api/claims`
- React app on `http://localhost:3000`

### Production Build

```bash
# Build React client
cd client && npm run build
# Serve statically via Express
cd ..
npm run start:prod
```

> [!NOTE]
> Remember to update your dependencies before running the build.

---

## 🐳 Docker & Docker Compose

> [!IMPORTANT]
> Ensure you upload the image to your Docker Hub before running.

```bash
# Build
docker build -t osrs-bingo .

# Push
docker push YOUR_DOCKERHUB_USERNAME/bingo:latest
```

```yaml
services:
  bingo:
    image: YOUR_DOCKERHUB_USERNAME/bingo:latest
    container_name: bingo
    ports:
      - "5000:5000"
    pull_policy: always
    restart: unless-stopped
```

---

## 📂 Project Structure

```
.
├─ client/               ← React + MUI v5 + Emotion
│  ├─ public/            ← assets & index.html
│  └─ src/
│     ├─ assets/         ← icons, fonts
│     ├─ components/     ← UI components (Toggles, Menu, Board…)
│     ├─ data/           ← teams.js, tiles.js (generated)
│     ├─ models/         ← BingoTile class
│     ├─ App.js          ← main entry
│     └─ index.js        ← ReactDOM root
├─ scripts/
│  ├─ tiles.csv          ← source CSV data
│  └─ build-tiles.js     ← CSV → JSON tile builder
├─ server/
│  ├─ data/              ← claims.json (updated by POST)
│  ├─ routes/claims.js   ← API handlers
│  └─ server.js          ← Express app + static serving
├─ Dockerfile
├─ docker-compose.yml    ← example compose config
├─ deploy.sh
└─ package.json
```

---

## 🔗 API Endpoints

- **GET** `/api/claims`
  Returns array of `{ id, claimedBy: [teamIDs] }`.

- **POST** `/api/claims`
  Request body: full tile object with updated `claimedBy` array.
  Merges into JSON store and replies with `{ message: … }`.

---

## ⚙️ Configuration

- **Tile data**: Edit `scripts/tiles.csv`, run `build-tiles.js`.
- **Teams**: Edit `client/src/data/teams.js`.
- **Theme**: Customize `lightPalette` & `darkOverrides` in `App.js` or wrap with your theme.
- **Auto-refresh**: Configure default interval in `SettingsMenu.js` (default 60 s).

---

## 🙏 License

This project is licensed under MIT. See [LICENSE](LICENSE) for details.
RuneScape assets & icons subject to Jagex’s terms.