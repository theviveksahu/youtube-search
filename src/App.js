import { useState } from "react";
import "./App.css";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { SearchResults } from "./components/SearchResults/SearchResults";
import loader from "./assets/images/loader.gif";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <SearchInput
        setSearchResults={setSearchResults}
        page={page}
        setLoading={setLoading}
      />
      <div className="search-results-wrapper">
        <>
          <SearchResults results={searchResults} setPage={setPage} />
          {loading && (
            <div className="loader">
              <img src={loader} alt="Loading..." />
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default App;
