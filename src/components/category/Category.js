import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.scss";
function Category({ category }) {
  const navigate = useNavigate();

  return (
    <div
      className='Category'
      onClick={() => navigate(`/category/${category?.attributes.key}`)}
      style={{
        width: "32%",
        aspectRatio: "16/9",
        backgroundSize: "cover",
        backgroundImage: `url(${category.attributes.image?.data.attributes.url})`
      }}
    >
      <div className='content1 center'>
        <h3 className='heading'>{category.attributes.title}</h3>
      </div>
    </div>
  );
}

export default Category;
