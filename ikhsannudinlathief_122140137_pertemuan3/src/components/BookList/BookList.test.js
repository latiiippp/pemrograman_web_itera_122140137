import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookList from "./BookList";
import { BookContext } from "../../context/BookContext";

describe("BookList Component", () => {
  test("displays books correctly", () => {
    // Mock books data
    const mockBooks = [
      { id: "1", title: "Book 1", author: "Author 1", status: "milik" },
      { id: "2", title: "Book 2", author: "Author 2", status: "baca" },
    ];

    // Mock state
    const mockState = {
      books: mockBooks,
      filter: "all",
      searchTerm: "",
    };

    // Render BookList with mocked context
    render(
      <BookContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <BookList />
      </BookContext.Provider>
    );

    // Check if books are displayed
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("by Author 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(screen.getByText("by Author 2")).toBeInTheDocument();

    // Check if status badges are displayed
    expect(screen.getByText("Owned")).toBeInTheDocument();
    expect(screen.getByText("Reading")).toBeInTheDocument();
  });

  test("displays no books message when list is empty", () => {
    // Mock empty state
    const mockState = {
      books: [],
      filter: "all",
      searchTerm: "",
    };

    // Render BookList with empty books array
    render(
      <BookContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <BookList />
      </BookContext.Provider>
    );

    // Check for the "no books" message
    expect(screen.getByText(/no books found/i)).toBeInTheDocument();
  });
});
