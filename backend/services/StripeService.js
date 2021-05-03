const stripe = require('stripe')('sk_test_51IgNAKFCd7OP6oqZU6xxPXUYXBAqR0uZmGwWKtT0mlhgIy9GlD547L8cOlJaADEHg9dCq6j2J3EHuU09tQL4u09Y00EnuOJh8V');

class StripeService {
    static async payment(res) {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Stubborn Attachments',
                                images: ['https://i.imgur.com/EHyR2nP.png'],
                            },
                            unit_amount: 2000,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `http://localhost:3001?success=true`,
                cancel_url: `http://localhost:3001?canceled=true`,
            });
            res.json({ id: session.id });
        } catch (e) {
            console.log(e);
            console.log('Error in session')
        }
    }
}

module.exports = StripeService;
