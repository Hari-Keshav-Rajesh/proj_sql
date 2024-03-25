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

import { siteConfig } from "@/config/siteconfig"

import Link from "next/link"

import Cookies from "js-cookie"

export default function Login(){

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleView(event:any){
    event.preventDefault()
    Cookies.set("token", "view")
    console.log(Cookies.get("token"))
    router.push("/dash")
  }

  async function handleLogin(event: any){
    event.preventDefault()
    if(username === "" || password === ""){
      alert("Please fill in all fields")
      return
    }
    const response = await fetch(`${siteConfig.apiURL}/login`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    const data = await response.json()
    if(data.status){
      Cookies.set("token", data.token)
      router.push("/dash")
      console.log(Cookies.get("token"))
    }
    else{
      alert(data.message)
    }
  }

  return(
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-20">

      <div className="flex flex-col">
        <div className="text-center text-5xl font-bold animate-jump-in animate-duration-[2000ms] animate-ease-in lg:text-8xl xl:text-7xl">{siteConfig.title}</div>
        <div className="font-extralight sm:text-xs md:text-base lg:text-xl animate-fade animate-duration-[2000ms] animate-delay-[2000ms] animate-ease-in">{siteConfig.description}</div>
      </div>

      <div className="flex flex-col items-center">

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
          <Link href="/sign-up">
            <Button variant="link">Don&apos;t have an account? Sign up</Button>
          </Link>
        </CardFooter>
      </Card>

      <Button variant="link"
        className="text-blue-500"
        onClick={(e)=>handleView(e)}
      >
        Wanna have a look? View without sign-in
      </Button>   

    </div>

    </div>
  )
}