import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="max-w-4xl mx-auto p-4">
          <header className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Manajemen <span className="text-blue-800">Buku Pribadimu</span>
            </h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/stats"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Statistik
                  </Link>
                </li>
              </ul>
            </nav>
          </header>

          <main className="bg-white rounded-lg shadow p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;
