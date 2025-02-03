// client/src/models/BingoTile.js

class BingoTile {
  constructor(id, description, image, points, claimedBy = []) {
    this.id = id;
    this.description = description;
    this.image = image;
    this.points = points;
    this.claimedBy = claimedBy; // Array of team IDs
  }

  toggleTeamClaim(teamId) {
    if (this.claimedBy.includes(teamId)) {
      this.claimedBy = this.claimedBy.filter(id => id !== teamId);
      console.log(`❌ Team ${teamId} unclaimed Tile ${this.id}`);
    } else {
      this.claimedBy.push(teamId);
      console.log(`✅ Team ${teamId} claimed Tile ${this.id}`);
    }
  }

  getPointsForTeam(teamId) {
    return this.claimedBy.includes(teamId) ? this.points : 0;
  }

  isClaimedByTeam(teamId) {
    return this.claimedBy.includes(teamId);
  }

  toJSON() {
    return {
      id: this.id,
      description: this.description,
      image: this.image,
      points: this.points,
      claimedBy: this.claimedBy
    };
  }
}

export default BingoTile;
