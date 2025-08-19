// client/data/tiles.js
const rawTiles = [
  {
    "id": 1,
    "text": "Bryophyta essence",
    "points": 2,
    "image": "/images/1.png"
  },
  {
    "id": 2,
    "text": "Corp: Blessed spiritshield from scrach",
    "points": 5,
    "image": "/images/2.png"
  },
  {
    "id": 3,
    "text": "GWD: Every weapon (Armadyl crossbow, Zamorakian spear, Staff of the dead, and Saradomin sword)",
    "points": 4,
    "image": "/images/3.png"
  },
  {
    "id": 4,
    "text": "GWD: Every hilt (Arma, zammy, Sara and bandos hilt)",
    "points": 4,
    "image": "/images/4.png"
  },
  {
    "id": 5,
    "text": "LDK: Lords of the rings (not the same trip)",
    "points": 3,
    "image": "/images/5.png"
  },
  {
    "id": 6,
    "text": "Yama: Any 3x oathplate",
    "points": 4,
    "image": "/images/6.png"
  },
  {
    "id": 7,
    "text": "Yama: Horn",
    "points": 2,
    "image": "/images/7.png"
  },
  {
    "id": 8,
    "text": "Doom Boots",
    "points": 3,
    "image": "/images/8.png"
  },
  {
    "id": 9,
    "text": "CG: Enhanced weapon seed (or 6 armour seeds or pet)",
    "points": 5,
    "image": "/images/9.png"
  },
  {
    "id": 10,
    "text": "Dragon axe, mud battlestaff and seercull",
    "points": 1,
    "image": "/images/10.png"
  },
  {
    "id": 11,
    "text": "Moons of Peril (any full set)",
    "points": 1,
    "image": "/images/11.png"
  },
  {
    "id": 12,
    "text": "Nex: Any 2 uniques",
    "points": 4,
    "image": "/images/12.png"
  },
  {
    "id": 13,
    "text": "Nightmare: Any orb",
    "points": 5,
    "image": "/images/13.png"
  },
  {
    "id": 14,
    "text": "Titans: Full staff",
    "points": 2,
    "image": "/images/14.png"
  },
  {
    "id": 15,
    "text": "Titans: Bolth prayers",
    "points": 2,
    "image": "/images/15.png"
  },
  {
    "id": 16,
    "text": "Full voidwaker",
    "points": 4,
    "image": "/images/16.png"
  },
  {
    "id": 17,
    "text": "Vorkath: Any unique, not head",
    "points": 3,
    "image": "/images/17.png"
  },
  {
    "id": 18,
    "text": "Zulrah: Any 3x uniques",
    "points": 3,
    "image": "/images/18.png"
  },
  {
    "id": 19,
    "text": "Zulrah: any mutagen",
    "points": 5,
    "image": "/images/19.png"
  },
  {
    "id": 20,
    "text": "Winterdot (Tome of fire)",
    "points": 2,
    "image": "/images/20.png"
  },
  {
    "id": 21,
    "text": "Temperoos (Tome of water)",
    "points": 2,
    "image": "/images/21.png"
  },
  {
    "id": 22,
    "text": "Huecotl (Tome of earth)",
    "points": 2,
    "image": "/images/22.png"
  },
  {
    "id": 23,
    "text": "Guardians of the rift, Any dye",
    "points": 3,
    "image": "/images/23.png"
  },
  {
    "id": 24,
    "text": "Barbarian Assault 10x high roll or the points or 20 upgrade",
    "points": 4,
    "image": "/images/24.png"
  },
  {
    "id": 25,
    "text": "5x blood shards",
    "points": 2,
    "image": "/images/25.png"
  },
  {
    "id": 26,
    "text": "3x zenyte shard",
    "points": 3,
    "image": "/images/26.png"
  },
  {
    "id": 27,
    "text": "Volcanic Mine (broken pickaxe)",
    "points": 1,
    "image": "/images/27.png"
  },
  {
    "id": 28,
    "text": "Ring of endurance",
    "points": 3,
    "image": "/images/28.png"
  },
  {
    "id": 29,
    "text": "Aerial fishing, Golden tench",
    "points": 2,
    "image": "/images/29.png"
  },
  {
    "id": 30,
    "text": "Champion scroll (Hotgoblin)",
    "points": 3,
    "image": "/images/30.png"
  },
  {
    "id": 31,
    "text": "Elder chaos robe (top)",
    "points": 2,
    "image": "/images/31.png"
  },
  {
    "id": 32,
    "text": "Monkey tail (Pvm or hunter)",
    "points": 3,
    "image": "/images/32.png"
  },
  {
    "id": 33,
    "text": "Any weapon from rewenants",
    "points": 3,
    "image": "/images/33.png"
  },
  {
    "id": 34,
    "text": "Fishing (Big bass, shark, and big swordfish)",
    "points": 1,
    "image": "/images/34.png"
  },
  {
    "id": 35,
    "text": "Wilderness rings (any 2x different rings)",
    "points": 3,
    "image": "/images/35.png"
  },
  {
    "id": 36,
    "text": "Jar of eyes and jar of souls",
    "points": 4,
    "image": "/images/36.png"
  },
  {
    "id": 37,
    "text": "DT2, any 2 different vestiges",
    "points": 4,
    "image": "/images/37.png"
  },
  {
    "id": 38,
    "text": "DT2, 3 virtus drops total",
    "points": 5,
    "image": "/images/38.png"
  },
  {
    "id": 39,
    "text": "Colosseum: Any 3x uniques",
    "points": 5,
    "image": "/images/39.png"
  },
  {
    "id": 40,
    "text": "Bandos boots",
    "points": 3,
    "image": "/images/40.png"
  },
  {
    "id": 41,
    "text": "Armadyl helmet",
    "points": 3,
    "image": "/images/41.png"
  },
  {
    "id": 42,
    "text": "Grotesque guardians any 3x unique",
    "points": 3,
    "image": "/images/42.png"
  },
  {
    "id": 43,
    "text": "Hueycoatl, wand",
    "points": 3,
    "image": "/images/43.png"
  },
  {
    "id": 44,
    "text": "Any Visage",
    "points": 4,
    "image": "/images/44.png"
  },
  {
    "id": 45,
    "text": "Hill Giant club",
    "points": 2,
    "image": "/images/45.png"
  },
  {
    "id": 46,
    "text": "Muspah, 5x Venator shards",
    "points": 4,
    "image": "/images/46.png"
  },
  {
    "id": 47,
    "text": "Any pvm pet (Ei chaos ele/skotizo)",
    "points": 5,
    "image": "/images/47.png"
  },
  {
    "id": 48,
    "text": "Any skilling pet (Miqu 200m farm dont count)",
    "points": 4,
    "image": "/images/48.png"
  },
  {
    "id": 49,
    "text": "Full odium or maladiction shield",
    "points": 2,
    "image": "/images/49.png"
  },
  {
    "id": 50,
    "text": "Serichnis Cudel",
    "points": 3,
    "image": "/images/50.png"
  },
  {
    "id": 51,
    "text": "Temperoos (Tacklebox, barrel or harpoon)",
    "points": 2,
    "image": "/images/51.png"
  },
  {
    "id": 52,
    "text": "Smoke battlestaff",
    "points": 3,
    "image": "/images/52.png"
  },
  {
    "id": 53,
    "text": "Zalcano (Any unique)",
    "points": 4,
    "image": "/images/53.png"
  },
  {
    "id": 54,
    "text": "Kalphite Queen (head)",
    "points": 3,
    "image": "/images/54.png"
  },
  {
    "id": 55,
    "text": "Dragon warhammer",
    "points": 5,
    "image": "/images/55.png"
  },
  {
    "id": 56,
    "text": "Forestry (amulet, whistle, or egg)",
    "points": 5,
    "image": "/images/56.png"
  },
  {
    "id": 57,
    "text": "Dragon metal lump or slice (Rune/adamant dragon)",
    "points": 3,
    "image": "/images/57.png"
  },
  {
    "id": 58,
    "text": "Eternal glory",
    "points": 4,
    "image": "/images/58.png"
  },
  {
    "id": 59,
    "text": "All Cerberus crystals",
    "points": 4,
    "image": "/images/59.png"
  },
  {
    "id": 60,
    "text": "Abyssal sire, full bludgeon",
    "points": 4,
    "image": "/images/60.png"
  },
  {
    "id": 61,
    "text": "Alchemical Hydra, Claw",
    "points": 4,
    "image": "/images/61.png"
  },
  {
    "id": 62,
    "text": "Alchemical Hydra, hide",
    "points": 3,
    "image": "/images/62.png"
  },
  {
    "id": 63,
    "text": "Araxxor, fang",
    "points": 4,
    "image": "/images/63.png"
  },
  {
    "id": 64,
    "text": "araxxor, full hally",
    "points": 5,
    "image": "/images/64.png"
  },
  {
    "id": 65,
    "text": "Full barrows set (or 15 uniques)",
    "points": 3,
    "image": "/images/65.png"
  },
  {
    "id": 66,
    "text": "1 point/purple",
    "points": 1,
    "image": "/images/66.png"
  },
  {
    "id": 67,
    "text": "10 purple chests",
    "points": 4,
    "image": "/images/67.png"
  },
  {
    "id": 68,
    "text": "CoX CM 3x kit",
    "points": 4,
    "image": "/images/68.png"
  },
  {
    "id": 69,
    "text": "Dust from Cox or Hmt",
    "points": 4,
    "image": "/images/69.png"
  },
  {
    "id": 70,
    "text": "ToA fang kit",
    "points": 3,
    "image": "/images/70.png"
  },
  {
    "id": 71,
    "text": "Any megarare (tbow, scythe, tumeken)",
    "points": 5,
    "image": "/images/71.png"
  },
  {
    "id": 72,
    "text": "ToA 3x masori unique",
    "points": 4,
    "image": "/images/72.png"
  },
  {
    "id": 73,
    "text": "ToA Lb & ward",
    "points": 4,
    "image": "/images/73.png"
  },
  {
    "id": 74,
    "text": "TOB 3x justi",
    "points": 4,
    "image": "/images/74.png"
  },
  {
    "id": 75,
    "text": "TOB avernic+rapier or sang",
    "points": 5,
    "image": "/images/75.png"
  },
  {
    "id": 76,
    "text": "COX 3x ancestral",
    "points": 4,
    "image": "/images/76.png"
  },
  {
    "id": 77,
    "text": "COX bolth prayer scrolls",
    "points": 3,
    "image": "/images/77.png"
  },
  {
    "id": 78,
    "text": "Community event (must attendt community event)",
    "points": 1,
    "image": "/images/78.png"
  },
  {
    "id": 79,
    "text": "Stale baguette",
    "points": 2,
    "image": "/images/79.png"
  },
  {
    "id": 80,
    "text": "Corp any sigil",
    "points": 5,
    "image": "/images/80.png"
  },
  {
    "id": 81,
    "text": "Teleport anchor scroll",
    "points": 1,
    "image": "/images/81.png"
  },
  {
    "id": 82,
    "text": "Basilisk jaw",
    "points": 3,
    "image": "/images/82.png"
  },
  {
    "id": 83,
    "text": "Broken dragon hasta",
    "points": 2,
    "image": "/images/83.png"
  },
  {
    "id": 84,
    "text": "Imbued hearth or eternal gem",
    "points": 5,
    "image": "/images/84.png"
  },
  {
    "id": 85,
    "text": "Pharaoh's sceptre",
    "points": 3,
    "image": "/images/85.png"
  },
  {
    "id": 86,
    "text": "Dragonstone armour piece",
    "points": 2,
    "image": "/images/86.png"
  },
  {
    "id": 87,
    "text": "Toktz-mej-tal",
    "points": 2,
    "image": "/images/87.png"
  },
  {
    "id": 88,
    "text": "2x burning claws",
    "points": 2,
    "image": "/images/88.png"
  },
  {
    "id": 89,
    "text": "Tormented synapse",
    "points": 3,
    "image": "/images/89.png"
  },
  {
    "id": 90,
    "text": "Gnome scarf, goggles, or mint cake",
    "points": 2,
    "image": "/images/90.png"
  },
  {
    "id": 91,
    "text": "Guardians of the Rift (lantern)",
    "points": 3,
    "image": "/images/91.png"
  },
  {
    "id": 92,
    "text": "Beginner clue Any boots",
    "points": 1,
    "image": "/images/92.png"
  },
  {
    "id": 93,
    "text": "Beginner clue Sandwich lady bottom",
    "points": 2,
    "image": "/images/93.png"
  },
  {
    "id": 94,
    "text": "Easy clue Any cape",
    "points": 2,
    "image": "/images/94.png"
  },
  {
    "id": 95,
    "text": "Easy clue: Golden hat, apron, or wooden shield G",
    "points": 3,
    "image": "/images/95.png"
  },
  {
    "id": 96,
    "text": "Easy clue Flared trousers",
    "points": 3,
    "image": "/images/96.png"
  },
  {
    "id": 97,
    "text": "Medium Clue Any boots",
    "points": 2,
    "image": "/images/97.png"
  },
  {
    "id": 98,
    "text": "Medium clue Strength amulet (t)",
    "points": 2,
    "image": "/images/98.png"
  },
  {
    "id": 99,
    "text": "Medium clue Any banner",
    "points": 2,
    "image": "/images/99.png"
  },
  {
    "id": 100,
    "text": "Hard clue Robin hood hat or Zamorak full helm",
    "points": 3,
    "image": "/images/100.png"
  },
  {
    "id": 101,
    "text": "Hard clue Any dragon mask",
    "points": 3,
    "image": "/images/101.png"
  },
  {
    "id": 102,
    "text": "Hard clue Amulet of glory (4)",
    "points": 2,
    "image": "/images/102.png"
  },
  {
    "id": 103,
    "text": "Elite clue Any rangers outfit",
    "points": 4,
    "image": "/images/103.png"
  },
  {
    "id": 104,
    "text": "Elite clue Any dragon mask",
    "points": 3,
    "image": "/images/104.png"
  },
  {
    "id": 105,
    "text": "Master clue Any ankou or mummy piece",
    "points": 4,
    "image": "/images/105.png"
  },
  {
    "id": 106,
    "text": "Master clue Any kit",
    "points": 3,
    "image": "/images/106.png"
  },
  {
    "id": 107,
    "text": "Clue Any guilded or 3rd piece",
    "points": 4,
    "image": "/images/107.png"
  },
  {
    "id": 108,
    "text": "Full colossal graceful recolour set",
    "points": 3,
    "image": "/images/108.png"
  },
  {
    "id": 109,
    "text": "Evil Chicken",
    "points": 2,
    "image": "/images/109.png"
  },
  {
    "id": 110,
    "text": "Obsidian helm",
    "points": 2,
    "image": "/images/110.png"
  },
  {
    "id": 111,
    "text": "Any Dusk mystic robe piece",
    "points": 3,
    "image": "/images/111.png"
  },
  {
    "id": 112,
    "text": "DT2 any 4x axe piece total",
    "points": 5,
    "image": "/images/112.png"
  },
  {
    "id": 113,
    "text": "1 down Bloat",
    "points": 1,
    "image": "/images/113.png"
  },
  {
    "id": 114,
    "text": "1 down cm tekton",
    "points": 1,
    "image": "/images/114.png"
  },
  {
    "id": 115,
    "text": "Elder maul",
    "points": 4,
    "image": "/images/115.png"
  },
  {
    "id": 116,
    "text": "Doom Staff",
    "points": 2,
    "image": "/images/116.png"
  },
  {
    "id": 117,
    "text": "Doom gloves",
    "points": 2,
    "image": "/images/117.png"
  },
  {
    "id": 118,
    "text": "Discovalot coxissa!",
    "points": 5,
    "image": "/images/118.png"
  },
  {
    "id": 119,
    "text": "Fletching knife",
    "points": 1,
    "image": "/images/119.png"
  },
  {
    "id": 120,
    "text": "Infinity boots",
    "points": 1,
    "image": "/images/120.png"
  },
  {
    "id": 121,
    "text": "Pirate's hook",
    "points": 3,
    "image": "/images/121.png"
  },
  {
    "id": 122,
    "text": "Merfolk trident",
    "points": 1,
    "image": "/images/122.png"
  },
  {
    "id": 123,
    "text": "Colossal Blade",
    "points": 1,
    "image": "/images/123.png"
  },
  {
    "id": 124,
    "text": "Reagent pouch",
    "points": 1,
    "image": "/images/124.png"
  },
  {
    "id": 125,
    "text": "Miqus strawhat",
    "points": 1,
    "image": "/images/125.png"
  },
  {
    "id": 126,
    "text": "Bag and Saw",
    "points": 1,
    "image": "/images/126.png"
  }
];

export default rawTiles;
