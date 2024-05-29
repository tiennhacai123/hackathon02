import React, { useState } from 'react';
import ShoppingCart from './ShoppingCart';

interface Product {
  img: string;
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

function ShoppingCartApp() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Pizza',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicingelit!',
      img: './images/pizza.jpg',
      price: 30,
      quantity: 10,
    },
    {
      id: 2,
      name: 'Hamburger',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicingelit!',
      img: './images/hamburger.jpg',
      price: 15,
      quantity: 20,
    },
    {
      id: 3,
      name: 'Bread',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicingelit!',
      img: './images/bread.jpg',
      price: 20,
      quantity: 5,
    },
    {
      id: 4,
      name: 'Cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicingelit!',
      img: './images/cake.jpg',
      price: 20,
      quantity: 5,
    },
  ]);

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <ShoppingCart products={products} />
    </div>
  );
}

export default ShoppingCartApp;
