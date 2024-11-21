"use client";
import React, { useState } from "react";
import ButtonCheckout from "C:/Users/sh529/Documents/labstripe/src/app/components/ButtonCheckout.js";

const products = [
  { id: "prod_1", name: "Producto A", price: 1000, currency: "USD" },
  { id: "prod_2", name: "Producto B", price: 2000, currency: "USD" },
  { id: "prod_3", name: "Producto C", price: 3000, currency: "USD" },
];

export default function CatalogoPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Catálogo de Productos</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg shadow-sm flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-lg">
              {(product.price / 100).toFixed(2)} {product.currency}
            </p>
            <button
              className="mt-3 bg-blue-500 text-white py-1 px-4 rounded"
              onClick={() => addToCart(product)}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="my-2">
                  {item.name} - ${(item.price / 100).toFixed(2)} {item.currency}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xl font-semibold">
              Total: ${(total / 100).toFixed(2)} {products[0].currency}
            </p>
            <ButtonCheckout cart={cart} />
          </div>
        )}
      </div>
    </div>
  );
}
