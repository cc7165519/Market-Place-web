import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(stored);
    }, []);

    const handleDelete = (id) => {
        const updated = products.filter((s) => s.id !== id);
        localStorage.setItem("products", JSON.stringify(updated));
        setProducts(updated); // ✅ Fix here
    };

    return (
        <div className='p-4'>
            {products.length === 0 ? (
                <p className="text-gray-600">No products added yet.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {products.map((s) => (
                        <ProductCard key={s.id} product={s} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;