import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../index'; // Adjust the path to your app file

describe('Product API Endpoints', () => {
  beforeEach(() => {
    // Reset any in-memory data before each test to ensure isolation
    // You might need to access and reset your data store here depending on your implementation
    // Example (if using a simple object):
    // import { resetProducts } from '../dataStore'; // Assuming you have a way to reset
    // resetProducts();
  });

  it('should return an empty array for GET /api/products initially', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a product via POST /api/products and return it with an ID', async () => {
    const newProduct = { name: 'Apple', quantity: 10 };
    const response = await request(app)
      .post('/api/products')
      .send(newProduct)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ id: expect.any(String), name: 'Apple', quantity: 10 });
  });

  it('should retrieve the added product via GET /api/products', async () => {
    const newProduct = { name: 'Banana', quantity: 5 };
    await request(app).post('/api/products').send(newProduct).set('Content-Type', 'application/json');

    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Banana', quantity: 5 }),
      ])
    );
  });

  it('should update a product quantity via PUT /api/products/:id', async () => {
    const newProduct = { name: 'Orange', quantity: 8 };
    const postResponse = await request(app)
      .post('/api/products')
      .send(newProduct)
      .set('Content-Type', 'application/json');

    const productId = postResponse.body.id;
    const updatedProduct = { quantity: 15 };
    const putResponse = await request(app)
      .put(`/api/products/${productId}`)
      .send(updatedProduct)
      .set('Content-Type', 'application/json');

    expect(putResponse.status).toBe(200);
    expect(putResponse.body).toMatchObject({ id: productId, name: 'Orange', quantity: 15 });
  });

  it('should return 404 for updating a non-existent product', async () => {
    const response = await request(app)
      .put('/api/products/nonexistent-id')
      .send({ quantity: 10 })
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Product not found' });
  });

  it('should return 400 for invalid POST data (missing name)', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ quantity: 5 })
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid product data' });
  });

  it('should return 400 for invalid POST data (invalid quantity)', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'Mango', quantity: 'invalid' })
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid product data' });
  });

  it('should return 400 for invalid PUT data (invalid quantity)', async () => {
    const newProduct = { name: 'Grape', quantity: 12 };
    const postResponse = await request(app)
      .post('/api/products')
      .send(newProduct)
      .set('Content-Type', 'application/json');

    const productId = postResponse.body.id;
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send({ quantity: 'invalid' })
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid product data' });
  });

  // TODO: Add a test case to check the behavior when trying to update a product with a negative quantity.
  it('should handle PUT request with negative quantity', async () => {
    // ...
  });

  // TODO: Add a test case to ensure the backend returns the correct product structure in all successful responses.
  it('should ensure all successful responses have the correct product structure', async () => {
    // ...
  });

  // TODO: If you implement deletion, add tests for the DELETE /api/products/:id endpoint.
  describe('DELETE /api/products/:id', () => {
    it('should delete an existing product', async () => {
      // ...
    });

    it('should return 404 for deleting a non-existent product', async () => {
      // ...
    });
  });
});