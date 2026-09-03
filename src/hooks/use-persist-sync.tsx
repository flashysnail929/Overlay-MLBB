// used when don't use broadcast channel, only hydrate storage

import { useMatchStore } from "@/stores/match-store";
import { useEffect } from "react";

export function usePersistSync() {
  useEffect(() => {
    const sync = () => {
      useMatchStore.persist.rehydrate();
    };

    window.addEventListener("storage", sync);

    return () => window.removeEventListener("storage", sync);
  }, []);
}
