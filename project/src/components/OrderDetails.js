import React, { useState } from 'react';
import { fetchMagentoToken, fetchOrderDetails } from '../utils/api';

const OrderDetails = () => {
  const [inputValue, setInputValue] = useState('');
  const [token, setToken] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFetchOrderDetails = async () => {
    try {

      const token = await fetchMagentoToken();
      setToken(token);

      const details = await fetchOrderDetails(token, inputValue);

      if (details && details.items && details.items.length > 0) {
        setOrderDetails(details);
        setErrorMessage(false);
      } else {
        setOrderDetails(null);
        setErrorMessage(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    
    <div>
      <div id='header'>
        <h1>Order details checker</h1>
    <input type="text" value={inputValue} onChange={handleInputChange} id="inputText" />
    <button onClick={handleFetchOrderDetails} id="btn">Fetch Order Details</button>
    </div>

    {errorMessage && (
      <div>
        <h2>Error</h2>
        <p>No order details found for the specified order number.</p>
      </div>
    )}

    {orderDetails && !errorMessage && (
      <div>

        <h2>Details</h2>

        <hr></hr>
        <h3>Customer firstname: {orderDetails.items[0].customer_firstname}</h3>
        <h3>Customer lastname: {orderDetails.items[0].customer_lastname}</h3>
        <h3>Customer email: {orderDetails.items[0].customer_email}</h3>
        <h3>Customer country: {orderDetails.items[0].billing_address.street[0]}</h3>
        <h3>Customer city Adress: {orderDetails.items[0].billing_address.region}</h3>
        <h3>Customer telephone: {orderDetails.items[0].billing_address.telephone}</h3>

      <hr></hr>
        <h3>Created at: {orderDetails.items[0].created_at}</h3>
        <h3>Total: {orderDetails.items[0].base_grand_total}$</h3>
        <h3>Status: {orderDetails.items[0].status}</h3>
        {/* <pre>{JSON.stringify(orderDetails, null, 2)}</pre> */}
      </div>
    )}
  </div>
);
};


export default OrderDetails;