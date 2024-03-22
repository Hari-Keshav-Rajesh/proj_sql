import books from "@/config/books";
import BookCard from "../bookCard";

export default function Rate() {

    const topBooks: any[] = books.sort((a, b) => b.rating - a.rating).slice(0,6);

    return (
        <div className="flex flex-col gap-8 mt-c5 px-c3 pb-c3 md:mt-c1 lg:mt-c1 xl:mt-0">
        <div className="text-4xl font-bold text-primary text-center">
            Top Rated Books
        </div>
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
            {topBooks.map((book: any) => (
                <BookCard
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    tags={book.tags}
                    rating={book.rating}
                    stock={book.stock}
                    description={book.description}
                />
            ))}
        </div>
        </div >
    );
}