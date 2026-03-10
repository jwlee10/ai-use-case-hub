import { useState, useCallback, createContext, useContext, ReactNode } from "react";
import { UseCase } from "@/data/useCases";
import { UserUseCase, addUserUseCase, getUserUseCases } from "@/data/userUseCases";

interface AppState {
  likedIds: Set<string>;
  toggleLike: (id: string) => void;
  myUseCases: UserUseCase[];
  submitUseCase: (uc: UserUseCase) => void;
}

const AppStateContext = createContext<AppState | null>(null);

// Pre-seed liked IDs (use cases 1, 3, 5, 7)
const INITIAL_LIKED = new Set(["1", "3", "5", "7"]);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [likedIds, setLikedIds] = useState<Set<string>>(INITIAL_LIKED);
  const [myUseCases, setMyUseCases] = useState<UserUseCase[]>(() => getUserUseCases());

  const toggleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const submitUseCase = useCallback((uc: UserUseCase) => {
    addUserUseCase(uc);
    setMyUseCases([...getUserUseCases()]);
  }, []);

  return (
    <AppStateContext.Provider value={{ likedIds, toggleLike, myUseCases, submitUseCase }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
