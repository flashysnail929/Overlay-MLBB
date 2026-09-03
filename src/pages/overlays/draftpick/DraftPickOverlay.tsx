import DraftPick from "./draft-pick";
import { channel } from "@/stores/broadcast";
import { useMatchStore } from "@/stores/match-store";
import { useEffect } from "react";
import PrevDraft from "./prev-draft";

export default function DraftPickOverlay() {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // console.log("receive", event.data);
      useMatchStore.setState(event.data);
    };

    channel.addEventListener("message", handler);

    return () => {
      channel.removeEventListener("message", handler);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center  space-y-4">
      {/* <h1>Overlay</h1> */}
      <div className="w-full mx-auto max-w-[1920px] flex flex-col gap-[clamp(8px,1vh,16px)] border-2 border-dashed px-2 py-4 h-full justify-end bg-green-500">
        <PrevDraft />
        <DraftPick />
      </div>
    </div>
  );
}
