# Todo App with Product Management

## Overview
This is a simple and feature-rich Todo app designed to help you manage tasks and products efficiently. The app includes user authentication, CRUD functionality for products, search and filter options, pagination, and more.

### Features:
1. **User Authentication**:
   - Registration and login functionality.
   - Form validation with regex for registration (name, email, password, gender, and user image).
   - Store user data in **local storage** for persistence.
   - Route protection to prevent unauthorized access.

2. **CRUD Operations for Products**:
   - Fields: Product Name, Category, SKU, Product Image, Original Price, Discount, Final Price (calculated), Timestamps (Created_at, Updated_at), and Actions (View, Edit, Delete).
   - Store product data in **local storage**.
   - View, edit, and delete products.

3. **Product Filters**:
   - Filter products by search (name and category).
   - Price range filter.
   - Sorting options (ascending and descending).
   - Pagination with 5 to 15 records per page.

4. **Home Page**:
   - A user-friendly interface to view, add, edit, or delete tasks and products.
   - Logged-in user's details are displayed in the header with a user profile icon.
   - A popup appears when the user clicks on the profile icon, showing their registered details.

## Getting Started

### Prerequisites:
1. **Node.js**: Ensure that you have Node.js installed on your machine. If not, download it from [here](https://nodejs.org/).

2. **Package Manager**: Use npm or yarn to manage project dependencies.

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/realvishalrana/product-todo-app.git

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.