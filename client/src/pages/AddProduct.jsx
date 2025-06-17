import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  const navigate = useNavigate();

  const handleAdd = (product) => {
    const existing = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = { ...product, id: Date.now() };
    const updated = [...existing, newProduct];
    localStorage.setItem("products", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
}

export default AddProduct;