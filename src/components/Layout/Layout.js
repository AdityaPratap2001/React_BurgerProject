import React from 'react';
import Aux from '../../hoc/Auxillary';
import './Layout.css';

const layout = (props) => (
    <Aux>
      <div>toolbar, Sidedrawer, Backdrop</div>
      <main className='Content'>
        {props.children}
      </main>
    </Aux>
);

export default layout;