import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Cartitem.scss";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeItem } from "../../redux/cartSlice";

function Cartitem({ cart, handleReset }) {
  const dispatch = useDispatch();
  return (
    <div className='Cartitem'>
      <div className='item-img'>
        <img src={cart.image} alt='' />
      </div>
      <div className='item-info-wrapper'>
        <div className='item-info'>
          <h4 className='title'>{cart.title}</h4>
          <p className='price'>₹ {cart.price}</p>
          <div className='quantity-selector'>
            <span
              className='btn decrement'
              onClick={() => dispatch(removeFromCart(cart))}
            >
              -
            </span>
            <span className='quantity'>{cart.quantity}</span>
            <span
              className='btn increment'
              onClick={() => dispatch(addToCart({ product: cart, qty: 1 }))}
            >
              +
            </span>
          </div>
          <p className='total-price'>Subtotal: ₹{cart.quantity * cart.price}</p>
        </div>
        <div className='item-remove' onClick={()=> dispatch(removeItem(cart))}>
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
}

export default Cartitem;
