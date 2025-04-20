import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookForm from "./BookForm";
import { BookContext } from "../../context/BookContext";

describe("BookForm Component", () => {
  test("allows adding a new book", () => {
    const mockDispatch = jest.fn();

    render(
      <BookContext.Provider value={{ dispatch: mockDispatch }}>
        <BookForm onAddBook={() => {}} />
      </BookContext.Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/judul buku/i), {
      target: { value: "Test Book Title" },
    });
    fireEvent.change(screen.getByLabelText(/penulis/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "milik" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Tambah Buku"));

    // Check if dispatch was called with the correct action - changed "book" to "payload"
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_BOOK",
      payload: expect.objectContaining({
        title: "Test Book Title",
        author: "Test Author",
        status: "milik",
      }),
    });
  });

  test("shows validation errors for empty fields", () => {
    const mockDispatch = jest.fn();

    render(
      <BookContext.Provider value={{ dispatch: mockDispatch }}>
        <BookForm onAddBook={() => {}} />
      </BookContext.Provider>
    );

    // Submit form without filling it
    fireEvent.click(screen.getByText("Tambah Buku"));

    // Check for error messages - updated to match actual messages
    expect(screen.getByText("Judul buku harus diisi!")).toBeInTheDocument();
    expect(screen.getByText("Nama penulis harus diisi!")).toBeInTheDocument();

    // Make sure dispatch was not called
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
