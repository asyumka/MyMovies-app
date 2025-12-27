import { useState } from "react";
import classes from "./SlicedText.module.css";

function SlicedText({ children, contentLength, maxLength }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  return (
    <>
      <div
        className={`${classes.commentText} ${
          !isExpanded ? classes.clamped : ""
        }`}
      >
        {children}
      </div>
      {contentLength > maxLength && (
        <button className={classes.toggleBtn} onClick={toggleReadMore}>
          {isExpanded ? "Close" : "Read more..."}
        </button>
      )}
    </>
  );
}

export default SlicedText;
