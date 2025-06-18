import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductForm({ initialData }) {
  const [form, setForm] = useState({
    brand: '',
    category: '',
    price: '',
    playerType: '',
    material: '',
    level: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.brand || !form.category || !form.price) {
      return alert('Brand, category, and price are required.');
    }

    // Convert price to Number to match backend schema
    const preparedForm = {
      ...form,
      price: Number(form.price),
    };

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData
      ? `http://localhost:5000/api/products/${initialData._id}`
      : 'http://localhost:5000/api/products';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedForm),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        alert('Failed to save product. ' + (errorData.message || ''));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 shadow-md rounded-xl max-w-md mx-auto text-white"
    >
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Product' : 'Add New Product'}
      </h2>

      <input
        className="w-full p-2 border mb-3 text-black"
        type="text"
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        required
      />

      <input
        className="w-full p-2 border mb-3 text-black"
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        className="w-full p-2 border mb-3 text-black"
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <input
        className="w-full p-2 border mb-3 text-black"
        type="text"
        name="playerType"
        placeholder="Player Type (e.g. Beginner, Pro)"
        value={form.playerType}
        onChange={handleChange}
      />

      <input
        className="w-full p-2 border mb-3 text-black"
        type="text"
        name="material"
        placeholder="Material (e.g. Leather, Plastic)"
        value={form.material}
        onChange={handleChange}
      />

      <input
        className="w-full p-2 border mb-3 text-black"
        type="text"
        name="level"
        placeholder="Skill Level (e.g. Amateur, Advanced)"
        value={form.level}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        {initialData ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}

export default ProductForm;