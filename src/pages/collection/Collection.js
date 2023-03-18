import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/product/Product";
import { useSelector } from "react-redux";
import "./Collection.scss";
import { SlArrowDown } from "react-icons/sl";
import { axiosClient } from "../../utils/axiosClient";
function Collection() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  const navigate = useNavigate();
  const params = useParams();

  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const sortOptions = [
    {
      value: "Price - Low to High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];
  const [sortBy, setSortBy] = useState(sortOptions[0].sort);
  async function fetchProducts() {
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    // console.log(response.data.data);
    setProducts(response.data.data);
  }

  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchProducts();
    // api call
  }, [params, sortBy]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  function handleSorting(e) {
    const sortKey = e.target.value;
    setSortBy(sortKey);
  }

  return (
    <div className='Categories'>
      <div className='container'>
        <div className='header'>
          <div className='info'>
            <h2>Explore all Print and Artwork</h2>
            <p>
              India's largest collection of wall posters for your bedroom,
              living room, study room, kitchen and posters & art prints with
              highest quality and lowest price.
            </p>
          </div>
          <div className='sort-by'>
            <div className='sort-by-container'>
              <h3 className='sort-by-text'>Sort By</h3>
              <div className='select'>
                <select name='sort-by' id='sort-by' onChange={handleSorting}>
                  <SlArrowDown className='arrow' />
                  {sortOptions.map((item) => (
                    <option className="opt" key={item.sort} value={item.sort}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='filter-box'>
            <div className='category-filter'>
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className='filter-radio'>
                  <input
                    name='category'
                    value={item.attributes.key}
                    type='radio'
                    id={item.id}
                    onChange={updateCategory}
                    checked={item.attributes.key === categoryId}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='products-box'>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
