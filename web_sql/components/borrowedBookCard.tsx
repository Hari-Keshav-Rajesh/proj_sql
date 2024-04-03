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

import { useRouter } from 'next/navigation'

import { siteConfig } from '@/config/siteconfig'

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

export default function BorrowedBookCard({id,title, author, tags, rating, stock,description}: {id:string,title: string, author: string, tags: string[], rating: number, stock: number,description: string}){

    const router = useRouter()

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
                            <Button variant="default" className='font-bold p-5'>Return</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                                    <AlertDialogTitle>
                                    Confirm Return
                                    </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogDescription>
                                    Are you sure you want to return this book?
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                    Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                    <Button
                                        variant="default"
                                        onClick={async() => {
                                        // Return Book
                                        const response = await fetch(`${siteConfig.apiURL}/returnBook`, {
                                            method: 'POST',
                                            headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${Cookies.get("token")}`
                                            },
                                            body: JSON.stringify({
                                               BookId:  id
                                            })
                                        })
                                        const data = await response.json()
                                        toast({
                                            title: `${title}`,
                                            description: `${data.message}`
                                        })
                                        borrowBook(title)
                                        router.push('/dash/books')
                                        }}
                                    >
                                        Continue
                                    </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>

                    </div>
                  </CardFooter>
                </Card>

    )

}