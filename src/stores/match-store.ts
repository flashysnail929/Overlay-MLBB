import { createEmptyGame, createEmptyMatch, type Match } from "@/models/match";
import { createEmptyTeam, type Team } from "@/models/team";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import { channel } from "./broadcast";
import { isDraftComplete } from "@/utils/is-draft-complete";
import { toast } from "@/components/ui/toast";

interface MatchState {
  leftTeam: Team;
  rightTeam: Team;
  teamActions: TeamActions;

  currentMatch?: Match;
  currentGame: number;
  matchActions: MatchActions;

  showPrevDraft: boolean;
  showChurch: boolean;
  overlayActions: OverlayActions;

  resetAll: () => void;
}

interface TeamActions {
  updateLeftTeam: (data: Partial<Team>) => void;
  updateRightTeam: (data: Partial<Team>) => void;

  swapTeam: () => void;
  resetAllTeam: () => void;
}

interface MatchActions {
  initMatch: (bestOf: number) => void;
  // setCurrentGame: (gameNumber: number) => void;
  setDraftForGame: (
    side: "leftTeam" | "rightTeam",
    type: "picks" | "bans",
    index: number,
    heroSlug: string,
  ) => void;
  resetDraft: () => void;
  //   nextGame: () => void;
  setWinner: (side: "left" | "right") => void;
  resetMatch: () => void;
}

interface OverlayActions {
  setShowPrevDraft: () => void;
  setShowChurch: () => void;
}

export const getSyncState = (state: MatchState) => ({
  leftTeam: state.leftTeam,
  rightTeam: state.rightTeam,
  currentMatch: state.currentMatch,
  currentGame: state.currentGame,
  showPrevDraft: state.showPrevDraft,
  showChurch: state.showChurch,
});

