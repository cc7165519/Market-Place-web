import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  const navigate = useNavigate();

  const handleAdd = async (product) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        alert('Failed to add product: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Something went wrong while adding the product.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Add New Product</h2>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
}

export default AddProduct;