"use client"

import { useEffect,useState } from "react";

import BorrowedBookCard from "@/components/borrowedBookCard";

import WishlistBookCard from "@/components/wishlistBookCard";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Link from "next/link"

import Cookies from "js-cookie";

export default function Personal(){

  const [token, setToken] = useState(true);
    const borrowedBooks = [
      {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        tags: ['fantasy', 'fiction'],
        stock: 0,
        rating: 4.75,
        description: 'A philosophical novel about a young Andalusian shepherd named Santiago who travels from Spain to Egypt in search of a treasure hidden in the pyramids.'
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        tags: ['fiction', 'drama'],
        stock: 15,
        rating: 4.2,
        description: 'A Pulitzer Prize-winning novel that explores racial injustice and moral growth through the eyes of a young girl named Scout Finch in the American South.'
    },
    {
        id: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        tags: ['fiction', 'classics'],
        stock: 20,
        rating: 4.5,
        description: 'A tragic love story set in the roaring 1920s, depicting the pursuit of wealth, decadence, and the American Dream through the eyes of Jay Gatsby.'
    }
    ]

    const wishlistBooks = [
      {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        tags: ['fantasy', 'fiction'],
        stock: 0,
        rating: 4.75,
        description: 'A philosophical novel about a young Andalusian shepherd named Santiago who travels from Spain to Egypt in search of a treasure hidden in the pyramids.'
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        tags: ['fiction', 'drama'],
        stock: 15,
        rating: 4.2,
        description: 'A Pulitzer Prize-winning novel that explores racial injustice and moral growth through the eyes of a young girl named Scout Finch in the American South.'
    },
    {
        id: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        tags: ['fiction', 'classics'],
        stock: 20,
        rating: 4.5,
        description: 'A tragic love story set in the roaring 1920s, depicting the pursuit of wealth, decadence, and the American Dream through the eyes of Jay Gatsby.'
    }
    ]

    useEffect(() => {
        const token = Cookies.get('token');
        if(token === 'view'){
          setToken(false);
        }
    })

    if(token === false){
        return(
            <div className="min-h-96 flex flex-col justify-center">
              <h1 className="block h-full p-4 text-center text-6xl font-bold">
                Please Log In To View This Page
              </h1>
            </div>
        )
    }
    else{
      return(
          <div className="mt-20 mx-10 flex flex-col gap-16 lg:gap-24">
    
            <div className="flex flex-col gap-8 mt-c5 px-c3 pb-c3 md:mt-c1 lg:mt-c1 xl:mt-0">
              <div className="text-4xl font-bold text-primary text-center">
                  Books You Borrowed
              </div>
              <div className="flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
                  {
                    borrowedBooks.length>0 ?
                    (
                      borrowedBooks.map((book) => (
                        <BorrowedBookCard key={book.id} title={book.title} author={book.author} tags={book.tags} rating={book.rating} stock={book.stock} description={book.description}/>
                      ))
                    ) : (
                      <div className="text-lg font-bold flex justify-center">
                        No books borrowed yet
                      </div>
                    )
                  }
              </div>
            </div >
    
            <div className="flex flex-col gap-8 mt-c5 px-c3 pb-c3 md:mt-c1 lg:mt-c1 xl:mt-0">
              <div className="text-4xl font-bold text-primary text-center">
                  Your Wishlist
              </div>
              <div className="flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
                  {
                    wishlistBooks.length>0 ?
                    (
                      wishlistBooks.map((book) => (
                        <WishlistBookCard key={book.id} title={book.title} author={book.author} tags={book.tags} rating={book.rating} stock={book.stock} description={book.description}/>
                      ))
                    ) : (
                      <div className="text-lg font-bold flex justify-center">
                        Your Wishlist is empty
                      </div>
                    )
                  }
              </div>
            </div >
    
            <div className="flex justify-center">
              <AlertDialog>
    
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    Log Out
                  </Button>
                </AlertDialogTrigger>
    
                <AlertDialogContent>
                  <AlertDialogHeader>
                    Are you sure you want to log out?
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    You will be redirected to the login page.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      <Link href="/">
                        Yes
                      </Link>
                    </AlertDialogCancel>
                    <AlertDialogAction>
                      No
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
    
              </AlertDialog>
    
            </div>
    
          </div>
        );
    }

    
};