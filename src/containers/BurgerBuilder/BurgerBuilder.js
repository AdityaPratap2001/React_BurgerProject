import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  
  state = {
    ingredients:null,
    totalPrice: 4,
    canPurchase: false,
    purchasing:false,
    loading: false,
    error: false
  }

  componentDidMount(){
    axios.get('https://react-my-burger-da27a.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients : response.data});
      })
      .catch(error =>{
        this.setState({error : true})
      })
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

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading : true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        name: 'Aditya',
        address: {
          street : 'Sector 34',
          zipCode: '201307',
          country: 'India'
        },
        email: 'test@mail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.',order)
      .then(response => {
        this.setState({loading:false ,purchasing: false});
      })
      .catch(error => {
        this.setState({loading:false ,purchasing: false});
      });
  } 

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
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

    let orderSummary = null;
    
    if(this.state.loading){
      orderSummary = <Spinner/>
    }

    let burger = this.state.error ? <p>Ingredients couldn't be loaded!</p> : <Spinner/>
    if(this.state.ingredients){
      burger = (
        <div>
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
      )
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} 
      />
    }

    return (
      <div>
        <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

export default withErrorHandler(BurgerBuilder,axios);