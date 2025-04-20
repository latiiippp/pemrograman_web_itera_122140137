import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookForm from "./BookForm";
import { BookContext } from "../../context/BookContext";

describe("BookForm Component", () => {
  test("allows adding a new book", () => {
    // Mock the dispatch function
    const mockDispatch = jest.fn();

    // Render BookForm with mocked context
    render(
      <BookContext.Provider value={{ state: {}, dispatch: mockDispatch }}>
        <BookForm onSave={jest.fn()} />
      </BookContext.Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Book Title" },
    });

    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: "Test Author" },
    });

    // Select "Currently Reading" status
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "baca" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/add book/i));

    // Check if dispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_BOOK",
      payload: expect.objectContaining({
        title: "Test Book Title",
        author: "Test Author",
        status: "baca",
      }),
    });
  });

  test("shows validation errors for empty fields", () => {
    // Render BookForm
    render(
      <BookContext.Provider value={{ state: {}, dispatch: jest.fn() }}>
        <BookForm />
      </BookContext.Provider>
    );

    // Submit form without filling it
    fireEvent.click(screen.getByText(/add book/i));

    // Check for error messages
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/author is required/i)).toBeInTheDocument();
  });
});
