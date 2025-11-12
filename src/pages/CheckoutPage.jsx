import { useContext, useState, useCallback, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { CartContext } from "../CartContext.jsx";
import { useNavigate } from "react-router-dom";

// Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    // Store cart in sessionStorage and localStorage when component mounts
    useEffect(() => {
        if (cart && cart.length > 0) {
            console.log('Saving cart to storage:', cart);
            sessionStorage.setItem('pendingOrder', JSON.stringify(cart));
            localStorage.setItem('checkoutCart', JSON.stringify(cart));
        }
    }, [cart]);

    // Calculate total from cart
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Fetch client secret from your backend
    const fetchClientSecret = useCallback(async () => {
        try {
            // Double-check cart is saved
            sessionStorage.setItem('pendingOrder', JSON.stringify(cart));
            localStorage.setItem('checkoutCart', JSON.stringify(cart));

            console.log('Creating checkout session with cart:', cart);

            const response = await fetch('http://localhost:8080/api/payments/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: cart,
                    amount: Math.round(total * 100), // Convert to cents
                })
            });

            const data = await response.json();
            return data.clientSecret;
        } catch (error) {
            console.error('Error fetching client secret:', error);
            throw error;
        }
    }, [cart, total]);

    const options = { fetchClientSecret };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        {cart.map((item) => (
                            <div key={item.isbn || item.isbn_id} className="flex justify-between">
                                <span>{item.title} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-2 mt-2 font-bold text-lg flex justify-between">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Stripe Embedded Checkout */}
                <div id="checkout">
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </div>
            </div>
        </div>
    );
}