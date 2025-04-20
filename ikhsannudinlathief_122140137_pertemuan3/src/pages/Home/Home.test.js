import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { BookProvider } from "../../context/BookContext";

// Mock the child components
jest.mock("../../components/BookList/BookList", () => () => (
  <div data-testid="book-list">Book List Component</div>
));
jest.mock("../../components/BookFilter/BookFilter", () => () => (
  <div data-testid="book-filter">Book Filter Component</div>
));
jest.mock("../../components/BookForm/BookForm", () => ({ onAddBook }) => (
  <div data-testid="book-form">Book Form Component</div>
));

describe("Home Component", () => {
  test("renders all main sections correctly", () => {
    render(
      <BookProvider>
        <Home />
      </BookProvider>
    );

    // Verify the main elements are rendered - updated to match Indonesian text
    expect(
      screen.getByRole("heading", { name: "Koleksi Buku" })
    ).toBeInTheDocument();

    // Update these checks to match your actual UI text
    expect(screen.getByText("Tambah Buku")).toBeInTheDocument();
    expect(screen.getByTestId("book-filter")).toBeInTheDocument();
    expect(screen.getByTestId("book-list")).toBeInTheDocument();
  });

  test("toggles book form display when Add New Book button is clicked", () => {
    render(
      <BookProvider>
        <Home />
      </BookProvider>
    );

    // Initially the form should not be visible
    expect(screen.queryByTestId("book-form")).not.toBeInTheDocument();

    // Click the Add New Book button - updated to match Indonesian text
    fireEvent.click(screen.getByText("Tambah Buku"));

    // Now the form should be visible
    expect(screen.getByTestId("book-form")).toBeInTheDocument();
  });
});
