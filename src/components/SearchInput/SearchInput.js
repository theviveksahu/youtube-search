import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchInput.module.css";
import Search from "../../assets/images/search.svg";
import Youtube from "../../assets/images/youtube.svg";
import { SUGGESTIONS_URL, SEARCH_URL } from "../../constants";
import { Suggestions } from "../Suggestions/Suggestions";

export const SearchInput = ({ setSearchResults, page, setLoading }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const timerId = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResults([]);
    fetchVideos(searchText);
  };

  const handleClick = (e) => {
    const keyword = e.target.innerText;
    setSuggestions([]);
    setSearchResults([]);
    setSearchText(keyword);
    setSuggestionsActive(false);
    fetchVideos(keyword);
  };

  const fetchVideos = async (keyword) => {
    setLoading(true);
    let url = SEARCH_URL + keyword;
    if (page !== 1) {
      url = url + `&pageToken=${pageToken}`;
    }

    try {
      const res = await fetch(url);
      const result = await res.json();
      setSearchResults((prev) => [...prev, ...result.items]);
      setPageToken(result.nextPageToken);
    } catch (error) {
      console.error(error);
    } finally {
      setSuggestionsActive(false);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchText(val);
    if (val === "") {
      setSuggestionsActive(false);
      return;
    } else {
      getSuggestionsDebounced(val);
    }
  };

  const debounce = (fn, delay) => {
    return (...args) => {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };

  const fetchSuggestions = async (searchText) => {
    try {
      const res = await fetch(SUGGESTIONS_URL + searchText);
      const result = await res.json();
      setSuggestions(result[1]);
    } catch (error) {
      console.error(error);
    } finally {
      setSuggestionsActive(true);
    }
  };

  const getSuggestionsDebounced = debounce(fetchSuggestions, 500);

  useEffect(() => {
    if (page !== 1) fetchVideos(searchText);
  }, [page]);

  return (
    <div className={styles.wrapper}>
      <img src={Youtube} alt="youtube-logo" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
            value={searchText}
            onChange={handleChange}
          />
          <button type="submit" name="search">
            <img src={Search} alt="Search" />
          </button>
        </div>
      </form>
      {suggestionsActive && (
        <Suggestions suggestions={suggestions} handleClick={handleClick} />
      )}
    </div>
  );
};
