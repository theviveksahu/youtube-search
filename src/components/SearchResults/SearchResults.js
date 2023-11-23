import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchResults.module.css";

export const SearchResults = ({ results, setPage }) => {
  const [lastElement, setLastElement] = useState(null);

  //Infinite Scrolling
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    const current = lastElement;
    const currentObserver = observer.current;
    if (current) {
      currentObserver.observe(current);
    }
    return () => {
      if (current) {
        currentObserver.unobserve(current);
      }
    };
  }, [lastElement]);

  return (
    <div className={styles["list-wrapper"]}>
      {results.map((video, iDX) => {
        const isLastElement = results.length === iDX + 1;
        return isLastElement ? (
          <div className={styles["list-item"]} key={iDX} ref={setLastElement}>
            <div>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
            </div>
            <div className={styles["video-info"]}>
              <div>{video.snippet.title}</div>
              <div>{video.snippet.channelTitle}</div>
              <div>{video.snippet.description}</div>
            </div>
          </div>
        ) : (
          <div className={styles["list-item"]} key={iDX}>
            <div>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
            </div>
            <div className={styles["video-info"]}>
              <div>{video.snippet.title}</div>
              <div>{video.snippet.channelTitle}</div>
              <div>{video.snippet.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
