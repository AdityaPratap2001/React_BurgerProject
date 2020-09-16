import React, { Component } from 'react';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

  state = {
    showSideDrawer : false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer : false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer:!prevState.showSideDrawer};
    })
  }

  render(){
    return(
      <div>
        <Toolbar drawerToggleClick={this.sideDrawerToggleHandler}/>
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}
        />
        <main className='Content'>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout;