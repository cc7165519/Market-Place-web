import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    const found = stored.find((item) => item.id === parseInt(id));
    if (!found) return navigate("/");
    setProduct(found);
  }, [id, navigate]);

  const handleUpdate = (updatedProduct) => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    const updated = stored.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    );
    localStorage.setItem("products", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div>
      {product && <ProductForm onSubmit={handleUpdate} initialData={product} />}
    </div>
  );
}

export default EditProduct;