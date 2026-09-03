import {
  useCurrentGame,
  useCurrentMatch,
  useLeftTeam,
  useRightTeam,
} from "@/stores/match-store";
import BanPNG from "../../../assets/Other/ban.png";
import { heroImages } from "@/stores/heroImages";
import { motion } from "motion/react";

export default function BanBar() {
  const leftTeam = useLeftTeam();
  const rightTeam = useRightTeam();
  const match = useCurrentMatch();
  const currentGame = useCurrentGame();
  const currentDraft = match?.games.find((d) => d.gameNumber === currentGame);

  if (!currentGame || !currentDraft) {
    return null;
  }

  return (
    <div
      className="w-full
      flex
      items-stretch
      justify-between
      h-[clamp(48px,5vw,64px)]
      gap-[clamp(2px,0.3vw,6px)]
      text-center"
    >
      <div className="w-5/12 flex flex-row justify-between border-x border-t border-team-home/70 bg-slate-950/90 shadow-[0_0_15px_rgba(0,36,124,0.3)]">
        <div className="flex flex-1 bg-team-home justify-center items-center">
          <h1 className="font-semibold text-[clamp(24px,1.2vw,32px)] uppercase">
            {leftTeam.name === "" ? "BLUE TEAM" : leftTeam.name}
          </h1>
        </div>
        <div className="flex shrink-0 h-full overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => {
            const heroSlug = currentDraft.leftTeam.bans[i].heroSlug;
            return (
              <div
                key={`left-ban-${i}`}
                className={`h-full aspect-square bg-slate-900 overflow-hidden
                  ${i !== 4 && "border-r border-team-home/50"}
                  `}
              >
                <motion.img
                  key={heroSlug}
                  src={
                    heroSlug !== "idle"
                      ? heroImages[`/src/assets/HeroPick/${heroSlug}.png`]
                      : BanPNG
                  }
                  alt={`Ban ${i + 1}`}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`size-full object-cover
                    ${heroSlug !== "idle" ? "grayscale brightness-75 contrast-125 scale-[1.25] object-[center_5%]" : "opacity-70 p-1.5"} `}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-2/12 px-4 border flex justify-center items-center opacity-0">
        <h1>SPONSOR</h1>
      </div>
      <div className="w-5/12 flex flex-row-reverse justify-between border-x border-t border-team-away/70 bg-slate-950/90 shadow-[0_0_15px_rgba(208,0,0,0.3)]">
        <div className="flex flex-1 bg-team-away justify-center items-center ">
          <h1 className="font-semibold text-[clamp(24px,1.2vw,32px)] uppercase">
            {rightTeam.name === "" ? "RED TEAM" : rightTeam.name}
          </h1>
        </div>
        <div className="flex flex-row-reverse shrink-0 h-full">
          {Array.from({ length: 5 }).map((_, i) => {
            const heroSlug = currentDraft.rightTeam.bans[i].heroSlug;
            return (
              <div
                key={`left-ban-${i}`}
                className={`h-full aspect-square bg-slate-900 overflow-hidden
                  ${i !== 4 && "border-l border-team-away/50"}
                  `}
              >
                <motion.img
                  key={heroSlug}
                  src={
                    heroSlug !== "idle"
                      ? heroImages[`/src/assets/HeroPick/${heroSlug}.png`]
                      : BanPNG
                  }
                  alt={`Ban ${i + 1}`}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`size-full object-cover
                    ${heroSlug !== "idle" ? "grayscale brightness-75 contrast-125 scale-[1.25] object-[center_5%]" : "opacity-70 p-1.5"} `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
