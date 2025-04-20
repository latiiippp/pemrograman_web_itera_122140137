import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BookContext } from "../../context/BookContext";
import Home from "./Home";

// Mock the components used by Home so we can focus on testing Home itself
jest.mock("../../components/BookList/BookList", () => () => (
  <div data-testid="book-list">Book List Component</div>
));
jest.mock("../../components/BookForm/BookForm", () => {
  return function MockBookForm({ onSave, onCancel }) {
    return <div data-testid="book-form">Book Form Component</div>;
  };
});
jest.mock("../../components/BookFilter/BookFilter", () => () => (
  <div data-testid="book-filter">Book Filter Component</div>
));

describe("Home Component", () => {
  test("renders all main sections correctly", () => {
    // Mock state
    const mockState = {
      books: [],
      searchTerm: "",
      filter: "all",
    };

    // Render Home with mocked context
    render(
      <BookContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Home />
      </BookContext.Provider>
    );

    // Verify the main elements are rendered - use a more specific query for "Your Book Collection"
    expect(
      screen.getByRole("heading", { name: /your book collection/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText("Find Your Books")).toBeInTheDocument();
    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    expect(screen.getByTestId("book-filter")).toBeInTheDocument();
    expect(screen.getByTestId("book-list")).toBeInTheDocument();
  });

  test("toggles book form display when Add New Book button is clicked", async () => {
    // Mock state
    const mockState = {
      books: [],
      searchTerm: "",
      filter: "all",
    };

    // Render Home
    render(
      <BookContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Home />
      </BookContext.Provider>
    );

    // Initially, the form should not be visible
    expect(screen.queryByTestId("book-form")).not.toBeInTheDocument();

    // Click the Add New Book button - no need to wrap in act()
    fireEvent.click(screen.getByText("Add New Book"));

    // Now the form should be visible
    expect(screen.getByTestId("book-form")).toBeInTheDocument();
  });
});
