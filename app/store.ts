import { create } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const languageMapping = {
  "en-US": "English (USA)",
  "en-UK": "English",
  fr: "France",
  es: "Spanish",
};

const Settings = (set: any, get: any) => ({
  language: "en-US",

  setLanguage: (language: string) => {
    set((state: any) => ({ language: language }));
  },

  getLanguage: () => get().language,
});

const useStore = create((set, get) => ({
  ...Settings(set, get),
  supabase: createClientComponentClient(),
}));

export default useStore;
