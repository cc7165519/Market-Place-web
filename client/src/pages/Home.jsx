import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        alert("✅ Product deleted successfully");
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ Error occurred while deleting");
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;