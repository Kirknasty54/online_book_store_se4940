import Carousel from "../components/Carousel.jsx";
import Content from "../components/Content.jsx";
import testbook_data from "../testdata/testbook_data.js";
import BookCard from "../components/BookCard.jsx";

export default function BooksPage() {
    return(
        <div className={"items-center justify-center text-center"}>
            <Content children={<Carousel>
                {testbook_data.map((book)=> (
                    <BookCard item={book}/>
                    ))}
            </Carousel>
            }>
            </Content>
        </div>
    )
}