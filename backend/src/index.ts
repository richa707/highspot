import express, { Request, Response } from 'express';
import cors from 'cors'; // Import the cors package

const app = express();

const port = 3001;

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

// In-memory data store (will be implemented by the candidate)
const products: { [key: string]: { id: string; name: string; quantity: number } } = {};
let nextId = 1;

// GET /api/products (will be implemented by the candidate)
app.get('/api/products', (req: Request, res: Response) => {
  res.json(Object.values(products));
});

// POST /api/products (will be implemented by the candidate)
app.post('/api/products', (req: Request, res: Response) => {
  const { name, quantity } = req.body;

  // Basic validation: name must be a non-empty string, quantity must be a positive number
  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof quantity !== 'number' ||
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    return res.status(400).json({ error: 'Invalid product data: name must be non-empty and quantity must be a positive number.' });
  }

  const id = String(nextId++);
  const newProduct = { id, name, quantity };
  products[id] = newProduct;

  res.status(201).json(newProduct);
});

// PUT /api/products/:id (will be implemented by the candidate)
app.put('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ error: 'Invalid product data: name must be non-empty and quantity must be a positive number.' });
  }

  const product = products[id];
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  product.quantity = quantity;
  res.json(product);
});


// Export the app for testing
export default app;