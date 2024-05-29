import React from 'react';

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  onUpdate: (quantity: number) => void;
  onDelete: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, quantity, onUpdate, onDelete }) => {
  return (
    <tr>
      <td>{name}</td>
      <td className="text-center">{price} USD</td>
      <td>
        <input
          name={`cart-item-quantity-${name}`}
          type="number"
          value={quantity}
          onChange={e => onUpdate(parseInt(e.target.value))}
          min="1"
        />
      </td>
      <td className="d-flex justify-content-between">
        <button className="btn btn-info btn-sm update-cart-item" onClick={() => onUpdate(quantity)}>
          Update
        </button>
        <button className="btn btn-danger btn-sm delete-cart-item" onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
