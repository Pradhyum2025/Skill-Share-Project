import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sampleSuggestions = [
    "JavaScript Development",
    "React Framework",
    "Node.js Backend",
    "Python Programming",
    "Database Management",
    "Cloud Computing",
    "Mobile App Development",
    "UI/UX Design",
    "DevOps Engineering",
    "Machine Learning"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);

    if (value.trim()) {
      const filteredSuggestions = sampleSuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className="w-[60%] mx-auto px-4 py-1">
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search anything..."
            className="w-full bg-gray-600 px-12 py-2 text-base rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm"
            aria-label="Search input"
            aria-expanded={isOpen}
            aria-controls="search-suggestions"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <IoMdClose className="text-xl" />
            </button>
          )}
        </div>

        {isOpen && suggestions.length > 0 && (
          <div
            id="search-suggestions"
            className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50"
            role="listbox"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-6 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-200 flex items-center gap-3"
                role="option"
              >
                <FaSearch className="text-gray-400 text-sm" />
                <span className="text-gray-700">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;