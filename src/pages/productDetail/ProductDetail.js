import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.scss";
import Loader from "../../components/loader/Loader";
import { addToCart } from "../../redux/cartSlice";
function ProductDetail() {    

  const params = useParams();
  const productKey = params.productId;
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);
  // cart.
  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[key][$eq]=${productKey}&populate=*`
    );
    if (productResponse.data.data.length > 0) {
      setProduct(productResponse.data.data[0]);
    }
  }
  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [params]);

  if (!product) {
    return <Loader />;
  }

  function handleCart() {
    dispatch(addToCart({ product: product, qty: qty }));
    setQty(0);
  }

  return (
    <div className='ProductDetail'>
      <div className='container'>
        <div className='product-layout'>
          <div className='product-img center'>
            <img src={product.attributes.image.data.attributes.url} alt='' />
          </div>
          <div className='product-info'>
            <h1 className='heading'>{product.attributes.title}</h1>
            <h3 className='price'>₹ {product.attributes.price}</h3>
            <p className='description'>{product.attributes.desc}</p>

            <div className='cart-option'>
              <div className='quantity-selector'>
                <span
                  className='btn decrement'
                  onClick={() => (qty === 0 ? 0 : setQty(qty - 1))}
                >
                  -
                </span>
                <span className='quantity'>{qty}</span>
                <span className='btn increment' onClick={() => setQty(qty + 1)}>
                  +
                </span>
              </div>
              <button className='btn-primary add-to-cart' onClick={handleCart}>
                Add To Cart
              </button>
            </div>

            <div className='return-policy'>
              <ul>
                <li>
                  The product is ade to order and is typically printed in 3-6
                  working days.
                </li>
                <li>
                  Since the product is printed on demand especially for you ,
                  it's not eligible for cancellations or return.Read our return
                  policy.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
