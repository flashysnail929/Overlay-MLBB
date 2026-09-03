import { Separator } from "@/components/ui/separator";
import { HEROES } from "@/stores/heroes";
import {
  useCurrentGame,
  useCurrentMatch,
  useLeftTeam,
  useRightTeam,
} from "@/stores/match-store";
import leftPickIdlePic from "../../../assets/Other/pickbg-left.jpg";
import rightPickIdlePic from "../../../assets/Other/pickbg-right.jpg";
import { heroImages } from "@/stores/heroImages";
import { motion } from "motion/react";

type PickHeroProps = {
  side: "left" | "right";
};

export default function PickHero({ side }: PickHeroProps) {
  const leftTeam = useLeftTeam();
  const rightTeam = useRightTeam();
  const match = useCurrentMatch();
  const currentGame = useCurrentGame();
  const currentDraft = match?.games.find((d) => d.gameNumber === currentGame);

  if (!match || !currentDraft) {
    return null;
  }

  const displayHeroName = (slug: string) => {
    return HEROES.find((h) => h.slug === slug)?.name ?? slug;
  };

  return (
    <div
      className={`w-full flex-5/12 h-[clamp(240px,30vh,320px)] bg-slate-950/90 flex border
                ${side === "left" ? "border-team-home/80 shadow-[0_0_20px_rgba(0,35,125,0.3)] flex-row" : "border-team-away/80 shadow-[0_0_20px_rgba(208,0,0,0.3)] flex-row-reverse"}
    `}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const leftHeroSlug = currentDraft.leftTeam.picks[i].heroSlug;
        const rightHeroSlug = currentDraft.rightTeam.picks[i].heroSlug;

        return (
          <div
            key={`${side}-pick-${i}`}
            className={`flex-1 min-w-0 flex flex-col overflow-hidden
              ${i !== 4 ? (side === "left" ? "border-r border-team-home/50" : "border-l border-team-away/50") : ""}
              `}
          >
            {/* Image */}
            <div className="flex-1 overflow-hidden relative bg-slate-900/60">
              <motion.img
                key={side === "left" ? leftHeroSlug : rightHeroSlug}
                src={
                  side === "left"
                    ? leftHeroSlug === "idle"
                      ? leftPickIdlePic
                      : heroImages[`/src/assets/HeroPick/${leftHeroSlug}.png`]
                    : rightHeroSlug === "idle"
                      ? rightPickIdlePic
                      : heroImages[`/src/assets/HeroPick/${rightHeroSlug}.png`]
                }
                alt={`${side}-heroImg-${i}`}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`size-full object-cover object-[center_25%]`}
              />

              <div
                className={`absolute inset-0 pointer-events-none bg-linear-to-t ${
                  side === "left"
                    ? "from-team-home/40 via-transparent to-transparent"
                    : "from-team-away/40 via-transparent to-transparent"
                }`}
              />
            </div>

            <div
              className={`h-[clamp(34px,3.2vw,44px)] flex flex-col justify-center px-1 border-t backdrop-blur-md relative ${
                side === "left"
                  ? "bg-team-home/35 border-team-accent-yellow/50"
                  : "bg-team-away/35 border-team-accent-yellow/50"
              } `}
            >
              <p className="font-semibold text-[clamp(12px,0.95vw,16px)] px-[clamp(2px,0.3vw,6px)] tracking-wider truncate">
                {side === "left"
                  ? leftHeroSlug !== "idle"
                    ? displayHeroName(leftHeroSlug)
                    : `Hero ${i + 1}`
                  : rightHeroSlug !== "idle"
                    ? displayHeroName(rightHeroSlug)
                    : `Hero ${i + 1}`}
              </p>

              <Separator className="my-px bg-white/20 opacity-25" />

              <p className="text-[clamp(11px,0.8vw,14px)] px-[clamp(2px,0.3vw,6px)] font-medium text-slate-200 truncate">
                {side === "left"
                  ? leftTeam.players[i].nickname !== ""
                    ? leftTeam.players[i].nickname
                    : `Player ${i + 1}`
                  : rightTeam.players[i].nickname !== ""
                    ? rightTeam.players[i].nickname
                    : `Player ${i + 1}`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
