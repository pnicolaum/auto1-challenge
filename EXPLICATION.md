# Bakery App – Auto1 Frontend Challenge Pablo Nicolau

## Introduction
This application allows users to browse and order bakery products, fully meeting the functional requirements outlined in the challenge.

## Demo / How to Run
I have deleted all the node modules to zip it

1. Start the API server:
```bash
cd server
npm install
npm run start
```

2. Start the API server:
```bash
cd client
npm install
npm start
```
The app will be accessible at: http://localhost:3000/


## Product Requirements
All requirements have been fully implemented:

- [x] I want to see a list of all products the bakery offers.
- [x] For each product I want to see:
    - [x] Product name
    - [x] Product thumbnail
    - [x] Product price
- [x] For each product I want to be able: 
  - [x] to select the amount I want to order
  - [x] to not select more items than are available
- [x] I want to see the total price of all my selected products.
- [x] I want to see a "disabled" state if a product is out of stock.
- [x] I want to see a success page once I ordered
- [x] I want to be able to submit multiple orders

## UI Comments

- The UI is composed mainly of two reusable components:
 - CardProducts: Displays each product’s details and quantity controls.
 - CardOrder: Shows selected products and order summary.

- The scrollbar for the products list is visually hidden to match the design, but users can still scroll through all products smoothly.

- Bootstrap 5 was used for responsive layout and to maintain design consistency as.

## Additional Features
- Added a collapsible section to show detailed order information, allowing users to expand or collapse the summary as needed.

## Notes
- Relocated images to the client’s assets folder for easier access.