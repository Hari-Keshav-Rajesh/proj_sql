"use client"

import { siteConfig } from "@/config/siteconfig";

import { useState,useEffect } from "react";
import BookCard from "../bookCard";

export default function Rate() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`${siteConfig.apiURL}/allBooks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if (response.ok) {
            const data = await response.json();
            setBooks(data);
            } else {
            throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    const topBooks: any[] = books.sort((a:any, b:any) => b.Rating - a.Rating).slice(0,6);

    return (
        <div className="flex flex-col gap-8 mt-c5 px-c3 pb-c3 md:mt-c1 lg:mt-c1 xl:mt-0">
        <div className="text-4xl font-bold text-primary text-center">
            Top Rated Books
        </div>
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
            {topBooks.map((book: any) => (
                <BookCard
                key={book.book_id}
                id={book.book_id}
                title={book.Name}
                author={book.Author}
                tags={book.Genre.split(",")}
                rating={book.Rating}
                stock={book.Stock}
                description="Add description later"
              />
            ))}
        </div>
        </div >
    );
}