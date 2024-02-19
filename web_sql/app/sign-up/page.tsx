"use client"

import { useRouter } from "next/navigation"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { siteConfig } from "@/config/siteconfig"

import Link from "next/link"

export default function Login(){

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleLogin(event: any){
    event.preventDefault()
    if(username === "" || password === "" || confirmPassword === ""){
      alert("Please fill in all fields")
      return
    }
    if(password !== confirmPassword){
      alert("Passwords do not match")
      return
    }
    console.log(username, password)
    router.push("/dash")
  }

  return(
    <div className="h-screen w-screen flex flex-col gap-20 justify-center items-center">


      <Card className="w-fit md:w-[350px]">
      <CardHeader>
        <CardTitle>Sign-Up</CardTitle>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Confirm Password</Label>
              <Input type="password" id="confirmPassword" placeholder="Confirm Password" 
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full"
        onClick={(e)=>handleLogin(e)}
        >Sign-Up</Button>
      </CardFooter>
    </Card>

    </div>
  )
}