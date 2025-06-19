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
      [e.target.name]: e.target.value.trimStart(), // prevents leading spaces
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { brand, category, price } = form;
    if (!brand || !category || !price) {
      return alert('Brand, category, and price are required.');
    }

    const preparedForm = {
      ...form,
      price: Number(price),
    };

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData
      ? `${import.meta.env.VITE_BACKEND_URL}/api/products/${initialData._id}`
      : `${import.meta.env.VITE_BACKEND_URL}/api/products`;

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

      {['brand', 'category', 'price', 'playerType', 'material', 'level'].map((field) => (
        <input
          key={field}
          className="w-full p-2 border mb-3 text-black"
          type={field === 'price' ? 'number' : 'text'}
          name={field}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          required={['brand', 'category', 'price'].includes(field)}
        />
      ))}

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