import { create } from 'zustand';

export const  languageMapping = {
    "en-US": "English (USA)",
    "en-UK": "English",
    "fr": "France",
    "es": "Spanish"
}

const Settings = (set: any, get: any) => ({
    language: 'en-US',

    setLanguage: (language: string) => {
      set((state: any) => ({ language: language }));
    },

    getLanguage: () => get().language
  });

const useStore = create((set, get) => ({
    ...Settings(set, get),
  }));
  
export default useStore;