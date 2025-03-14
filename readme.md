# API Server in Node.js Using HTTP Module for Sraping Google sites and booking

This is a simple CRUD (Create, Read, Update, Delete) API server implemented in Node.js using the HTTP module. The server manages a collection of products and provides endpoints to perform CRUD operations on these products.

## Prerequisites

Before running the server, ensure you have Node.js installed on your machine. If not, you can download and install it from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Clone the repository
2. Run the project:

You can run the project using either regular Node.js or nodemon for automatic server restarts during development.

**Using Node.js:**

`node server.js`

**Using nodemon (recommended for development):**

`nodemon server.js`

## Endpoint

We have 2 endpoints:

**Google sites**
- (get) http://localhost:3000/google-sites
    - Parameters: url 

Example: http://localhost:3000/google-sites?url=https://www.google.com.my/travel/hotels/sachsenheim-hotels/entity/ChcIwcmYy7fAwZsWGgsvZy8xdGRrZmx5ehAB/reviews


**Booking**
- (get) http://localhost:3000/booking
    - Parameters: url

Example: http://localhost:3000/booking?url=

------------

The server will be running at http://localhost:3000 (or your specified port).