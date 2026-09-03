import type { DraftSlot, Game } from "@/models/match";

// Helper
// export const getPreviousHeroes = (draft: Game) =>
//   new Set([
//     ...draft.leftTeam.bans.map((h) => h.heroSlug),
//     ...draft.rightTeam.bans.map((h) => h.heroSlug),
//     ...draft.leftTeam.picks.map((h) => h.heroSlug),
//     ...draft.rightTeam.picks.map((h) => h.heroSlug),
//   ]);

export const currentBans = (currentDraft: Game) =>
  new Set([
    ...currentDraft.leftTeam.bans.map((b) => b.heroSlug),
    ...currentDraft.rightTeam.bans.map((b) => b.heroSlug),
  ]);

export const currentPicks = (currentDraft: Game) =>
  new Set([
    ...currentDraft.leftTeam.picks.map((b) => b.heroSlug),
    ...currentDraft.rightTeam.picks.map((b) => b.heroSlug),
  ]);

const getHeroSet = (picks: DraftSlot[], compare: Set<string>) =>
  new Set(picks.filter((p) => compare.has(p.heroSlug)).map((p) => p.heroSlug));

export const analyzePrevDraft = (previousDraft: Game, currentDraft: Game) => {
  // const prevLeftPicks = new Set(
  //   previousDraft.leftTeam.picks.map((p) => p.heroSlug),
  // );

  // const prevRightPicks = new Set(
  //   previousDraft.rightTeam.picks.map((p) => p.heroSlug),
  // );

  const currentLeftPicks = new Set(
    currentDraft.leftTeam.picks.map((p) => p.heroSlug),
  );

  const currentRightPicks = new Set(
    currentDraft.rightTeam.picks.map((p) => p.heroSlug),
  );

  return {
    repeatPick: {
      left: getHeroSet(previousDraft.leftTeam.picks, currentLeftPicks),
      right: getHeroSet(previousDraft.rightTeam.picks, currentRightPicks),
    },
    stolen: {
      left: getHeroSet(previousDraft.leftTeam.picks, currentRightPicks),
      right: getHeroSet(previousDraft.rightTeam.picks, currentLeftPicks),
    },
  };
};

// export const isHeroBanned = (previousHeroes: Set<string>, heroSlug: string) => {
//   return previousHeroes.has(heroSlug);
// };
