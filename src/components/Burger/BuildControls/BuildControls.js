import React from 'react';
import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.css";

const controls = [
  {label:'Salad',type:'salad'},
  {label:'Bacon',type:'bacon'},
  {label:'Cheese',type:'cheese'},
  {label:'Meat',type:'meat'},
]

const buildControls = (props) => (
  <div className='BuildControls'>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(elem => (
      <BuildControl 
        added={() => props.ingredientAdded(elem.type)} 
        key={elem.label} 
        label={elem.label}
        removed={() => props.ingredientRemoved(elem.type)}
        disabled={props.disabled[elem.type]}
      />
    ))}
    <button className='OrderButton'onClick={props.ordered} disabled={!props.purchasable}>ORDER NOW</button>
  </div>
)

export default buildControls;