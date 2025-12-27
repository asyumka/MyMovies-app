import { createContext, useContext, useRef, useState } from "react";
import screenfull from "../../node_modules/screenfull/index";

const FullScreenContext = createContext();

export const useFullScreen = () => {
  return useContext(FullScreenContext);
};

export const FullScreenContainer = ({ children, className }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      setIsFullScreen((prev) => !prev);
      screenfull.toggle(containerRef.current);
    }
  };

  return (
    <FullScreenContext.Provider value={{ toggleFullScreen, isFullScreen }}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </FullScreenContext.Provider>
  );
};
