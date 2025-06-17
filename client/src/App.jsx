import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <nav className="w-full bg-white shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-extrabold text-green-700 tracking-tight">
              🏏 ProCricket Store
            </h1>
            <div className="space-x-6">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/add"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Add Product
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex justify-center items-start">
          <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6 mt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/edit/:id" element={<EditProduct />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;