import { Stripe } from 'stripe';
import ButtonCheckout from '../components/ButtonCheckout';

// Function to load prices from Stripe
async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Retrieve the list of prices
  const pricesData = await stripe.prices.list();

  // Map the prices to include the product names
  const pricesWithProductNames = await Promise.all(
    pricesData.data.map(async (price) => {
      // Retrieve the product details
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        productName: product.name,
      };
    })
  );

  return pricesWithProductNames;
}

// PricingPage component
async function PricingPage() {
  // Call loadPrices to fetch prices with product names
  const prices = await loadPrices();

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <header>
          <h1 className="text-center my-5">Pricing</h1>
        </header>
        <div className="flex gap-x-2">
          {prices.map((price) => (
            <div key={price.id} className="bg-slate-300 mb-2 p-4 rounded-md">
              <h3>{price.productName}</h3>
              <h2 className="text-3xl font-bold">
                <p>
                  Precio: {(price.unit_amount / 100).toFixed(2)}{' '}
                  {price.currency.toUpperCase()}
                </p>
              </h2>
              <ButtonCheckout priceId={price.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
