## Simple Inventory Management 
This is a simple full-stack inventory management system built using **React** and **TypeScript** on the frontend, and **Node.js** with **Express** and **TypeScript** on the backend. It allows users to add new products and update quantities in real-time using a temporary in-memory data store.

---

### Features
- Add new products with name and quantity
- Update existing product quantity
- View a list of current inventory
- In-memory data storage (no database)
- Error handling and basic form validation
- Vitest test coverage for backend endpoints
- Built and tested with GitHub Copilot assistance

---

### Project Structure

This structure only includes files I made changes in. The folder contains a lot of other files as well, not included in the structure

```plaintext
takehome-assessment/
│
├── backend/
│   └── src/
│       ├── index.ts           
│       └── __tests__/        
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.tsx            
│       ├── AddProductForm.tsx 
│       ├── ProductList.tsx     
│       └── api.ts           

```
##### Clone the repository
git clone https://github.com/richa707/highspot.git
cd takehome-assessment

##### Install backend dependencies
cd backend
npm install

##### Install frontend dependencies
cd ../frontend
npm install

### Discussion with CoPilot
To ensure inventory data persists even after the backend server restarts, I explored various data persistence options through a discussion with GitHub Copilot. I asked: “How can I make sure my inventory data persists after a backend restart?”

Copilot offered several suggestions.

The first option was file-based persistence, where products are saved to a JSON file (such as products.json) every time they are updated, and the data is loaded from that file when the server starts. This approach is simple, requires no external dependencies, and is sufficient for small-scale prototypes. However, it's not efficient for larger datasets, carries a risk of file corruption if the server crashes during a write, and does not support concurrent access or complex queries.

Next, Copilot suggested using a simple database like SQLite. With SQLite, products would be stored in a relational table, and SQL queries would be used to read and write data. This solution is more robust than using flat files, supports concurrent access and transactions, and is still relatively easy to set up. The only drawbacks are the additional dependency and slightly more complex setup compared to a JSON file.

Finally, Copilot recommended using a production-grade database such as PostgreSQL or MongoDB. These systems are scalable and reliable, support advanced queries, indexing, and concurrent access, and are ideal for larger or production-level applications. The trade-off is that they require setup, configuration, and a greater level of complexity.

In evaluating these options, I concluded that for a small or mid-size application like this inventory app, SQLite provides the best balance between simplicity and reliability. However, for a more scalable and production-ready solution, I would choose PostgreSQL due to its structure, strong data integrity features, and powerful querying capabilities.

**-> Here is a summary of the conversation:**

*Prompt:*

"How can I make sure my inventory data persists even after the backend server restarts?"

*Copilot’s Suggestions:*

“You can write the products to a JSON file and read from it on startup.”

“Consider using a lightweight database like SQLite for better reliability and concurrent access.”

“For production, use a full-featured database like PostgreSQL or MongoDB.”

*My evaluation:*

File-based storage is easy but fragile. SQLite is a practical middle ground for small applications. For long-term robustness and scalability, using a production-grade database like PostgreSQL is the preferred approach.
