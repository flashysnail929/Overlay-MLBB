export interface Match {
  id?: number;
  bestOf: number;
  games: Game[];
}

export interface Game {
  gameNumber: number;
  leftTeam: DraftTeam;
  rightTeam: DraftTeam;
  winner?: "left" | "right";
}

export interface DraftTeam {
  teamId?: number;
  bans: DraftSlot[];
  picks: DraftSlot[];
  result?: "win" | "lose";
}

export interface DraftSlot {
  playerId?: number;
  heroSlug: string;
}

export const createEmptyMatch = ({ bestOf }: { bestOf: number }): Match => ({
  bestOf: bestOf,
  games: Array.from({ length: bestOf }, (_, i) => createEmptyGame(i + 1)),
});

export const createEmptyGame = (
  gameNumber: number,
): Match["games"][number] => ({
  gameNumber,
  leftTeam: {
    bans: Array.from({ length: 5 }, () => ({
      heroSlug: "idle",
    })),
    picks: Array.from({ length: 5 }, () => ({
      heroSlug: "idle",
    })),
  },
  rightTeam: {
    bans: Array.from({ length: 5 }, () => ({
      heroSlug: "idle",
    })),
    picks: Array.from({ length: 5 }, () => ({
      heroSlug: "idle",
    })),
  },
});
