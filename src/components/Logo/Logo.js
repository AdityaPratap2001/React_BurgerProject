import React from 'react';
import './Logo.css';
import src from '../../assets/images/burger-logo.png';

const logo = (props) =>(
  <div className='Logo' style={{height:props.height}}>
    <img src={src} alt='logo'/>
  </div>
)

export default logo;