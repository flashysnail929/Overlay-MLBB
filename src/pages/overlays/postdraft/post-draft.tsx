import PostdraftBG from "../../../assets/postdraft-bg.png";
import PostDraftCard from "./post-draft-card";

import versus from "../../../assets/Other/versus_colored.png";
import {
  useCurrentGame,
  useCurrentMatch,
  useMatchScore,
} from "@/stores/match-store";
import type { Match } from "@/models/match";
import { getScoreRows } from "@/utils/score-row";

export default function PostDraft() {
  const currentMatch = useCurrentMatch();
  const currentGame = useCurrentGame();
  const scores = useMatchScore();

  if (!currentMatch) {
    return (
      <div>
        <h1>No Match</h1>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-full mx-auto text-white font-sans">
      {/* Background Image */}
      <img
        src={PostdraftBG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="z-10 my-auto p-6 flex-1 flex flex-row justify-between items-stretch gap-[clamp(2px,0.35vw,6px)]">
        {/* Left */}
        <PostDraftCard side="left" />
        {/* Mid */}
        <div className="flex-2/12 w-full flex flex-col items-center text-center gap-6">
          <div className="h-2/12 w-full">
            <div className="mb-4 text-2xl font-semibold">
              <h2>BEST OF {currentMatch.bestOf}</h2>
              <p>GAME {currentGame}</p>
            </div>

            {/* Footer Score */}
            <div className="flex flex-row justify-between items-end gap-2">
              {/* Left Team Score */}
              <FilledScoreRows
                currentMatch={currentMatch}
                score={scores.leftTeam}
                side="left"
              />
              {/* <div className="">
                <h2>BEST OF {currentMatch.bestOf}</h2>
                <p>MATCH {currentGame}</p>
              </div> */}
              {/* Right Team Score */}
              <FilledScoreRows
                currentMatch={currentMatch}
                score={scores.rightTeam}
                side="right"
              />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={versus} alt="" className="animate-pulse" />
          </div>
        </div>
        {/* Right */}
        <PostDraftCard side="right" />
      </div>
    </div>
  );
}

function FilledScoreRows({
  currentMatch,
  score,
  side,
}: {
  currentMatch: Match;
  score: number;
  side: "left" | "right";
}) {
  const rows = getScoreRows(currentMatch.bestOf);

  return rows.map((count, rowIndex) => {
    // Jumlah kotak pada semua row di bawah row saat ini
    const boxesBelow = rows.slice(rowIndex + 1).reduce((sum, n) => sum + n, 0);

    return (
      <div key={rowIndex} className="flex flex-row-reverse gap-0.5">
        {Array.from({ length: count }).map((_, i) => {
          let filled: boolean = false;
          if (side === "left") {
            filled = boxesBelow + (count - 1 - i) < score;
          } else {
            filled = filled = boxesBelow + i < score;
          }

          return (
            <div
              key={i}
              className={`w-6 h-3 border border-white ${
                filled ? "bg-white" : ""
              }`}
            />
          );
        })}
      </div>
    );
  });
}
