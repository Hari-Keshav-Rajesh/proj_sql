"use client"

import { useRouter } from "next/navigation"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login(){

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(event: any){
    event.preventDefault()
    console.log(username, password)
    router.push("/dash")
  }

  return(
    <div className="h-screen w-screen flex flex-col gap-20 justify-center items-center">

      <div className="flex flex-col">
        <div className="text-center text-5xl font-bold animate-jump-in animate-duration-[2000ms] animate-ease-in lg:text-8xl xl:text-7xl">INFINITI</div>
        <div className="font-extralight sm:text-xs md:text-base lg:text-xl animate-fade animate-duration-[2000ms] animate-delay-[2000ms] animate-ease-in">Limitless knowledge,at your fingertips</div>
      </div>

      <Card className="w-fit md:w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Where every book is just a tap away.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" placeholder="Your Username" 
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Your Password" 
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full"
        onClick={(e)=>handleLogin(e)}
        >Login</Button>
        <Button variant="link">Don&apos;t have an account? Sign up</Button>
      </CardFooter>
    </Card>

    </div>
  )
}