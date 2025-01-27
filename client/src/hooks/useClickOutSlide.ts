import { useEffect } from "react";

/**
 * Custom hook to detect click outside of an element
 * @param ref - The reference to the element to monitor
 * @param onClickOutside - The callback function to trigger when a click outside occurs
 */
function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void
) {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export default useClickOutside;
