import {Link} from "react-router-dom";

export default function BookCard({item}) {
    return(
        <div className={"rounded-2xl border-white/10 transition items-center justify-center text-center"}>
            <Link to={`/books/${item.isbn_id}`}>
                <img src={item.image_url_small} alt={item.title} className={"h-40 rounded-xl object-cover mx-auto"}/>
            </Link>
            <Link to={`/books/${item.isbn_id}`}>
                <h3 className={"mt-3 text-leg font-semibold"}>{item.title}</h3>
            </Link>
            <p className={"mt-1 text-sm text-neutral-300 line-clamp-3"}>{item.author}</p>
            <p className={"mt-1 text-sm text-neutral-300 line-clamp-3"}>{item.publisher}</p>
            <p className={"mt-1 text-sm text-neutral-300 line-clamp-3"}>${item.price}</p>
        </div>
    )
}