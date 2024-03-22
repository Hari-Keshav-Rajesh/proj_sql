"use client"

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import tags from "@/config/tags";
import books from "@/config/books";
import BookCard from "@/components/bookCard";

export default function Books() {
  const [tag, setTag] = useState("");

  return (
    <div className="mt-10 lg:mt-16 pb-c3 px-6 xl:px-16">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="text-4xl font-bold">Infinite Chronicles</div>
          <div>
            <Select onValueChange={setTag}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem
                    key={tag.id}
                    value={tag.name}
                  >
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
            {books
              .filter((book: any) => {
                if(tag === "all books") 
                  return true
                return book.tags.includes(tag)
              })
              .map((book: any) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  tags={book.tags}
                  rating={book.rating}
                  stock={book.stock}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
