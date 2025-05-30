import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import * as api from '../api'; // Adjust the path to your api.ts file

// Mock the fetch API
vi.stubGlobal('fetch', vi.fn());

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('fetchProducts should return data on successful request', async () => {
    const mockProducts = [{ id: '1', name: 'Apple', quantity: 10 }];
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const products = await api.fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/products');
  });

  it('fetchProducts should throw an error on failed request', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(api.fetchProducts()).rejects.toThrow('HTTP error! status: 500');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/products');
  });

  it('addProduct should make a POST request and return data', async () => {
    const newProduct = { name: 'Banana', quantity: 20 };
    const mockResponse = { id: '2', ...newProduct };
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await api.addProduct(newProduct);
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  });

  it('addProduct should throw an error on failed request', async () => {
    const newProduct = { name: 'Banana', quantity: 20 };
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    await expect(api.addProduct(newProduct)).rejects.toThrow('HTTP error! status: 400');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  });

  it('updateProductQuantity should make a PUT request and return data', async () => {
    const updatedProduct = { id: '1', name: 'Apple', quantity: 15 };
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => updatedProduct,
    });

    const response = await api.updateProductQuantity('1', 15);
    expect(response).toEqual(updatedProduct);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/products/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: 15 }),
    });
  });

  it('updateProductQuantity should throw an error on failed request', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(api.updateProductQuantity('1', 15)).rejects.toThrow('HTTP error! status: 404');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/products/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: 15 }),
    });
  });

  // TODO: Add a test case to check how `fetchProducts` handles an empty response.
  it('fetchProducts should handle an empty response', async () => {
    // ... 
  });

  // TODO: Add a test case for `addProduct` with different content types (e.g., missing headers).
  it('addProduct should handle requests with missing Content-Type', async () => {
    // ...
  });

  // TODO: Add a test case for `updateProductQuantity` with invalid data in the request body.
  it('updateProductQuantity should handle invalid request body', async () => {
    // ...
  });
});