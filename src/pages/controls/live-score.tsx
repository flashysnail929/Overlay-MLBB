import { useLeftTeam, useMatchScore, useRightTeam } from "@/stores/match-store";

export default function LiveScore() {
  const leftTeam = useLeftTeam();
  const rightTeam = useRightTeam();
  const scores = useMatchScore();
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Live Score</h2>
      <div className="flex justify-center items-center gap-3">
        <p>{leftTeam.name === "" ? "Left Team" : leftTeam.name}</p>

        <p>
          {scores.leftTeam} - {scores.rightTeam}
        </p>

        <p>{rightTeam.name === "" ? "Right Team" : rightTeam.name}</p>
      </div>
    </div>
  );
}
