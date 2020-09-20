import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading : true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        this.setState({loading:false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading:false});
      });
  }

  render() {
    let form = (
      <form>
          <input className='Input' type='text' name='name' placeholder='Your Name'/>
          <input className='Input' type='emaiil' name='email' placeholder='Your email'/>
          <input className='Input' type='text' name='street' placeholder='Street'/>
          <input className='Input' type='text' name='postal' placeholder='Postal Code'/>
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
    );
    if(this.state.loading){
      form = <Spinner/>
    }
    return (
      <div className='ContactData'>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    ); 
  }
}

export default ContactData;