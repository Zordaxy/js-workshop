/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import countries from "./countries";

// Reference to system design: https://www.greatfrontend.com/questions/system-design/autocomplete?format=system-design

// className - Customized rendering
function App({ className }) {
  const [resultShown, setResultShown] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    document.addEventListener("click", () => setResultShown(false));
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter" && selectedIndex !== -1) {
      selectFromList(selectedIndex);
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowDown") {
      setSelectedIndex((currInd) =>
        currInd < suggestions.length - 1 ? currInd + 1 : currInd
      );
    }

    if (e.key === "ArrowUp") {
      setSelectedIndex((currInd) => (currInd > 0 ? currInd - 1 : currInd));
    }

    if (userInput.length >= 2) fetchSuggestions();
  }

  function selectFromList(index) {
    setUserInput(suggestions[index]);
    setResultShown(false);
    setSelectedIndex(-1);
  }

  function fetchSuggestions() {
    const params = new URLSearchParams({
      query: userInput,
      count: 10,
    }).toString();

    // fetch(`https:\\some.api.com?${params}`)
    //   .then((response) => response.json())
    //   .then((data) => setSuggestions(data));
    const mockResult = countries.filter((country) =>
      country.toLowerCase().startsWith(userInput.toLowerCase())
    );

    setSuggestions(mockResult);
    setResultShown(true);
  }

  return (
    <>
      <form onSubmit={onSubmit} className={className}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Search..."
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={resultShown} // Indicating whether content is expanded
          aria-controls="collapsible-content" // Linking to the collapsible content by ID
          autocapitalize="off" // mobile-friendly
          autocomplete="off" // mobile-friendly
          autocorrect="off" // mobile-friendly
          spellcheck="false" // mobile-friendly
        />
        <button>Search</button>
        {resultShown && !!suggestions.length && (
          <section
            id="collapsible-content"
            aria-live="assertive"
            aria-autocomplete="both"
          >
            <ul>
              {/* role="region" Indicates this is a section that can be expanded or collapsed */}
              {suggestions.map((s, index) => (
                <li
                  key={s}
                  className={selectedIndex === index ? "active-suggestion" : ""}
                  onClick={() => {
                    selectFromList(index);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}
      </form>
    </>
  );
}

export default App;

// Questions:
// What kind of results should be supported?
// What devices will this component be used on?
// Do we need to support fuzzy search?

// Main ideas:
// Minimum query length
// Debounce duration
// API timeout duration
// Cache-related

// Network
// 1. Race conditions
// 2. Failed requests and retries
// 3. Offline usage

// Api params:
//    query
//    limit
//    pagination

// Caching:
// 1. Hash map with search query as key and results as value
// 3. Normalized map of results.
//     Initial results
//     Results source: network only/network and cache/cache only
//     Function to merge results from server and cache
//     Cache duration

// Performance
// 1. Loading speed (caching)
// 2. Debouncing/throttling
// 3. Memory usage
// 4. Virtualized lists

// User experience
// 1. Autofocus to input
// 2. Handle different states (loafing, error, no network)
// 3. Handle long strings (truncate with ellipsisi)
// 4. Keyboard interaction (focus on the autocomplete with keyboard, like "/")
// 5. Typos in search - Fuzzy search - Levenshtein distance - smallest edit distance
// 6. Query results positioning - position on top if input is low in viewport

// Mobile-friendliness
// 1. items large enough for user to tap
// 2. Dynamic number of results depending on viewport window size
// 3. Set helpful attributes for mobile: autocapitalize="off", autocomplete="off", autocorrect="off", spellcheck="false"

// Accessibility
// 1. Use semantic HTML.
// 2. aria-label for the <input> because there usually isn't a visible label.
// 3. role="combobox" for the <input>.
// 4. aria-haspopup to indicate that the element can trigger an interactive popup element.
// 5. aria-expanded to indicate whether the popup element is currently displayed.
// 6. aria-live on results region with so that when new results are shown, screen reader users are notified.
// 7. aria-autocomplete="list" to describe the type of autocompletion interaction model

// Keyboard interaction
// 1. Enter to perform a search - Wrapping the <input> in a <form>.
// 2. Up/down arrows to navigate the options
// 3.  Escape - dismiss the results popup
