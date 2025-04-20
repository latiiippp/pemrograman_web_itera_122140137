import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { BookContext } from "../../context/BookContext";

const BookForm = ({ book, onSave, onCancel }) => {
  const { dispatch } = useContext(BookContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("milik");
  const [errors, setErrors] = useState({});
  const isEditing = !!book;

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setStatus(book.status);
    }
  }, [book]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Judul buku harus diisi!";
    if (!author.trim()) newErrors.author = "Nama penulis harus diisi!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const bookData = {
      id: book ? book.id : Date.now().toString(),
      title: title.trim(),
      author: author.trim(),
      status,
    };

    if (isEditing) {
      dispatch({ type: "UPDATE_BOOK", payload: bookData });
    } else {
      dispatch({ type: "ADD_BOOK", payload: bookData });
    }

    if (onSave) onSave();

    if (!isEditing) {
      setTitle("");
      setAuthor("");
      setStatus("milik");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Edit Buku" : ""}
      </h2>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Judul Buku
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border rounded-md ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Penulis
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={`w-full p-2 border rounded-md ${
            errors.author ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="milik">Sudah Punya</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Mau Beli</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {isEditing ? "Ubah" : "Tambah Buku"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

BookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["milik", "baca", "beli"]).isRequired,
  }),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default BookForm;
