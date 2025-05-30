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
  // TODO: Implementation needed
});

// PUT /api/products/:id (will be implemented by the candidate)
app.put('/api/products/:id', (req: Request, res: Response) => {
  // TODO: Implementation needed
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});


// Export the app for testing
export default app;