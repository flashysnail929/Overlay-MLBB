import { useMatchStore } from "@/stores/match-store";
import PrevDraftCard from "./prev-draft-card";

export default function PrevDraft() {
  const { showPrevDraft } = useMatchStore();

  return (
    <>
      {showPrevDraft && (
        <div className="flex flex-row justify-between w-full mx-auto text-white font-sans">
          <PrevDraftCard side="left" />
          <PrevDraftCard side="right" />
        </div>
      )}
    </>
  );
}
