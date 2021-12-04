require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/pay', async (req, res) => {
    try {
        const amount = 2000;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            payment_method_types: ['card'],
            metadata: {
                name: 'value'
            }
        });
        const clientSecret = paymentIntent.client_secret;
        res.json({ clientSecret, message: 'Payment initiated successfully!' })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/stripe', (req, res) => {
    if(req.body.type === 'payment_intent.created') {
        console.log('${req.body.data.object.metadata.name} initiated payment!')
    }
    if(req.body.type === 'payment_intent.succeeded') {
        console.log('${req.body.data.metadata.name} succeeded payment!')
        // fulfillment
    }
})

app.listen(5000, () => console.log('Server is running on port 5000'))