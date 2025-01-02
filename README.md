# E-COMMERCE-REACT
**REACT FULL STACK APP**

**Description**
This project is a React-based  full stack application designed to manage products in an e-commerce system. The app allows users to view, add, update, and delete products. Users can also manage the categories, display a list of all products, and modify product information. This application uses a component-based architecture, where each component is responsible for specific tasks such as product management, user management, and others.

**Features**

Product Management:

Display a list of products.
Option to add new products to the system.
Option to update product information (name, price, category, etc.).
Option to delete products from the system.
Category Management:

Display a list of categories.
Option to add new categories.
Option to edit and delete existing categories.
User Management:

Display a list of users.
Option to view user details.
Option to update user details.
Dynamic Table:

Display product details in a dynamic table format.
Search Functionality:

Users can search products by name, price, or category.
Responsive UI:

Built with React and styled using Material-UI and custom CSS for responsiveness.
Technologies Used:

React: A JavaScript library for building user interfaces.
Redux: For managing the application state and data flow.
Material-UI: A popular React UI framework for building modern and responsive web applications.
CSS: Used for custom styling of components.
Axios: For making HTTP requests to fetch data from the backend or external APIs.
Git: For version control.

**Project Structure:**

src/:
  ├── App.jsx                 // Main entry point for the application
  ├── Admin_Categories.jsx    // Component for managing categories
  ├── Admin_Product.jsx       // Component for managing individual products
  ├── Admin_Products.jsx      // Component for listing products
  ├── AdminPage.jsx           // Admin dashboard for managing users and products
  ├── DynamicTable.jsx        // Dynamic table for displaying product details
  ├── Customers_HomePage.jsx  // Customer home page component
  ├── Customer_EditUser.jsx   // Component for editing user details
  ├── Customer_MyOrderPage.jsx// Page for managing customer orders
  ├── LogInPage.jsx           // Login page for accessing the application
  ├── RegisterUserPage.jsx    // Page for registering new users
  ├── PieChart.jsx            // Component for displaying pie charts
  ├── BarChart.jsx            // Component for displaying bar charts
  └── rootReducer.js          // Centralized reducer for managing app state

**Features in Detail**

Product Management

Display Products: View a list of all products in the system.
Add Product: Users can add new products by filling out the necessary fields like title, price, category, and image URL.
Edit Product: Users can modify existing product details such as price, title, and category.
Delete Product: Users can remove products from the list.
Category Management

Add Category: Admins can add new categories to group products.
Edit Category: Admins can edit existing category names.
Delete Category: Admins can delete categories, but products within them must be reassigned.
User Management

Display User List: Admin can view a list of all users.
Edit User Details: Admin can update user information such as name and email.
Delete User: Admin can remove users from the system.
Dynamic Table

The table displays product details and allows for easy manipulation of data.
Search Functionality

Users can search for products by name, price, or category to easily find relevant items.

**How to Run the Project**

**Clone the repository:**
git clone <repository-url>

**Navigate to the project directory:**
cd <react_redux_finalproj>

**Install dependencies:**
npm install

**Run the application:**
npm start
This will start the development server and open the application in your default browser.
