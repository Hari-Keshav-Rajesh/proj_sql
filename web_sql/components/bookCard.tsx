"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'

import { Icons } from '@/config/icons'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

import { Button } from './ui/button'

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import Link from 'next/link'

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

import toTitleCase from '@/config/utils/titleCase';

import Cookies from 'js-cookie'

export default function BookCard({title, author, tags, rating, stock,description}: {title: string, author: string, tags: string[], rating: number, stock: number,description: string}){

    const fullStar = Math.floor(rating);

    const halfStar = (rating - fullStar)/0.5;

    const { toast } = useToast()

    const showTitle = title.slice(0,32);

    const showAuthor = author.slice(0, 20);

    let token = true;

    Cookies.get("token") === "view" ? token = false : token = true;

    function borrowBook(title:string){
        console.log(`Borrowed ${title}`);
    }

    function wishlistBook(title:string){
        console.log(`Added ${title} to wishlist`);
    }

    return(
        <Card className="flex h-fit w-c80 flex-col bg-card bg-opacity-70 shadow-md duration-300 ease-in-out hover:scale-100 xl:hover:scale-105 hover:bg-opacity-100 hover:shadow-lg md:w-c40 xl:w-c25">
                  <CardHeader>
                    <CardTitle className="flex flex-col justify-center">
                      <div className="flex text-2xl font-bold">
                        {
                            title.length > 32 ? `${toTitleCase(showTitle)}...` : `${toTitleCase(title)}`
                        }
                      </div>
                      <div className="text-base font-light dark:font-extralight">
                        {
                            author.length > 20 ? `by ${toTitleCase(showAuthor)}...` : `by ${toTitleCase(showAuthor)}`
                        }
                    </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-3'>
                  <div className="px-1 pb-0 pt-2">
                      {tags?.map((tag: any) => (
                        <span
                          key={tag}
                          className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='flex px-1'>
                        {
                            Array.from({ length: fullStar }, (_, i) => (
                                <Icons.star key={i} className={'text-yellow-600 dark:text-yellow-500 w-5 h-5'} />
                            ))
                        }
                        {
                            Array.from({ length: halfStar }, (_, i) => (
                                <Icons.halfStar key={i} className={'text-yellow-600 dark:text-yellow-500 w-5 h-5'} />
                            ))
                        }
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-between'>
                    <div>
                        <HoverCard>

                            <HoverCardTrigger>
                                <Button variant="link" className='text-inherit hover:text-blue-400'>More...</Button>
                            </HoverCardTrigger>

                            <HoverCardContent>
                                <p className='text-sm'>{description}</p>
                            </HoverCardContent>
                            
                        </HoverCard>
                    </div>
                    <div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="default" className='font-bold p-5'>Borrow</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            {token ? (
                            stock > 0 ? (
                                <>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                    Confirm Borrow
                                    </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogDescription>
                                    Are you sure you want to borrow this book?
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                    Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                    <Button
                                        variant="default"
                                        onClick={() => {
                                        toast({
                                            title: `${title}`,
                                            description: "Added to Borrowed Books!",
                                            action: (
                                            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                                            ),
                                        })
                                        borrowBook(title)
                                        }}
                                    >
                                        Continue
                                    </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                                </>
                            ) : (
                                <>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                    Out of Stock
                                    </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogDescription>
                                    Sorry, this book is unavailable at the moment.
                                    Please check again in a few days.
                                </AlertDialogDescription>
                                <AlertDialogFooter className='flex '>
                                    <AlertDialogCancel>
                                    Back
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                    <Button
                                        variant="default"
                                        onClick={() => {
                                        toast({
                                            title: `${title}`,
                                            description: "Added to Wishlist!",
                                            action: (
                                            <ToastAction altText="Goto wishlist to undo">Undo</ToastAction>
                                            ),
                                        })
                                        wishlistBook(title)
                                        }}
                                    >
                                        Add to Wishlist
                                    </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                                </>
                            )
                            ) : (
                            <>
                                <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Login Required
                                </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogDescription>
                                Please login to borrow books.
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction>
                                    <Link href='/'>
                                        <Button
                                        variant="default"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </>
                            )}
                        </AlertDialogContent>
                        </AlertDialog>

                    </div>
                  </CardFooter>
                </Card>

    )

}