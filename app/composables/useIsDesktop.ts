type Options = {
  /**
   * Min-width media query used after hydration to track viewport changes.
   * Defaults to the project's lg breakpoint (1025px).
   */
  minWidth?: string;
};

/**
 * Resolve "is the user on a desktop layout?" in an SSR-safe way.
 *
 * - On the server: read the User-Agent via `useDevice()` so the first paint
 *   already renders the right variant (no FOUC, no hydration mismatch).
 * - After mount: switch to a viewport media query so resizing the window
 *   below the breakpoint flips the layout, preserving the resize-reactive
 *   behaviour the previous `useMediaQuery` setup offered.
 */
export function useIsDesktop(options: Options = {}) {
  const { minWidth = "(min-width: 1025px)" } = options;
  const { isMobile, isTablet } = useDevice();

  const isDesktop = ref(!isMobile && !isTablet);

  onMounted(() => {
    const matches = useMediaQuery(minWidth);
    watch(matches, (v) => (isDesktop.value = v), { immediate: true });
  });

  return isDesktop;
}
