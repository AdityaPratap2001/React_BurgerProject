import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  
  state = {
    ingredients:{
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat:0
    },
    totalPrice: 4,
    canPurchase: false,
    purchasing:false
  }

  addIngredientHandler = (type) =>{
    const oldVal = this.state.ingredients[type];
    const updVal = oldVal + 1;
    const newState = {
      ...this.state.ingredients
    }
    newState[type] = updVal;
    const priceAdd = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdd;
    this.setState({totalPrice:newPrice,ingredients:newState})
    this.canPurchaseState(newState);
  }

  canPurchaseState(ingredients){

    const sum = Object.keys(ingredients)
                .map(igKey => {
                  return ingredients[igKey]
                })
                .reduce((sum,el)=>{
                  return sum + el;
                },0)
    this.setState({canPurchase:sum>0});
  }

  removeIngredientHandler = (type) => {
    const oldVal = this.state.ingredients[type];
    if(oldVal <= 0){
      return;
    }
    const updVal = oldVal - 1;
    const newState = {
      ...this.state.ingredients
    }
    newState[type] = updVal;
    const priceDec = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDec;
    this.setState({totalPrice:newPrice,ingredients:newState})
    this.canPurchaseState(newState);
  }

  purchaseHandler = () => {
    this.setState({purchasing:true});
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <div>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients}/>  
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          disabled = {disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          purchasable={this.state.canPurchase}
          ordered={this.purchaseHandler}
        />
      </div>
    );
  }
}

export default BurgerBuilder;