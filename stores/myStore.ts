import { defineStore } from "pinia";

export const useWebsiteStore = defineStore("website", () => {
  const isMobile = useMediaQuery("(max-width: 1025px)");

  return { isMobile };
});
