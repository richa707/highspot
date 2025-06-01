import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  onQuantityUpdated: (productId: string, newQuantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onQuantityUpdated }) => {
  // Local state to track input values for each product
  const [inputValues, setInputValues] = useState<{ [id: string]: number }>({});

  const handleInputChange = (id: string, value: string) => {
    setInputValues({
      ...inputValues,
      [id]: Number(value),
    });
  };

  const handleUpdateClick = (id: string) => {
    const newQuantity = inputValues[id];
    if (typeof newQuantity === 'number' && !isNaN(newQuantity)) {
      onQuantityUpdated(id, newQuantity);
      setInputValues({ ...inputValues, [id]: 0 }); // Optionally reset input after update
    }
  };

  return (
    <div>
      <h2>Current Inventory</h2>
      {products.length === 0 ? (
        <p>No products in inventory.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - Quantity: {product.quantity}
              <input
                type="number"
                min="0"
                value={inputValues[product.id] ?? ''}
                onChange={(e) => handleInputChange(product.id, e.target.value)}
                placeholder="New quantity"
                style={{ marginLeft: '1em', width: '6em' }}
              />
              <button
                onClick={() => handleUpdateClick(product.id)}
                style={{ marginLeft: '0.5em' }}
                disabled={
                  inputValues[product.id] === undefined ||
                  isNaN(inputValues[product.id]) ||
                  Number(inputValues[product.id]) === product.quantity
                }
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;