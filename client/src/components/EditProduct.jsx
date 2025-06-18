import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product data");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching product data:", err);
        setError("Failed to load product. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-gray-600 text-center">Loading product...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4">
      {product ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-left">Edit Product</h2>
          <ProductForm initialData={product} />
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-700">Product not found.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default EditProduct;