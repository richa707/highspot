import { useState, useEffect } from 'react';
import ProductList from '../../frontend/src/components/ProductList';
import AddProductForm from '../../frontend/src/components/AddProductForm';
import './App.css';
import { fetchProducts } from '../../frontend/src/api';

function App() {
  const [products, setProducts] = useState<any[]>([]);
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

  const handleProductAdded = (newProduct: any) => {
    // TODO: Implement
    console.log('Product added:', newProduct);
  };

  const handleQuantityUpdated = (productId: string, newQuantity: number) => {
    // TODO: Implement
    console.log('Quantity updated for:', productId, 'to', newQuantity);
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