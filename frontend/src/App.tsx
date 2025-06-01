import { useState, useEffect } from 'react';
import ProductList from '../../frontend/src/components/ProductList';
import AddProductForm from '../../frontend/src/components/AddProductForm';
import './App.css';
import { fetchProducts, addProduct, updateProductQuantity } from '../../frontend/src/api';

interface Product {
  id: string;
  name: string;
  quantity: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleProductAdded = async (newProduct: { name: string; quantity: number }) => {
    try {
      const created = await addProduct(newProduct);
      setProducts((prev) => [...prev, created]);
    } catch (err: any) {
      setError(err.message || 'Failed to add product');
    }
  };

  const handleQuantityUpdated = async (productId: string, newQuantity: number) => {
    try {
      const updated = await updateProductQuantity(productId, newQuantity);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, quantity: updated.quantity } : p))
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update quantity');
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Simple Inventory</h1>
      <AddProductForm onProductAdded={handleProductAdded} />
      <ProductList products={products} onQuantityUpdated={handleQuantityUpdated} />
      {/* <UpdateQuantityForm /> */}
    </div>
  );
}

export default App;