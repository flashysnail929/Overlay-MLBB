import { heroImages } from "@/stores/heroImages";
import { useCurrentGame, useCurrentMatch } from "@/stores/match-store";
import {
  analyzePrevDraft,
  currentBans,
  currentPicks,
} from "@/utils/analyze-prev-draft";

type PrevDraftCardProps = {
  side: "left" | "right";
};

export default function PrevDraftCard({ side }: PrevDraftCardProps) {
  const match = useCurrentMatch();
  const currentGame = useCurrentGame();
  const currentDraft = match?.games.find((d) => d.gameNumber === currentGame);
  const previousDraft = match?.games.find(
    (d) => d.gameNumber === currentGame - 1,
  );

  if (!match || !previousDraft || !currentDraft) {
    return null;
  }

  const heroPicks = currentPicks(currentDraft);
  const heroBans = currentBans(currentDraft);
  const analyze = analyzePrevDraft(previousDraft, currentDraft);

  return (
    <div className="w-4/12 flex flex-col h-[clamp(192px,24vh,256px)] bg-slate-900/90 p-1.5 gap-1.5 shadow-lg">
      <h3 className="font-sans font-semibold tracking-widest text-center text-sm text-slate-300 drop-shadow">
        DRAFT PICK RECAP - GAME {currentGame - 1}
      </h3>

      {/* Prev Picks */}
      <div
        className={`flex-1 flex border overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]
        ${side === "left" ? "border-team-home/60 bg-team-home/10" : "border-team-away/60 bg-team-away/10 flex-row-reverse"}
        `}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const heroSlug =
            side === "left"
              ? previousDraft.leftTeam.picks[i].heroSlug
              : previousDraft.rightTeam.picks[i].heroSlug;

          const isBanned = heroBans.has(heroSlug);
          const isRepicked =
            side === "left"
              ? analyze.repeatPick.left.has(heroSlug)
              : analyze.repeatPick.right.has(heroSlug);
          const isStolen =
            side === "left"
              ? analyze.stolen.left.has(heroSlug)
              : analyze.stolen.right.has(heroSlug);

          return (
            <div
              key={`${side}-prevpick-${i}`}
              className={`relative flex-1 text-sm overflow-hidden
               ${
                 i !== 4
                   ? side === "left"
                     ? "border-r border-team-home/40"
                     : "border-l border-team-away/40"
                   : ""
               }
                `}
            >
              {/* Info */}
              {isBanned && (
                <>
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/30 via-red-950/60 to-black/80 pointer-events-none" />
                  <div className="absolute inset-0 z-20 shadow-[inset_0_0_32px_rgba(239,68,68,0.5)] pointer-events-none" />
                  <div className="absolute bottom-1 z-30 w-full text-center">
                    <span className="inline-block bg-red-950/90 border border-red-500/60 p-0.5 rounded text-[9px] font-black tracking-wider text-red-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] uppercase">
                      BANNED
                    </span>
                  </div>
                </>
              )}

              {isRepicked && (
                <>
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/25 via-emerald-950/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 z-20 shadow-[inset_0_0_32px_rgba(16,185,129,0.5)] pointer-events-none" />
                  <div className="absolute bottom-1 z-30 w-full text-center">
                    <span className="inline-block bg-emerald-950/90 border border-emerald-400/60 p-0.5 rounded text-[9px] font-black tracking-wider text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] uppercase">
                      REPICK
                    </span>
                  </div>
                </>
              )}

              {isStolen && (
                <>
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/30 via-purple-950/60 to-black/70 pointer-events-none" />
                  <div className="absolute inset-0 z-20 shadow-[inset_0_0_32px_rgba(168,85,247,0.5)] pointer-events-none" />
                  <div className="absolute bottom-1 z-30 w-full text-center">
                    <span className="inline-block bg-purple-950/90 border border-purple-400/60 p-0.5 rounded text-[9px] font-black tracking-wider text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] uppercase">
                      STOLEN
                    </span>
                  </div>
                </>
              )}

              <img
                src={
                  side === "left"
                    ? heroImages[`/src/assets/HeroPick/${heroSlug}.png`]
                    : heroImages[`/src/assets/HeroPick/${heroSlug}.png`]
                }
                alt={`${side}-heroImg-${i}`}
                className={`size-full object-cover object-[center_7%] transition-all duration-300
                  ${
                    isBanned
                      ? "grayscale brightness-75 contrast-125"
                      : isRepicked || isStolen
                        ? "brightness-95 saturate-110"
                        : "brightness-100"
                  }
                  `}
              />
            </div>
          );
        })}
      </div>

      {/* Prev Bans */}
      <div
        className={`flex border h-[clamp(40px,5vh,52px)] 
        ${side === "left" ? "border-team-home/60 bg-team-home/10" : "border-team-away/60 bg-team-away/10 flex-row-reverse"}
        `}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const heroSlug =
            side === "left"
              ? previousDraft.leftTeam.bans[i].heroSlug
              : previousDraft.rightTeam.bans[i].heroSlug;

          const isBanned = heroBans.has(heroSlug);
          const isPicked = heroPicks.has(heroSlug);

          return (
            <div
              key={`${side}-prevban-${i}`}
              className={`relative flex-1 text-xs overflow-hidden
                ${i !== 4 ? (side === "left" ? "border-r border-team-home/40" : "border-l border-team-away/40") : ""}`}
            >
              {isBanned && (
                <>
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/30 via-red-950/60 to-black/70 pointer-events-none" />
                  <div className="absolute inset-0 z-20 shadow-[inset_0_0_24px_rgba(239,68,68,0.7)] pointer-events-none" />
                </>
              )}
              {isPicked && (
                <>
                  {/* Gradient bawah dari amber gelap ke transparan */}
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/30 via-amber-950/60 to-transparent pointer-events-none" />

                  {/* Inner shadow dengan aura warna kuning-emas (Amber-400 / #f59e0b) */}
                  <div className="absolute inset-0 z-20 shadow-[inset_0_0_24px_rgba(245,158,11,0.7)] pointer-events-none" />
                </>
              )}
              <img
                src={heroImages[`/src/assets/HeroPick/${heroSlug}.png`]}
                alt={`${side}-heroImg-${i}`}
                className={`size-[200%] object-cover object-top -translate-y-5.5 transition-all duration-300
                  ${
                    isBanned
                      ? "grayscale brightness-50 contrast-125"
                      : isPicked
                        ? "brightness-90 saturate-120"
                        : "grayscale-70 brightness-75"
                  }
                  `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
