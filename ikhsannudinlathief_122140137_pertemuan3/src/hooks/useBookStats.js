import { useMemo, useContext } from "react";
import { BookContext } from "../context/BookContext";

const useBookStats = () => {
  const { state } = useContext(BookContext);
  const { books } = state;

  const stats = useMemo(() => {
    const totalBooks = books.length;
    const ownedBooks = books.filter((book) => book.status === "milik").length;
    const readingBooks = books.filter((book) => book.status === "baca").length;
    const wishlistBooks = books.filter((book) => book.status === "beli").length;

    return {
      totalBooks,
      ownedBooks,
      readingBooks,
      wishlistBooks,
    };
  }, [books]);

  return stats;
};

export default useBookStats;
