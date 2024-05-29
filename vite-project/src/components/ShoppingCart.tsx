import React, { useState, useEffect } from 'react';
import Product from './Product';
import CartItem from './CartItem';

interface Product {
  img: string;
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  products: Product[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ products }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string>('');
  const [productList, setProductList] = useState<Product[]>(products);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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
    
    const updatedProductList = productList.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setProductList(updatedProductList);

    showNotification('Added to cart successfully');
  };

  const removeFromCart = (productId: number) => {
    const removedItem = cartItems.find(item => item.id === productId);
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);

    if (removedItem) {
      const updatedProductList = productList.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + removedItem.quantity } : item
      );
      setProductList(updatedProductList);
    }

    showNotification('Removed from cart successfully');
  };

  const updateCart = (productId: number, newQuantity: number) => {
    const cartItem = cartItems.find(item => item.id === productId);
    if (cartItem) {
      const updatedProductList = productList.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + cartItem.quantity - newQuantity } : item
      );
      setProductList(updatedProductList);

      const updatedCartItems = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCartItems);

      showNotification('Updated cart successfully');
    }
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 1000);
  };

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h1 className="panel-title">List Products</h1>
          </div>
          <div className="panel-body" id="list-product">
            {productList.map(product => (
              <Product
                key={product.id}
                img={product.img}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
                onClick={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
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
                  <th style={{ width: "15%" }}>Price</th>
                  <th style={{ width: "4%" }}>Quantity</th>
                  <th style={{ width: "25%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onUpdate={(quantity) => updateCart(item.id, quantity)}
                    onDelete={() => removeFromCart(item.id)}
                  />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4}>
                    There are <b>{calculateTotalQuantity()}</b> items in your shopping cart.
                  </td>
                  <td colSpan={2} className="total-price text-left">
                    {calculateTotalPrice()} USD
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="alert alert-success" role="alert" id="mnotification">
          {notification}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