export const useMatchStore = create<MatchState>()(
  persist(
    (set, get) => ({
      leftTeam: createEmptyTeam(),
      rightTeam: createEmptyTeam(),
      currentMatch: undefined,
      currentGame: 1,

      showPrevDraft: false,
      showChurch: false,

      teamActions: {
        updateLeftTeam(data) {
          set((state) => ({
            leftTeam: {
              ...state.leftTeam,
              ...data,
            },
          }));

          channel.postMessage(getSyncState(useMatchStore.getState()));
        },

        updateRightTeam(data) {
          set((state) => ({
            rightTeam: {
              ...state.rightTeam,
              ...data,
            },
          }));

          channel.postMessage(getSyncState(useMatchStore.getState()));
        },

        swapTeam() {
          set((state) => {
            const currentMatch = state.currentMatch;
            if (!currentMatch) return state;

            return {
              leftTeam: state.rightTeam,
              rightTeam: state.leftTeam,
              currentMatch: {
                ...currentMatch,
                games: currentMatch.games.map((game) => ({
                  ...game,
                  leftTeam: game.rightTeam,
                  rightTeam: game.leftTeam,
                  winner:
                    game.winner === "left"
                      ? "right"
                      : game.winner === "right"
                        ? "left"
                        : undefined,
                })),
              },
            };
          });
          channel.postMessage(getSyncState(useMatchStore.getState()));
        },

        resetAllTeam() {
          set({ leftTeam: createEmptyTeam(), rightTeam: createEmptyTeam() });
        },
      },
      matchActions: {
        initMatch(bestOf) {
          set({ currentMatch: createEmptyMatch({ bestOf: bestOf }) });

          channel.postMessage(getSyncState(useMatchStore.getState()));
        },

        // setCurrentGame(gameNumber) {},
        setDraftForGame(side, type, index, heroSlug) {
          set((state) => {
            const currentMatch = state.currentMatch;
            if (!currentMatch) return state;

            const games = [...currentMatch.games];
            const game = { ...games[state.currentGame - 1] };

            const team = {
              ...game[side],
              [type]: [...game[side][type]],
            };

            team[type][index] = {
              ...team[type][index],
              heroSlug,
            };

            game[side] = team;
            games[state.currentGame - 1] = game;

            return {
              currentMatch: {
                ...currentMatch,
                games,
              },
            };
          });

          channel.postMessage(getSyncState(useMatchStore.getState()));
        },
        resetDraft() {
          set((state) => {
            if (!state.currentMatch) return state;

            const games = [...state.currentMatch.games];

            games[state.currentGame - 1] = createEmptyGame(state.currentGame);

            return {
              currentMatch: {
                ...state.currentMatch,
                games,
              },
            };
          });
          channel.postMessage(getSyncState(useMatchStore.getState()));
        },
        setWinner(side) {
          const state = get();

          if (!state.currentMatch) return;

          const game = state.currentMatch.games.find(
            (g) => g.gameNumber === state.currentGame,
          );

          if (!game) return;

          if (
            !isDraftComplete(game.leftTeam) ||
            !isDraftComplete(game.rightTeam)
          ) {
            toast.add({
              type: "warning",
              description:
                "Draft belum selesai. Silahkan cek kembali Picks dan Bans kedua team.",
            });

            return;
          }

          set((state) => ({
            currentMatch: {
              ...state.currentMatch!,
              games: state.currentMatch!.games.map((g) =>
                g.gameNumber === state.currentGame ? { ...g, winner: side } : g,
              ),
            },
            currentGame: state.currentGame + 1,
          }));

          channel.postMessage(getSyncState(useMatchStore.getState()));
        },
        resetMatch() {
          set({ currentMatch: undefined });
        },
      },

      overlayActions: {
        setShowPrevDraft() {
          set((state) => ({
            showPrevDraft: !state.showPrevDraft,
          }));
          channel.postMessage(getSyncState(useMatchStore.getState()));
        },
        setShowChurch() {
          set((state) => ({
            showChurch: !state.showChurch,
          }));
          channel.postMessage(getSyncState(useMatchStore.getState()));
        },
      },

      resetAll() {
        useMatchStore.setState(state => ({...state, currentGame: 1}), true )
        get().teamActions.resetAllTeam();
        get().matchActions.resetMatch();
        useMatchStore.persist.clearStorage();

        channel.postMessage(getSyncState(useMatchStore.getState()));
      },
    }),
    {
      name: "mlbb-overlay",
      partialize: (state) => ({
        leftTeam: state.leftTeam,
        rightTeam: state.rightTeam,
        currentMatch: state.currentMatch,
        currentGame: state.currentGame,
        showPrevDraft: state.showPrevDraft,
        showChurch: state.showChurch,
      }),
    },
  ),
);

// Teams
export const useLeftTeam = () => useMatchStore((state) => state.leftTeam);
export const useRightTeam = () => useMatchStore((state) => state.rightTeam);
export const useTeamActions = () => useMatchStore((state) => state.teamActions);

// Match
export const useCurrentMatch = () =>
  useMatchStore((state) => state.currentMatch);
export const useCurrentGame = () => useMatchStore((state) => state.currentGame);
export const useMatchActions = () =>
  useMatchStore((state) => state.matchActions);

// Overlay
export const useOverlayState = () =>
  useMatchStore(
    useShallow((state) => ({
      showPrevDraft: state.showPrevDraft,
      showChurch: state.showChurch,
    })),
  );

export const useOverlayActions = () =>
  useMatchStore((state) => state.overlayActions);

// Reset All
export const resetStore = () => useMatchStore((state) => state.resetAll);

// Get Score {leftTeam: number, rightTeam: number}
export const useMatchScore = () =>
  useMatchStore(
    useShallow(
      (state) =>
        state.currentMatch?.games.reduce(
          (score, game) => {
            if (game.winner === "left") score.leftTeam++;
            if (game.winner === "right") score.rightTeam++;

            return score;
          },
          { leftTeam: 0, rightTeam: 0 },
        ) ?? { leftTeam: 0, rightTeam: 0 },
    ),
  );
