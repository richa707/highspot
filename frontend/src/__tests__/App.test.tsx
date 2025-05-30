import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App'; // Adjust the path to your App component
import * as api from '../api'; // Adjust the path to your API functions

// Mock the API functions
vi.mock('../api', () => ({
  fetchProducts: vi.fn(),
  addProduct: vi.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render "Loading products..." initially', () => {
    (api.fetchProducts as Mock).mockResolvedValue([]);
    render(<App />);
    expect(screen.getByText('Loading products...')).toBeTruthy();
  });

  it('should render product list when products are fetched', async () => {
    const mockProducts = [{ id: '1', name: 'Apple', quantity: 10 }];
    (api.fetchProducts as Mock).mockResolvedValue(mockProducts);

    render(<App />);
    await waitFor(() => screen.getByText('Current Inventory'));
    expect(screen.getByText('Apple - Quantity: 10')).toBeTruthy();
  });

  it('should call addProduct when the form is submitted', async () => {
    (api.fetchProducts as Mock).mockResolvedValue([]);
    (api.addProduct as Mock).mockResolvedValue({ id: '2', name: 'Banana', quantity: 20 });

    render(<App />);
    await waitFor(() => screen.getByText('Add New Product'));

    const nameInput = screen.getByLabelText('Name:');
    const quantityInput = screen.getByLabelText('Quantity:');
    const addButton = screen.getByText('Add Product');

    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(quantityInput, { target: { value: '5' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(api.addProduct).toHaveBeenCalledWith({ name: 'Test Product', quantity: 5 }));
  });

  it('should display an error message if fetching products fails', async () => {
    (api.fetchProducts as Mock).mockRejectedValue(new Error('Failed to fetch products'));

    render(<App />);
    await waitFor(() => screen.getByText('Failed to fetch products'));
    expect(screen.getByText('Failed to fetch products')).toBeTruthy();
  });

  // TODO: Add a test case to ensure the product list updates after a new product is added.
  // This will likely involve mocking `api.addProduct` and then checking if `api.fetchProducts` is called again.
  it('should update product list after adding a new product', async () => {
      // Assuming fetch is called again
  });

  // TODO: Add a test case to check the loading state after adding a product.
  it('should show loading state after adding a product', async () => {
    // ... Implement this test case
  });

  // TODO: Add a test case to handle errors when adding a product.
  it('should display an error if adding a product fails', async () => {
    // ... Implement this test case
  });
});