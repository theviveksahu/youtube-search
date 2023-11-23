import React from "react";
import styles from "./suggestions.module.css";

export const Suggestions = ({ suggestions, handleClick }) => {
  return (
    <ul className={styles.suggestions}>
      {suggestions.map((suggestion, idx) => {
        return (
          <li key={idx} onClick={handleClick}>
            {suggestion}
          </li>
        );
      })}
    </ul>
  );
};
