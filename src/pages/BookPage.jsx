import {useQuery} from "@tanstack/react-query";
import {booksApi} from "../api/TanStackClient.js";
import {useParams} from "react-router-dom";
import {useContext, useState} from "react";

import {CartContext} from "../CartContext.jsx";

export default function BookPage() {
    const {isbn_id} = useParams();
    const {addToCart} = useContext(CartContext);
    const [added, setAdded] = useState(false);

    const {data: book, isLoading, isError, error} = useQuery({
        queryKey: ["book", isbn_id],
        queryFn: () => booksApi.getById(isbn_id),
        enabled: !!isbn_id
    })

    if(isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-white text-xl font-semibold">Loading book details...</p>
                </div>
            </div>
        )
    }

    if(isError) {
        return <div className="text-center text-white mt-10">Error loading book: {error.message}</div>
    }

    if(!book) {
        return <div className="text-center text-white mt-10">Book not found</div>
    }

    return(
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <img src={book.image_url_small} alt={book.title} className="w-full rounded-lg shadow-md"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                        <p className="text-xl text-gray-600 mb-2">by {book.author}</p>
                        <p className="text-gray-500 mb-4">{book.publisher} {book.year_of_publication && `(${book.year_of_publication})`}</p>
                        <p className="text-3xl font-bold text-blue-600 mb-4">${book.price}</p>

                        {book.description && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                                <p className="text-gray-700 leading-relaxed">{book.description}</p>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                console.log('Adding book to cart:', book);
                                addToCart(book);
                                setAdded(true);
                                setTimeout(() => setAdded(false), 2000);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
                            {added ? '✓ Added to Cart!' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}