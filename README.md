# Take-Home Coding Assessment: AI-Assisted Simple Inventory System (React/TypeScript + Node.js/TypeScript)

Welcome!

This assessment evaluates your ability to build a simple full-stack application using React/TypeScript for the frontend and Node.js/TypeScript for the backend, while effectively collaborating with GitHub Copilot within VS Code. [cite: 2] Our expectation is that you leverage Copilot to help you with various aspects of the project. [cite: 3]

## Instructions:

### Setup:
To clone the Starter Project, you will first need to confirm you will be committing to doing the exercise. [cite: 4] Once we have your email confirmation, we will grant your GitHub account read access to the private repository. [cite: 5] After receiving confirmation follow these instructions: Intern Take Home Assessment - GitHub Instructions [cite: 6]

Use VS Code as your primary code editor with GitHub Copilot enabled. [cite: 6] If you have been utilizing Github-Copilot already, it is recommended that you create a new account to ensure you don’t run into usage limitations. [cite: 7] Please send us your new username if you create a new account. [cite: 8]

### Screen Recording and Audio Narration:
Please complete the assessment by recording your screen and providing an audio narration of your thought process while recording. [cite: 9] You are welcome to use any screen recording software of your choice (webcam not required). [cite: 10]

Instructions on how to do the screen and audio recording: [cite: 11]
* Open up your screen recording software to begin recording (see recommended recording tools below). [cite: 11]
* Please share your entire desktop. [cite: 11]
* Ensure your VS Code and Copilot interactions are clearly visible. [cite: 12]
* Narrate your thought process and how you're using Copilot throughout the assessment. [cite: 13]
* Limit your video to one hour maximum. [cite: 13]
* If you have not finished the entire assessment, just share what you were able to complete. [cite: 14]
* Submit your video in the google form from our email. [cite: 15]

### Technical Requirements:
* Ensure you have Node.js and npm (or yarn) installed on your system. [cite: 16]
* **Backend:** You will be working within the provided Node.js/TypeScript backend. [cite: 17]
* **Frontend:** You will be working within the provided React/TypeScript frontend. [cite: 18]
* **Database:** You will use an in-memory data structure (like a JavaScript object or Map) within your Node.js backend for simplicity within the time constraint. [cite: 19] You do not need to set up a separate PostgreSQL database for this simplified version. [cite: 20]
* **Tests:** Ensure all the code has the appropriate tests included in correctly corresponding test files (you may need to create them). [cite: 21]
* **Commits:** Commit your code changes frequently to your local Git repository with clear and descriptive commit messages. [cite: 22] Push your changes to the remote repository regularly. [cite: 23]
* **Code Submission:** Once you have completed the assessment (or the allocated time is up), please provide a link to your GitHub repository in the google form. [cite: 23]

## Specific Tasks:

### Initial Setup and Code Understanding (with Copilot Assistance):
* Use Copilot to help you understand the structure of the provided frontend and backend folders and their initial files. [cite: 24]
* Ask Copilot to explain the purpose of key files and functions (e.g., `backend/src/index.ts`, `frontend/src/App.tsx`, `frontend/src/api.ts`). [cite: 25]
* Use Copilot to generate basic type definitions in `frontend/src/types.ts` for a `Product` object (including `id: string`, `name: string`, `quantity: number`). [cite: 26]
* Use Copilot to add comments to the existing code in both the frontend and backend to explain its functionality. [cite: 27]
* Review and refine the Copilot-generated comments. [cite: 28]

### Implementing Backend Logic (with Copilot Guidance):
**Task:** With Copilot's assistance, implement the logic within `backend/src/index.ts` for the following API endpoints:
* `GET /api/products`: Returns a JSON array of all products in the in-memory store. [cite: 29]
* `POST /api/products`: Accepts a JSON object `{ name: string, quantity: number }`, creates a new product with a unique ID, adds it to the in-memory store, and returns the newly created product. [cite: 30]
* `PUT /api/products/:id`: Accepts a JSON object `{ quantity: number }`, updates the quantity of the product with the given ID, and returns the updated product or a 404 if not found. [cite: 31]

