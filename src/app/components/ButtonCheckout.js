"use client";

function ButtonCheckout({ cart }) {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
      onClick={handleCheckout}
    >
      Proceder al Pago
    </button>
  );
}

export default ButtonCheckout;
