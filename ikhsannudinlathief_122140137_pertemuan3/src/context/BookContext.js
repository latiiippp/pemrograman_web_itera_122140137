import React, { createContext, useReducer } from "react";

export const BookContext = createContext();

const LOCAL_STORAGE_KEY = "bookManager.books";

const initialState = {
  books: [],
  loading: false,
  error: null,
  searchTerm: "",
  filter: "all",
};

const bookReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "SET_BOOKS":
      newState = { ...state, books: action.payload };
      break;
    case "ADD_BOOK":
      newState = { ...state, books: [...state.books, action.payload] };
      break;
    case "UPDATE_BOOK":
      newState = {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
      break;
    case "DELETE_BOOK":
      newState = {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
      break;
    case "SET_FILTER":
      newState = { ...state, filter: action.payload };
      break;
    case "SET_SEARCH_TERM":
      newState = { ...state, searchTerm: action.payload };
      break;
    case "SET_ERROR":
      newState = { ...state, error: action.payload };
      break;
    default:
      return state;
  }

  // Save books to localStorage whenever books change
  if (newState.books !== state.books) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState.books));
  }

  return newState;
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState, () => {
    // Load books from localStorage on initial render
    const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return storedBooks
        ? {
            ...initialState,
            books: JSON.parse(storedBooks),
          }
        : initialState;
    } catch (error) {
      console.error("Failed to parse books from localStorage:", error);
      return initialState;
    }
  });

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
