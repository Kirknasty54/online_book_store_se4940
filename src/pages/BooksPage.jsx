import Carousel from "../components/Carousel.jsx";
import Content from "../components/Content.jsx";
//import testbook_data from "../testdata/testbook_data.js";
import BookCard from "../components/BookCard.jsx";
import {booksApi} from "../api/TanStackClient.js";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

export default function BooksPage() {
    const {data: books, isLoading, isError, error} = useQuery({
        queryKey: ["books"],
        queryFn: booksApi.getAll
    })
    console.log("Returned books" + books);

    if(isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-white text-xl font-semibold">Loading books...</p>
                </div>
            </div>
        )
    }
    if(isError){return <p> Error {error}</p>}

    return(
        <div className={"items-center justify-center text-center"}>
            <Content children={<Carousel>
                {books?.map((book)=> (
                    <BookCard key={book.id} item={book}/>
                    ))}
            </Carousel>
            }>
            </Content>
        </div>
    )
}