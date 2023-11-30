import { create } from 'zustand';
import messages from "../messages.json";

export const  languageMapping = {
    "en-US": "English (USA)",
    "en-UK": "English",
    "fr": "France",
    "es": "Spanish"
}

const Settings = (set: any, get: any) => ({
    language: 'en-US',

    setLanguage: (lang: string) => {
      set({ language: lang});
    },

    getLanguage: () => get().language
  });

const useStore = create((set, get) => ({
    ...Settings(set, get),
  }));
  
export default useStore;