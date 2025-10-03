"use client";
import React, { useRef, useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearItems } from "../store/dataSlice";
import { FiPlusSquare } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState({});
  const [query, setQuery] = useState("");
  const searchResults = useSelector(
    (state) => state.searchResults.searchResults
  );

  const dispatch = useDispatch();
  // const handleAddSearchData = (data) => {
  //   dispatch(addItem(data));
  // };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        dispatch(clearItems());
        setSuggestions({});
        return;
      }

      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: query }),
        });

        const data = await res.json();
        dispatch(addItem(data.results)); // data should be an object or array element
        console.log("Search results: ", searchResults);

        if (data.results) {
          setSuggestions(data.results.slice(0, 5)); // show top 5
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300); // debounce typing
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="container w-[80%] flex justify-center mx-auto mt-2">
      <nav className="bg-white shadow-lg sticky top-0 z-50 w-full rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-evenly items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link href="/prompts?page=1">
                <img
                  className="h-8 w-auto"
                  src="promptify-logo.png"
                  alt="Demo Logo"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Name or Hashtags"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {suggestions.map((item) => (
                    <li
                      key={item._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between"
                      onClick={() => {
                        console.log("Selected:", item.Name);
                        setQuery(item.Name);
                        setSuggestions([]);
                      }}
                    >
                      {item.name}
                      {item.hashtags.split(" ").map((hashtag) => {
                        return (
                          <span className="px-2 sm:px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
                            {hashtag}
                          </span>
                        );
                      })}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link href="/post">
            <button
              type="button"
              class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
              Post Yours
            </button>
              </Link>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4 px-4 relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Mobile suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {suggestions.map((item) => (
                  <li
                    key={item._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      console.log("Selected:", item.Name);
                      setQuery(item.Name);
                      setSuggestions([]);
                    }}
                  >
                    {item.Name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
