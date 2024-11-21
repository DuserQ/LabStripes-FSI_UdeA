import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { cart } = await request.json();

    // Validar que el carrito no esté vacío
    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 }
      );
    }

    // Crear los line_items para Stripe
    const line_items = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: 1,
    }));

    // Crear la sesión de pago
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/catalogo",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error en la API de checkout:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
