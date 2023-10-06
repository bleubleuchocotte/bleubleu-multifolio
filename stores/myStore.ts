import Lenis from "@studio-freight/lenis";
import { defineStore } from "pinia";

export const useWebsiteStore = defineStore("website", () => {
  const isMobile = useMediaQuery("(max-width: 1025px)");

  const lenisInstance = ref<Lenis>();

  return { isMobile, lenisInstance };
});
