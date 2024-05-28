import React, { useState } from 'react';

interface Product {
  img:string,
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
      description: 'Lorem ipsum dolor sit amet...',
      img:'./images/pizza.jpg',
      price: 30,
      quantity: 10,
    },
    {
      id: 2,
      name: 'Hamburger',
      description: 'Lorem ipsum dolor sit amet...',
      img:'./images/Hamburger.jpg',
      price: 15,
      quantity: 20
    },
    {
      id: 3,
      name: 'Bread',
      description: 'Lorem ipsum dolor sit amet...',
      img:'./images/bread.jpg',
      price: 20,
      quantity: 5,
    },
    {
      id: 4,
      name: 'Cake',
      description: 'Lorem ipsum dolor sit amet...',
      img:'./images/Cake.jpg',
      price: 20,
      quantity: 5,
    }
  ]);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string>('');

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setNotification('Add to cart successfully');
  };

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    setNotification('Delete successfully');
  };

  const updateCart = (productId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    setNotification('Update successfully');
  };

  return (
    <div className="container">
      <div className="row">
        {products.map(product => (
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" key={product.id}>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">{product.name}</h1>
              </div>
              <div className="panel-body">
                <img className="media-object" 
                src={`images/${product.name.toLowerCase()}.jpg`} alt={product.name} />
                <p>{product.description}</p>
                <span className="price">{product.price} USD</span>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                  disabled={product.quantity === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h1 className="panel-title">Your Cart</h1>
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price * item.quantity} USD</td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={e => updateCart(item.id, parseInt(e.target.value))}
                        />
                      </td>
                      <td>
                        <button className="btn btn-info">Update</button>
                        <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}
    </div>
  );
}

export default ShoppingCartApp;
