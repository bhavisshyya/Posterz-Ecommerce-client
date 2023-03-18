import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import Cartitem from "../cartitem/Cartitem";
import { useSelector } from "react-redux";
import { BsCartX } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
function Cart({ onClose }) {

  const cart = useSelector((state) => state.cartReducer.cart);
  let totalAmount = 0;
  cart.forEach((element) => {
    totalAmount += element.price * element.quantity;
  });

  const isCartEmpty = totalAmount > 0 ? false : true;

  async function handleCheckout() {
    const response = await axiosClient.post("/orders", {
      products: cart,
    });

    // console.log(response);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: response.data.stripeId,
    });
  }

  return (
    <div className='Cart'>
      <div className='overlay' onClick={onClose}></div>
      <div className='cart-content'>
        <div className='header'>
          <h3>Shopping Cart</h3>
          <div className='close-btn' onClick={onClose}>
            {" "}
            <AiOutlineClose />
            Close
          </div>
        </div>
        <div className='cart-items'>
          {cart.map((item) => (
            <Cartitem key={item.key} cart={item} />
          ))}
        </div>
        {isCartEmpty ? (
          <div className='empty-cart-info'>
            <div className='iconz'>
              <BsCartX />
            </div>
            <h4>Cart is Empty</h4>
          </div>
        ) : (
          <div className='checkout-info'>
            <div className='total-amount'>
              <h3 className='total-msg'>Total:</h3>
              <h3 className='total-value'>₹ {totalAmount}</h3>
            </div>
            <div className='checkout btn-primary' onClick={handleCheckout}>
              Checkout Now
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
