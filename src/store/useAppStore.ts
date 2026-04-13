import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LearningMode = "text" | "audio" | "video" | "spatial";
export type LearnerProfile = {
  preferredMode: LearningMode;
  pace: "slow" | "medium" | "fast";
  style: "visual" | "auditory" | "reading" | "kinesthetic";
  subjects: string[];
  onboardingComplete: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  profile: LearnerProfile;
  xp: number;
  streak: number;
  joinedAt: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  mode?: LearningMode;
};

type AppState = {
  user: User | null;
  isLoading: boolean;
  currentMode: LearningMode;
  chatHistory: ChatMessage[];
  onboardingStep: number;

  setUser: (user: User | null) => void;
  setLoading: (v: boolean) => void;
  setCurrentMode: (mode: LearningMode) => void;
  addMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
  setOnboardingStep: (step: number) => void;
  updateProfile: (updates: Partial<LearnerProfile>) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      currentMode: "text",
      chatHistory: [],
      onboardingStep: 0,

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setCurrentMode: (currentMode) => set({ currentMode }),
      addMessage: (msg) =>
        set((s) => ({ chatHistory: [...s.chatHistory, msg] })),
      clearChat: () => set({ chatHistory: [] }),
      setOnboardingStep: (onboardingStep) => set({ onboardingStep }),
      updateProfile: (updates) =>
        set((s) =>
          s.user
            ? { user: { ...s.user, profile: { ...s.user.profile, ...updates } } }
            : {}
        ),
    }),
    {
      name: "marlos-store",
      partialize: (s) => ({
        user: s.user,
        currentMode: s.currentMode,
        onboardingStep: s.onboardingStep,
      }),
    }
  )
);
