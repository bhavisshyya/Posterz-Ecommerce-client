import React from "react";
import { useNavigate } from "react-router-dom";
import './Hero.scss'
function Hero() {
  const navigate = useNavigate();
  return <div className="Hero">
    <div className="hero-content center">
      <h2 className="heading">Exclusive Print and Hardwork</h2>
      <p className="subHeading">
        Exclusive art pieces
      </p>
      <button onClick={()=>navigate('/category')} className="cta btn-primary" >Explore More</button>
    </div>
  </div>;
}

export default Hero;
