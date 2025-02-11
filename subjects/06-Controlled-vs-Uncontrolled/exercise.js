////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

function CheckoutForm() {

  const [billingName, setBillingName] = useState('Giga Sagrishvili');
  const [billingState, setBillingState] = useState('GE');

  const [isSameAddress, setIsSameAddress] = useState(false);
    
  const [shippingName, setShippingName] = useState('');
  const [shippingState, setShippingState] = useState('');

  function onSameAddressChange(value) {
    setIsSameAddress(!value)
  }

  function checkoutFormSubmit(event) {
    event.preventDefault();
    const values = serializeForm(event.target, {hash: true});
    console.log(values);
  }

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={checkoutFormSubmit}>
        <fieldset>
          <legend>Billing Address</legend>
          <p>
            <label>
              Billing Name: 
              <input 
              type="text" 
              name="billingName" 
              defaultValue={billingName}
              onChange={event => setBillingName(event.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Billing State: 
              <input 
              type="text" 
              size="2" 
              name="billingState" 
              defaultValue={billingState}
              onChange={event => setBillingState(event.target.value)}
              />
            </label>
          </p>
        </fieldset>

        <br />

        <fieldset>
          <label>
            <input 
            type="checkbox" 
            defaultChecked={isSameAddress}
            onChange={() => onSameAddressChange(isSameAddress)}/> Same as billing
          </label>
          <legend>Shipping Address</legend>
          <p>
            <label>
              Shipping Name: 
              <input 
              type="text" 
              name="shippingName"
              value={isSameAddress ? billingName : shippingName}
              onChange={event => setShippingName(event.target.value)}
              readOnly={isSameAddress}
              />
            </label>
          </p>
          <p>
            <label>
              Shipping State: 
              <input 
              type="text" 
              size="2" 
              name="shippingState"
              value={isSameAddress ? billingState : shippingState}
              onChange={event => setShippingState(event.target.value)}
              readOnly={isSameAddress}
              />
            </label>
          </p>
        </fieldset>

        <p>
          <button>Submit</button>
        </p>
      </form>
    </div>
  );
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
