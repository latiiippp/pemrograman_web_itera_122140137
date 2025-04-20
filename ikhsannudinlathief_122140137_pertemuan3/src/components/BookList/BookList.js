import React, { useContext, useState } from "react";
import { BookContext } from "../../context/BookContext";
import BookItem from "./BookItem";
import BookForm from "../BookForm/BookForm";

const BookList = () => {
  const { state, dispatch } = useContext(BookContext);
  const { books, filter, searchTerm } = state;
  const [editingBook, setEditingBook] = useState(null);

  // Filter and search books
  const filteredBooks = books.filter((book) => {
    // Filter by status
    if (filter !== "all" && book.status !== filter) {
      return false;
    }

    // Filter by search term
    if (
      searchTerm &&
      !book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !book.author.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = (id) => {
    if (window.confirm("Kamu yakin mau hapus buku ini?")) {
      dispatch({ type: "DELETE_BOOK", payload: id });
    }
  };

  const handleSave = () => {
    setEditingBook(null);
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  if (editingBook) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <BookForm
          book={editingBook}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">Buku tidak ditemukan.</p>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BookList;
