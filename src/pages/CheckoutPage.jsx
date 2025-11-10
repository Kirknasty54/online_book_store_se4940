import { useState } from "react";

export default function CheckoutPage() {
    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: ""
    });

    const handleShippingChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentChange = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };

    const isFormComplete = () => {
        const shippingComplete = Object.values(shippingInfo).every(value => value.trim() !== "");
        const paymentComplete = Object.values(paymentInfo).every(value => value.trim() !== "");
        return shippingComplete && paymentComplete;
    };

    const handlePurchase = (e) => {
        e.preventDefault();
        if (isFormComplete()) {
            console.log("Processing purchase...", { shippingInfo, paymentInfo });
            // Add your purchase logic here
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

                <form onSubmit={handlePurchase} className="space-y-6">
                    {/* Shipping Information */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={shippingInfo.fullName}
                                    onChange={handleShippingChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={shippingInfo.address}
                                    onChange={handleShippingChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingInfo.city}
                                    onChange={handleShippingChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={shippingInfo.state}
                                    onChange={handleShippingChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={shippingInfo.zipCode}
                                    onChange={handleShippingChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={shippingInfo.country}
                                    onChange={handleShippingChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={paymentInfo.cardNumber}
                                    onChange={handlePaymentChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="16"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    value={paymentInfo.cardName}
                                    onChange={handlePaymentChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={paymentInfo.expiryDate}
                                    onChange={handlePaymentChange}
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={paymentInfo.cvv}
                                    onChange={handlePaymentChange}
                                    placeholder="123"
                                    maxLength="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Purchase Button */}
                    <button
                        type="submit"
                        disabled={!isFormComplete()}
                        className={`w-full py-3 px-6 rounded-md font-semibold text-white text-lg transition-colors ${
                            isFormComplete()
                                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Complete Purchase
                    </button>
                </form>
            </div>
        </div>
    );
}