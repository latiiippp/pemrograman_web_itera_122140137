import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookItem from "./BookItem";

// Mock window.confirm
global.confirm = jest.fn(() => true);

describe("BookItem Component", () => {
  test("allows deleting a book", () => {
    // Mock book data
    const mockBook = {
      id: "123",
      title: "Test Book",
      author: "Test Author",
      status: "milik",
    };

    // Mock functions
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();

    // Render BookItem
    render(
      <BookItem book={mockBook} onEdit={mockEdit} onDelete={mockDelete} />
    );

    // Click delete button
    fireEvent.click(screen.getByLabelText(/delete book/i));

    // Check if delete function was called with correct id
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith("123");
  });
});
