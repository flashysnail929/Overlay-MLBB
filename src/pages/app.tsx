import { Separator } from "@/components/ui/separator";
import Overlays from "./overlays/draftpick/DraftPickOverlay";
import Controls from "./controls/Controls";

export default function App() {

  return (
    <div className="flex flex-col h-screen w-full bg-gray-700 p-2 space-y-2 overflow-hidden">
      {/* Main Overlay */}
      <Overlays />

      {/* Overlay Controls */}
      <div className="min-h-0 flex-1">
        <Controls />
      </div>

      <div className="mt-auto space-y-4 flex flex-col items-center">
        <Separator />

        <p className="">Flashysnail</p>
      </div>
    </div>
  );
}
