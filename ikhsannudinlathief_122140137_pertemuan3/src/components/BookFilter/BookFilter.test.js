import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BookContext } from "../../context/BookContext";
import BookFilter from "./BookFilter";

describe("BookFilter Component", () => {
  test("filter updates when selection changes", () => {
    // Create a mock dispatch function
    const mockDispatch = jest.fn();

    // Mock state
    const mockState = {
      filter: "all",
      searchTerm: "",
    };

    // Render BookFilter with mocked context
    render(
      <BookContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <BookFilter />
      </BookContext.Provider>
    );

    // Find filter dropdown by its ID instead of label
    const filterSelect = screen.getByRole("combobox");
    // Alternatively: const filterSelect = screen.getByDisplayValue('All Books');

    // Change filter value
    fireEvent.change(filterSelect, { target: { value: "baca" } });

    // Check if dispatch was called with correct action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_FILTER",
      payload: "baca",
    });
  });
});
