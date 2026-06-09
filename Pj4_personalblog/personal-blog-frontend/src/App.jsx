import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* ส่วนหัวของเว็บไซต์ที่จะแสดงค้างไว้ทุกหน้า */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-5 flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition"
            >
              DevSpace Blog
            </Link>
            <nav className="space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-black transition"
              >
                Home
              </Link>
              <a
                href="http://localhost:3000/admin"
                className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
              >
                Admin Dashboard
              </a>
            </nav>
          </div>
        </header>

        {/* ระบบสารบัญเส้นทางของ React Router */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
