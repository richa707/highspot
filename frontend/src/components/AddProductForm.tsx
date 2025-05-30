import { useState } from 'react';

interface AddProductFormProps {
  onProductAdded: (newProduct: { name: string; quantity: number }) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && typeof quantity === 'number') {
      onProductAdded({ name, quantity });
      setName('');
      setQuantity('');
    } else {
      alert('Please enter a name and quantity.');
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;