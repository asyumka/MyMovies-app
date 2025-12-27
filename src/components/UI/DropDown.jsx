import OutsideArea from "../Layout/OutsideArea";
import classes from "./DropDown.module.css";
import { useState } from "react";

function DropDown({ title, list, renderItem }) {
  const [isActive, setIsActive] = useState(false);

  function toggleDropActive() {
    setIsActive((prev) => !prev);
  }

  return (
    <OutsideArea setIsActive={setIsActive}>
      <div className={classes.drop}>
        <button
          className={`${classes["drop-btn"]} ${
            isActive ? classes["active"] : ""
          }`}
          onClick={toggleDropActive}
        >
          {title}
        </button>
        <div
          className={`${classes["dropped-block"]} ${
            isActive ? classes["active"] : ""
          }`}
        >
          {list.length !== 0 ? (
            <ul className={classes["dropped-list"]}>
              {list.map((item) => (
                <li
                  key={item.id}
                  className={classes["dropped-list-item"]}
                  onClick={() => setIsActive(false)}
                >
                  {renderItem(item)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No item in list</p>
          )}
        </div>
      </div>
    </OutsideArea>
  );
}

export default DropDown;
