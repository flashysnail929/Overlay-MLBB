import type { DraftTeam } from "@/models/match";

export const isDraftComplete = (draft: DraftTeam) =>
  [...draft.bans, ...draft.picks].every(
    (slot) => slot.heroSlug !== "idle"
  );