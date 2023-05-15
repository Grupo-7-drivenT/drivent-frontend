import React, { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';

import Cards from 'react-credit-cards';
import Input from '../../../components/Form/Input';

export default function CreditCardPayment() {
  const [state, setState] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
 
  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.name });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setState({ ...state, [name]: value });
  };
  
  return (
    <div id="PaymentForm">
      <Cards
        cvc={state.cvc}
        expiry={state.expiry}
        focused={state.focus}
        name={state.name}
        number={state.number}
      />
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="expiry"
          placeholder="Valid Thru"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        ...
      </form>
    </div>
  );
}
