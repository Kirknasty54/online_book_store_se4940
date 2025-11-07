import {useContext} from "react";

import {CartContext} from "../CartContext.jsx";

export default function CartPage() {
    const {cart, updateQuantity, removeFromCart} = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
                    <p className="text-gray-600 text-lg">Your cart is empty</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.isbn || item.isbn_id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                            <img
                                src={item.image_url_small}
                                alt={item.title}
                                className="w-24 h-32 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                                <p className="text-gray-600">by {item.author}</p>
                                <p className="text-lg font-bold text-blue-600 mt-2">${item.price}</p>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.isbn || item.isbn_id, item.quantity - 1)}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded"
                                        >
                                            -
                                        </button>
                                        <span className="text-gray-900 font-semibold w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.isbn || item.isbn_id, item.quantity + 1)}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.isbn || item.isbn_id)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}