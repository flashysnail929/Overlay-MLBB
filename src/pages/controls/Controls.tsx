import { Separator } from "@/components/ui/separator";
import FormControls from "./form-controls";
import MatchControls from "./match-controls";
import {
  useCurrentGame,
  useCurrentMatch,
  useMatchActions,
} from "@/stores/match-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import LiveScore from "./live-score";

export default function Controls() {
  const match = useCurrentMatch();
  const currentGame = useCurrentGame();
  const { setWinner } = useMatchActions();

  return (
    <div className="h-[calc(100%-52px)]">
      <ScrollArea className="h-full">
        <div className="flex flex-col space-y-3 pr-4">
          <h1>Control</h1>

          {/* Match Controls */}
          <MatchControls />

          {match && (
            <>
              <Separator />

              <LiveScore />

              {/* Win Check */}
              {/* <div className="flex flex-col w-full">
                <h2>Win Check Controls</h2>
                <div className="flex flex-row items-center w-full gap-3">
                  <WinCheckControls side="left" />
                  <WinCheckControls side="right" />
                </div>
              </div> */}

              <Separator />

              {/* Team & Draft */}
              <div className="flex flex-col w-full">
                <h2>Team & Draft Controls</h2>
                <div className="flex flex-row w-full gap-3">
                  <FormControls side="left" />
                  <Separator orientation="vertical" />
                  <FormControls side="right" />
                </div>
                <div className="flex flex-row w-full justify-center mt-4 gap-3">
                  {currentGame !== match.bestOf ||
                  currentGame === match.bestOf ? (
                    <>
                      <Button onClick={() => setWinner("left")}>
                        Left Team Win
                      </Button>
                      <Button onClick={() => setWinner("right")}>
                        Right Team Win
                      </Button>
                    </>
                  ) : (
                    <Button>Next Match</Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
