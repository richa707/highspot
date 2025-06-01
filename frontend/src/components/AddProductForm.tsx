import { useState } from 'react';

interface AddProductFormProps {
  onProductAdded: (newProduct: { name: string; quantity: number }) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Ensure name is not empty and quantity is a valid positive number
    if (
      name.trim() &&
      typeof quantity === 'number' &&
      !isNaN(quantity) &&
      quantity > 0
    ) {
      onProductAdded({ name: name.trim(), quantity });
      setName('');
      setQuantity('');
    } else {
      alert('Please enter a name and a positive quantity.');
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
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              setQuantity(value === '' ? '' : Number(value));
            }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={
            !name.trim() ||
            quantity === '' ||
            typeof quantity !== 'number' ||
            isNaN(quantity) ||
            quantity <= 0
          }
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;