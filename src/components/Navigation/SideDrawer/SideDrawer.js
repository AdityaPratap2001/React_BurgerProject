import React from 'react';
import Logo from '../../Logo/Logo';
import './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

  let attachedClasses = ['SideDrawer','Close'];
  if(props.open){
    attachedClasses = ['SideDrawer','Open'];
  }

  return(
    <div>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className='Logo'>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </div>
  )
}

export default sideDrawer;