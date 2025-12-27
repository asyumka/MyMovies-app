import { useEffect, useRef } from "react";

function OutsideArea({ children, setIsActive }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return <div ref={rootRef}>{children}</div>;
}

export default OutsideArea;
