import React from 'react';

interface ProductProps {
  img: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  onClick: () => void;
}

const Product: React.FC<ProductProps> = ({ img, name, description, price, quantity, onClick }) => {
  return (
    <div className="media product">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={img} alt={name} />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">{name}</h4>
        <p>{description}</p>
        <span className="price">{price} USD</span>
        <p>Quantity: {quantity}</p>
        <button className="btn btn-primary" onClick={onClick} disabled={quantity === 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
