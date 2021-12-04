import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import Checkout from './Checkout';

const stripePromise = loadStripe("pk_test_51IvzPTHCPXeG3jwI7L4l9Xr48JVXsKuypvrmf63PBQsysbkJ3lT9m69osXGvpHE0ecbfbNtuFR1FTmep5BCnxEn600fUUOBJCk")

function App() {
  return (
    <div className="app">
      <Elements stripe = {stripePromise}>
        <Checkout />
      </Elements>
    </div>
  );
}

export default App;
