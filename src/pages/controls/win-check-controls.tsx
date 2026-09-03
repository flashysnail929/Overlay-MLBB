import { Checkbox } from "@/components/ui/checkbox";
import { useCurrentMatch } from "@/stores/match-store";

type WinCheckControlsProps = {
  side: "left" | "right";
};

export default function WinCheckControls({ side }: WinCheckControlsProps) {
  const match = useCurrentMatch();
//   const leftScore = match?.games.filter((g) => g.winner === "left");
//   const rightScore = match?.games.filter((g) => g.winner === "right");

  if (!match) {
    return (
      <div className="flex flex-col w-full items-center">
        <p>
          <span className="font-semibold">Win Check Controls</span>
          tidak bisa digunakan karena masih belum ada match
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* <h2>Win Check Controls</h2> */}

      <p>{side === "left" ? "Left" : "Right"} Team</p>
      <div className="flex flex-row items-center gap-3">
        {Array.from({ length: match.bestOf }).map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <p>Game {i + 1}</p>
            <Checkbox checked={match.games[i].winner === side} />
          </div>
        ))}

        {/* <p>Game 1</p>
        <Checkbox /> */}
      </div>
    </div>
  );
}
