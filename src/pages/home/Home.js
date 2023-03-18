import React, { useEffect, useState } from "react";
import "./Home.scss";
import Hero from "../../components/hero/Hero";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utils/axiosClient";
import {useSelector} from 'react-redux'
import Category from "../../components/category/Category";

function Home() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [topProducts, setTopProducts] = useState(null);

  async function fetchData() {
    const topProductResponse = await axiosClient.get(
      "/products?filters[isTopPick][$eq]=true&populate=image"
    );
    console.log(topProductResponse);
    setTopProducts(topProductResponse.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []); // home component loads
  return (
    <div className='Home'>
      <Hero />
      <section className='collection container'>
        <div className='info'>
          <h2 className='heading'>Shop By Categories</h2>
          <p className='subHeading'>
            Shop from the best , our Anime and TV Posters Collection.
          </p>
        </div>
        <div className='content'>
          {categories?.map(category => <Category key={category.id} category={category}/>)}
        </div>
      </section>

      <section className='collection container'>
        <div className='info'>
          <h2 className='heading'>Our Top Picks</h2>
          <p className='subHeading'>All New Designs, Same old details.</p>
        </div>
        <div className='content'>
         {topProducts?.map(product => <Product key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}

export default Home;
