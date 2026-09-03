import {
  useCurrentGame,
  useCurrentMatch,
  useLeftTeam,
  useMatchScore,
  useOverlayState,
  useRightTeam,
} from "@/stores/match-store";
import BanBar from "./ban-bar";
import PickHero from "./pick-hero";
import { getScoreRows } from "@/utils/score-row";
import type { Match } from "@/models/match";
import KSWLogo from "@/assets/logo-ksw.png";

export default function DraftPick() {
  const leftTeam = useLeftTeam();
  const rightTeam = useRightTeam();
  const currentMatch = useCurrentMatch();
  const currentGame = useCurrentGame();
  const { showChurch } = useOverlayState();
  const scores = useMatchScore();

  if (!currentMatch) {
    return (
      <div>
        <h1>No Match</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full mx-auto text-white font-sans">
      {/* Title / Header */}
      {/* <h1 className="text-2xl font-black tracking-widest text-center uppercase mb-4 text-[#5DC3AB] drop-shadow-[0_0_10px_rgba(93,195,171,0.5)]">
        Draft Pick
      </h1> */}

      {/* Main Container */}
      <div className="bg-green-500 backdrop-blur-md">
        {/* Component: Previous Ban & Pick */}
        {/* <PreviousBanPick /> */}

        {/* Current Ban & Pick / Church Section */}
        {showChurch && (
          <div
            className={`flex flex-row justify-between items-center gap-[clamp(2px,0.3vw,6px)] mb-0.5 
            `}
          >
            {/* Church Left */}
            <div className="w-5/12 border-t-2 border-x-2 border-[#3267B1] bg-[#3267B1] rounded-t-md text-center py-1 font-bold text-sm text-[#5DC3AB] uppercase tracking-wider">
              {leftTeam.church?.name === ""
                ? "Church Left"
                : leftTeam.church?.name}
            </div>

            {/* Spacer Center */}
            <div className="w-2/12 px-2 opacity-0" />

            {/* Church Right */}
            <div className="w-5/12 border-t-2 border-x-2 border-[#F36F36] bg-[#F36F36] rounded-t-md text-center py-1 font-bold text-sm text-[#F7D232] uppercase tracking-wider">
              {rightTeam.church?.name === ""
                ? "Church Right"
                : rightTeam.church?.name}
            </div>
          </div>
        )}

        {/* Team / Ban Bar Section */}
        <BanBar />

        {/* Hero Cards & Center Match Info */}
        <div className="w-full flex flex-row justify-between items-stretch text-center gap-[clamp(2px,0.35vw,6px)]">
          {/* Hero Cards Left (Blue Team) */}
          {/* <div className="w-5/12 rounded-b-md flex flex-row justify-between gap-2 h-48 bg-slate-950/40 p-2 border border-[#3267B1]/30 rounded-lg"></div> */}
          <PickHero side="left" />

          {/* Middle Info / Score Box */}
          <div className="w-2/12 flex flex-col justify-between">
            <div className="mt-auto bg-gradient-to-b from-slate-900 to-slate-950 h-[clamp(200px,28vh,264px)] p-1 flex flex-col justify-between relative overflow-hidden">
              {/* Top Accent Line */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-[#5DC3AB]" /> */}

              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#F7D232] border-b border-slate-800 pb-2">
                KESATRIAN SPORTS WEEK 2026
                <span className="block">- MLBB -</span>
              </h3>

              {/* Mid Logo & VS */}
              <div className="flex flex-row justify-center items-center my-auto gap-2">
                <img
                  src={KSWLogo}
                  alt="ksw logo"
                  className="h-[90px] w-auto object-contain"
                />
                {/* Blue Team Logo Info */}
                {/* <div className="flex flex-col items-center flex-1">
                  <div className="w-10 h-10 bg-[#3267B1]/20 border border-[#3267B1] rounded-full flex items-center justify-center mb-1 text-xs font-bold text-[#5DC3AB]">
                    BLUE
                  </div>
                  <p className="text-[11px] font-bold truncate max-w-[70px]">
                    Blue Team
                  </p>
                </div> */}

                {/* VS Divider */}
                {/* <span className="text-lg font-black italic text-[#F36F36] drop-shadow">
                  VS
                </span> */}

                {/* Red Team Logo Info */}
                {/* <div className="flex flex-col items-center flex-1">
                  <div className="w-10 h-10 bg-[#F36F36]/20 border border-[#F36F36] rounded-full flex items-center justify-center mb-1 text-xs font-bold text-[#F7D232]">
                    RED
                  </div>
                  <p className="text-[11px] font-bold truncate max-w-[70px]">
                    Red Team
                  </p>
                </div> */}
              </div>

              <div className="mb-0">
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
              {/* <div className="mt-auto bg-slate-950/80 border border-slate-800 rounded py-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                SCORE
              </span>
              <span className="text-xl font-extrabold text-[#5DC3AB]">
                0 - 0
              </span>
            </div> */}
            </div>

            <div className="mt-auto p-1 bg-slate-900">
              <p>OMK PRR</p>
            </div>
          </div>

          {/* Hero Cards Right (Red Team) */}
          {/* <div className="w-5/12 rounded-b-md flex flex-row justify-between gap-2 h-48 bg-slate-950/40 p-2 border border-[#F36F36]/30 rounded-lg"></div> */}
          <PickHero side="right" />
        </div>
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
