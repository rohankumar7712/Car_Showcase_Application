# Car Showcase Application

A **full-stack MERN (MongoDB, Express.js, React.js, Node.js) application** that allows users to explore cars with dynamic filtering, while admins can manage car listings.

## Features
- **Role-Based Authentication**: Admins can add, edit, and delete car listings, while users can only view them.
- **Interactive UI**: Built with React to ensure a modern and responsive design.
- **RESTful API Integration**: Efficient CRUD operations for managing car data.
- **Optimized Image Handling**: Images are stored as URLs in MongoDB, avoiding third-party storage services.
- **Search & Filtering**: Users can easily find cars based on specific criteria.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Styled Components, Framer Motion, React Router, React Icons, React Slick, Slick Carousel
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Passport.js (Local Strategy)
- **API Handling**: Axios

## Installation
1. Clone the repository:
   ```sh
   git clone [https://github.com/MrReaper781/Car-Showcase]
   cd car-showcase
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd frontned
   npm install
   cd ../server
   npm install
   ```
3. Create a **.env** file in the server directory and add the necessary environment variables (e.g., MongoDB URI, JWT Secret).
4. Start the development server:
   ```sh
   cd server
   npm start
   ```
   In a separate terminal:
   ```sh
   cd frontend
   npm run dev
   ```

## Usage
- **Users**: Browse and view car listings.
- **Admins**: Manage car listings (add, update, delete).

## Future Enhancements
- Add user registration & profile management.
- Implement car booking or wishlist functionality.
- Enhance filtering and sorting options.

