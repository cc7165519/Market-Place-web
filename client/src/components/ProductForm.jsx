import { useState, useEffect } from "react";

function ProductForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price || "",
        brand: initialData.brand || "",
        category: initialData.category || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: initialData?.id || Date.now(),
    };
    onSubmit(newProduct);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto text-left"
    >
      <input
        type="text"
        name="name"
        placeholder="Product name"
        className="w-full p-2 border rounded"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="w-full p-2 border rounded"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        className="w-full p-2 border rounded"
        value={formData.brand}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        className="w-full p-2 border rounded"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        {initialData ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;