**Evaluation Focus:** How well do you guide Copilot to create the data structure and the API logic? [cite: 32] Do you understand Copilot's suggestions? Do you ask clarifying questions or provide specific instructions? [cite: 32] Do you ensure the code meets the requirements? [cite: 33]

### Connecting Frontend to Backend (API Calls with Copilot):
**Task:** With Copilot's help, implement the functions in `frontend/src/api.ts` (`fetchProducts`, `addProduct`, `updateProductQuantity`) to correctly make API calls to the backend endpoints you implemented in the previous step. [cite: 34]

**Evaluation Focus:** How effectively do you guide Copilot to write the fetch requests with the correct methods, headers, and bodies? [cite: 35] Can you understand and integrate Copilot's suggestions for handling responses? [cite: 35] Do you test if the frontend can successfully communicate with the backend? [cite: 36]

### Displaying and Adding Products (UI Interaction with Copilot):
**Task:** Use Copilot to help you render the list of products fetched from the backend in the `ProductList` component. [cite: 37] Also, use Copilot to implement the functionality in the `AddProductForm` to send new product data to the backend's `POST /api/products` endpoint and update the displayed list. [cite: 38] You may need to manage state in `frontend/src/App.tsx`. [cite: 39] Additionally, implement the `<UpdateQuantityForm>` component and the `handleQuantityUpdated` function within `frontend/src/App.tsx`. [cite: 39] This form should allow users to update the quantity of an existing product via the `PUT /api/products/:id` endpoint. [cite: 40] The `handleQuantityUpdated` function will be responsible for making the API call and updating the product list in the UI upon a successful update. [cite: 41]

**Evaluation Focus:** How well do you guide Copilot to manipulate React state and props to display data? [cite: 42] Can you use Copilot to handle form submission and trigger the API calls? [cite: 43] Do you review Copilot's UI code for correctness and best practices? [cite: 44]

### Advanced Feature with Copilot Assistance: Basic Backend Validation:
**Task:** With Copilot's help, implement basic validation in the `POST /api/products` endpoint in your backend (`backend/src/index.ts`) to ensure that the `name` is not empty and the `quantity` is a positive number. [cite: 45] If validation fails, the backend should return a 400 status code with an appropriate error message. [cite: 46] Update the frontend `AddProductForm` (with Copilot assistance) to display this error message to the user if the product addition fails due to validation. [cite: 47]

**Evaluation Focus:** How do you prompt Copilot to add the validation logic? [cite: 48] Can you understand Copilot's approach to error handling? How do you guide Copilot to update the frontend to handle and display the error message? [cite: 49]

### Architectural Discussion with Copilot as a Thought Partner:
**Task:** Imagine this inventory application needs to persist data even after the backend server restarts. [cite: 50] Engage in a "discussion" with Copilot. Ask it to suggest potential ways to achieve data persistence (e.g., using a file, a simple database). [cite: 51] Discuss the pros and cons of Copilot's suggestions, and briefly explain which approach you might consider for a more robust application and why. [cite: 52] Document this brief discussion (your prompts and Copilot's key suggestions) in a separate section of your `README.md`. [cite: 53]

**Evaluation Focus:** How effectively do you use Copilot as a thought partner to explore architectural concepts? [cite: 54] Do you ask relevant questions? Can you briefly evaluate Copilot's suggestions? [cite: 55]

## Key Evaluation Points (Beyond Task Completion):
* Prompt Engineering [cite: 56]
* Comprehension of AI Suggestions [cite: 56]
* Code Review and Refinement [cite: 56]
* Debugging with AI [cite: 56]
* Narrative and Explanation [cite: 56]
* Commit History [cite: 56]

Good luck, and we look forward to seeing your approach!