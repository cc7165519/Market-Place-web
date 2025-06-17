import { useNavigate } from "react-router-dom";

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-gray-800 space-y-2">
      <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>

      <p><span className="font-medium">Brand:</span> {product.brand}</p>
      <p><span className="font-medium">Category:</span> {product.category}</p>
      
      {product.playerType && (
        <p><span className="font-medium">Player Type:</span> {product.playerType}</p>
      )}
      {product.material && (
        <p><span className="font-medium">Material:</span> {product.material}</p>
      )}
      {product.level && (
        <p><span className="font-medium">Skill Level:</span> {product.level}</p>
      )}

      <p><span className="font-medium">Price:</span> ₹{product.price}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(`/edit/${product.id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;