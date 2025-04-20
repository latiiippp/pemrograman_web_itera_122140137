import React from "react";
import PropTypes from "prop-types";

const BookItem = ({ book, onEdit, onDelete }) => {
  const getStatusLabel = (status) => {
    switch (status) {
      case "milik":
        return "Sudah Punya";
      case "baca":
        return "Sedang Dibaca";
      case "beli":
        return "Mau Beli";
      default:
        return status;
    }
  };

  const statusConfig = {
    milik: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: (
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      ),
    },
    baca: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      icon: (
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          ></path>
        </svg>
      ),
    },
    beli: {
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      icon: (
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          ></path>
        </svg>
      ),
    },
  };

  const status = statusConfig[book.status];

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="flex-1 overflow-hidden">
          <h3
            className="text-lg font-semibold text-gray-900 truncate"
            title={book.title}
          >
            {book.title}
          </h3>
          <p
            className="text-gray-600 text-sm truncate"
            title={`by ${book.author}`}
          >
            by {book.author}
          </p>
          <div className="mt-3 flex items-center">
            <span
              className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${status.bgColor} ${status.textColor}`}
            >
              {status.icon}
              {getStatusLabel(book.status)}
            </span>
          </div>
        </div>
        <div className="flex space-x-2 ml-2">
          <button
            onClick={() => onEdit(book)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
            aria-label="Edit book"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="text-red-500 hover:text-red-700 flex items-center"
            aria-label="Delete book"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["milik", "baca", "beli"]).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;
