import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import "./Footer.scss";
import creditimg from '../../assets/creditcardicons.png'

function Footer() {
  return (
    <div className='Footer'>
      <div className='container'>
        <div className='content'>
          <div className='footer-left'>
            <h3 className='title'>Follow us</h3>
            <ul className='follow'>
              <li className='hover-link center'>
                <AiOutlineInstagram />
              </li>
              <li className='hover-link center'>
                <AiOutlineFacebook />
              </li>
              <li className='hover-link center'>
                <AiOutlineTwitter />
              </li>
            </ul>
          </div>
          <div className='footer-right'>
            <h3 className='title'>My Company</h3>
            <ul className='company'>
              <li className='hover-link'>Contact us</li>
              <li className='hover-link'>Privacy Policy</li>
              <li className='hover-link'>Terms & Condition</li>
            </ul>
          </div>
        </div>
        <div className="subFooter">
          <div className="credit-card-img">
            <img src={creditimg} alt="" />
          </div>
          <p>Copyright {new Date().getFullYear()} 𐩑 <strong>Posterz.</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
