import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  useCurrentGame,
  useCurrentMatch,
  useMatchActions,
  useMatchStore,
  useOverlayActions,
  useTeamActions,
} from "@/stores/match-store";
import { useState } from "react";

export default function MatchControls() {
  const [bestOf, setBestOf] = useState<number>();
  const currentMatch = useCurrentMatch();
  const currentGame = useCurrentGame();
  const { swapTeam } = useTeamActions();
  const { initMatch, resetDraft } = useMatchActions();
  const { setShowPrevDraft, setShowChurch } = useOverlayActions();
  const { resetAll, showPrevDraft } = useMatchStore();

  // useEffect(() => {
  //   console.log("game", currentGame);

  //   console.log(currentMatch);
  // }, [currentMatch]);

  const handleInit = () => {
    if (bestOf && bestOf > 0) {
      initMatch(bestOf);
    }
  };

  const handleOpen = (type: "draftpick" | "postdraft") => {
    if (bestOf && bestOf > 0) {
      // const features = [
      //   `width=${window.screen.availWidth}`,
      //   `height=${window.screen.availHeight}`,
      //   `left=0`,
      //   `top=0`,
      //   `resizable=yes`,
      // ].join(",");

      if (type === "draftpick") {
        window.open("/overlay/draftpick", "_blank");
      } else {
        window.open("/overlay/postdraft", "_blank");
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h2>Match Controls</h2>
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row gap-1">
            <Label htmlFor="bo-control">Best of (n) Games</Label>
            <Input
              id="bo-control"
              placeholder="e.g. 3"
              type="number"
              disabled={currentMatch !== undefined}
              className="max-w-25"
              value={bestOf}
              onChange={(e) => {
                const temp = Number(e.target.value);
                if (temp > 0) {
                  setBestOf(temp);
                } else {
                  setBestOf(undefined);
                }
              }}
            />
          </div>
          {currentMatch && (
            <Badge className="h-7 gap-3">
              Game {currentGame}
              <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            </Badge>
          )}
          <Button onClick={() => swapTeam()}>Swap Team</Button>
          <Button onClick={resetDraft}>Reset Draft</Button>
          <Button onClick={resetAll}>Clear All</Button>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Button onClick={setShowPrevDraft}>
            <span
              className={`h-3 w-3 rounded-full ${showPrevDraft ? "bg-green-500" : "bg-red-500"} `}
            />
            Show Previous Draft
          </Button>
          <Button onClick={setShowChurch} className="hidden">
            isChurch
          </Button>
        </div>
      </div>

      {bestOf && currentMatch && (
        <div className="flex flex-row items-center justify-center gap-2">
          <Button size={"sm"} onClick={() => handleOpen("draftpick")}>
            Open DraftPick
          </Button>
          <Button size={"sm"} onClick={() => handleOpen("postdraft")}>
            Open PostDraft
          </Button>
        </div>
      )}

      {bestOf && !currentMatch && (
        <div className="flex flex-col w-full justify-center items-center py-2 gap-2">
          <Separator />
          <Button className="w-fit" onClick={handleInit}>
            Initializing Match
          </Button>
        </div>
      )}
    </div>
  );
}
