interface Product {
  id: string;
  name: string;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  onQuantityUpdated: (productId: string, newQuantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products}) => {
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
              {/* Input and button to update quantity will be added by the candidate */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;