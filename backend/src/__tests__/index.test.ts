import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../index';

export let products: Record<string, any> = {};
export let nextId = 1;

export function resetProducts() {
  products = {};
  nextId = 1;
}

describe('Product API Endpoints', () => {
  beforeEach(() => {
    // Reset any in-memory data before each test to ensure isolation
    resetProducts();
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
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: 'Apple',
      quantity: 10,
    });
  });

  it('should retrieve the added product via GET /api/products', async () => {
    const newProduct = { name: 'Banana', quantity: 5 };
    await request(app)
      .post('/api/products')
      .send(newProduct)
      .set('Content-Type', 'application/json');

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
    expect(putResponse.body).toMatchObject({
      id: productId,
      name: 'Orange',
      quantity: 15,
    });
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
  expect(response.body).toEqual({
    error: 'Invalid product data: name must be non-empty and quantity must be a positive number.',
  });
});

it('should return 400 for invalid POST data (invalid quantity)', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ name: 'Mango', quantity: 'invalid' })
    .set('Content-Type', 'application/json');
  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    error: 'Invalid product data: name must be non-empty and quantity must be a positive number.',
  });
});
  it('should return 400 for invalid POST data (negative quantity)', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'Peach', quantity: -3 })
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Invalid product data: name must be non-empty and quantity must be a positive number.',
    });
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
    expect(response.body).toEqual({
      error: 'Invalid product data: name must be non-empty and quantity must be a positive number.',
    });
  });

  it('should handle PUT request with negative quantity', async () => {
    const newProduct = { name: 'Pear', quantity: 3 };
    const postResponse = await request(app)
      .post('/api/products')
      .send(newProduct)
      .set('Content-Type', 'application/json');
    const productId = postResponse.body.id;

    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send({ quantity: -5 })
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Invalid product data: name must be non-empty and quantity must be a positive number.',
    });
  });

  it('should ensure all successful responses have the correct product structure', async () => {
    const newProduct = { name: 'Kiwi', quantity: 7 };
    const postResponse = await request(app)
      .post('/api/products')
      .send(newProduct)
      .set('Content-Type', 'application/json');
    expect(postResponse.status).toBe(201);
    expect(postResponse.body).toEqual({
      id: expect.any(String),
      name: 'Kiwi',
      quantity: 7,
    });

    const getResponse = await request(app).get('/api/products');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          quantity: expect.any(Number),
        }),
      ])
    );

    const productId = postResponse.body.id;
    const putResponse = await request(app)
      .put(`/api/products/${productId}`)
      .send({ quantity: 10 })
      .set('Content-Type', 'application/json');
    expect(putResponse.status).toBe(200);
    expect(putResponse.body).toEqual({
      id: productId,
      name: 'Kiwi',
      quantity: 10,
    });
  });
});
