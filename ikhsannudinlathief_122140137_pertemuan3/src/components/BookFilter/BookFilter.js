import React, { useContext } from "react";
import { BookContext } from "../../context/BookContext";

const BookFilter = () => {
  const { state, dispatch } = useContext(BookContext);

  const handleFilterChange = (e) => {
    dispatch({ type: "SET_FILTER", payload: e.target.value });
  };

  const handleSearchChange = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex-grow md:mr-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau penulis..."
            value={state.searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
      </div>
      <div className="md:w-1/4">
        <div className="relative">
          <select
            id="filter"
            value={state.filter}
            onChange={handleFilterChange}
            className="w-full p-2 pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="all">All</option>
            <option value="milik">Sudah Punya</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Mau Beli</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFilter;
