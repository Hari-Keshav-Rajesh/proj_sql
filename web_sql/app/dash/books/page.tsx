"use client"

import { useState,useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import tags from "@/config/tags";
import BookCard from "@/components/bookCard";
import toTitleCase from "@/config/utils/titleCase";
import { siteConfig } from "@/config/siteconfig";

import { Icons } from "@/config/icons";

import Cookies from "js-cookie";

export default function Books() {
  const [tag, setTag] = useState("all books")
  const [search,setSearch] = useState("")
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
  
  return (
    <div className="mt-10 lg:mt-16 pb-c3 px-6 xl:px-16">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-40">
            <div>
              <div className="text-4xl font-bold">Infinite Chronicles</div>
              <div className="text-sm font-light dark:font-extralight">
                Explore our wide range of books
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background px-3 py-1 lg:py-2 border-0"
            >
              <Icons.search className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              <Input 
              placeholder="Search for books"
              className="w-fit lg:w-72"
              onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Select onValueChange={setTag} defaultValue="all books">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem
                    key={tag.id}
                    value={tag.name}
                  >
                    {toTitleCase(tag.name)}
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
                return book.Genre.includes(tag)
              })
              .filter((book: any) => {
                if(search === "")
                  return true
                return book.Name.toLowerCase().includes(search.toLowerCase())
              })
              .sort((a: any, b: any) => b.Rating - a.Rating)
              .map((book: any) => (
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
        </div>
      </div>
    </div>
  );
}
