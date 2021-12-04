import React from 'react'
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import "./Checkout.css"

function Checkout() {
    const stripe = useStripe();
    const elements = useElements();

    const pay = async () => {
        try {
          const response = await fetch('http://localhost:5000/pay', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          const data = await response.json();
          const cardElement = elements.getElement(CardElement);
          const confirmPayment = await stripe.confirmCardPayment(data.clientSecret, {
              payment_method: { card: cardElement }
          });    
          const {paymentIntent} = confirmPayment;
          if(paymentIntent.status === 'succeeded') alert('Payment Successful!');
          else alert('Payment failed!')
        } catch (err) {
            console.error(err);
            alert('Payment failed!')
        }
    }

    return (
        <div className="checkout">
            <CardElement/>
            <button onClick={pay}>Pay</button>
        </div>
    )
}

export default Checkout