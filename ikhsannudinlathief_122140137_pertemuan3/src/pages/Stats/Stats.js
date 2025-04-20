import React from "react";
import useBookStats from "../../hooks/useBookStats";

const Stats = () => {
  const stats = useBookStats();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Statistik Buku Kamu
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Total Buku
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats.totalBooks}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Sudah Punya
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.ownedBooks}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Sedang Dibaca
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.readingBooks}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Mau Beli
          </h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {stats.wishlistBooks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
