"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { createCookieToken } from "@/utils/cookie"

export default function LoginPage() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const { Login, Register, loading, error } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await Login({ ...loginData })
    if (error) {
      console.error("Login error:", error)
      return
    }
    
    createCookieToken(response)
    window.location.href = "/account"
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    
  }

  return (
    <div className="container py-8 max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login to Your Account</CardTitle>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/account/reset-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>Sign up to book tickets and manage your bookings</CardDescription>
            </CardHeader>
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label htmlFor="firstName">Full Name</Label>
                    <Input id="firstName" className="h-8 p-2" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Gender</Label>
                    <div className="flex items-center space-x-4 h-8">
                      <Label htmlFor="male" className="flex items-center gap-2">
                        <Input
                          type="radio"
                          className="w-4 h-4"
                          id="male"
                          required
                        />
                        Male
                      </Label>
                      <Label htmlFor="female" className="flex items-center gap-2">
                        <Input
                          type="radio"
                          className="w-4 h-4"
                          id="female"
                          required
                        />
                        Female
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input id="signupEmail" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input id="signupPassword" type="password" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
