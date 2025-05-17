"use client"

import type React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { createCookieToken } from "@/utils/cookie"
import Loader from "@/components/common/loader"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginInputs, LoginSchema, SignupInputs, signupSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import Field from "@/components/common/field"

export default function LoginPage() {
  const { Login, Register, loading, error } = useAuth()

  const { 
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginInputs>({ resolver: zodResolver(LoginSchema) })

  const { 
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupInputs>({ resolver: zodResolver(signupSchema) })

  const onLogin: SubmitHandler<LoginInputs> = async (data) => {
    const response = await Login(data)
    if (response) {
      createCookieToken(response)
      window.location.href = "/account"
    }
  }

  const onSignup: SubmitHandler<SignupInputs> = async (data) => {
    const response = await Register(data)
    if (response.account) {
      createCookieToken(response.account)
      window.location.href = "/account"
    }
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
            <form onSubmit={handleLoginSubmit(onLogin)}>
              <CardContent className="space-y-4">
                <Field label="Email" htmlFor="email" error={loginErrors.email?.message}>
                  <Input id="email" type="email" placeholder="you@example.com" {...registerLogin("email")} />
                </Field>
                <div className="space-y-1">
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
                    {...registerLogin("password")}
                  />
                  {loginErrors.password && <p className="text-red-500 text-sm">{loginErrors.password.message}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader /> : "Login"}
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
            <form onSubmit={handleSignupSubmit(onSignup)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Full Name" htmlFor="fullName" error={signupErrors.full_name?.message}>
                    <Input
                      id="fullName"
                      placeholder="your full name"
                      className="h-8 p-2"
                      {...registerSignup("full_name")}
                    />
                  </Field>

                  <div className="space-y-1">
                    <Label>Gender</Label>
                    <div className="flex items-center gap-4">
                      <Label className="flex items-center gap-2">
                        <Input
                          type="radio"
                          value="true"
                          {...registerSignup("gender" as const)}
                        />
                        Male
                      </Label>
                      <Label className="flex items-center gap-2">
                        <Input
                          type="radio"
                          value="false"
                          {...registerSignup("gender" as const)}
                        />
                        Female
                      </Label>
                    </div>
                    {signupErrors.gender && <p className="text-red-500 text-sm">{signupErrors.gender.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="Email" htmlFor="signupEmail" error={signupErrors.email?.message}>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="you@example.com"
                      className="h-8 p-2"
                      {...registerSignup("email")}
                    />
                  </Field>

                  <Field label="Birthday" htmlFor="birthday" error={signupErrors.birthday?.message}>
                    <Input
                      id="birthday"
                      type="date"
                      className="h-8 p-2"
                      {...registerSignup("birthday")}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="ID Number" htmlFor="id_number" error={signupErrors.id_number?.message}>
                    <Input
                      id="id_number"
                      placeholder="0123456789"
                      className="h-8 p-2"
                      {...registerSignup("id_number")}
                    />
                  </Field>

                  <Field label="Phone Number" htmlFor="phone_number" error={signupErrors.phone_number?.message}>
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="0123456789"
                      className="h-8 p-2"
                      {...registerSignup("phone_number")}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="Password" htmlFor="signupPassword" error={signupErrors.password?.message}>
                    <Input
                      id="signupPassword"
                      type="password"
                      placeholder="********"
                      className="h-8 p-2"
                      {...registerSignup("password")}
                    />
                  </Field>

                  <Field label="Confirm Password" htmlFor="confirmPassword" error={signupErrors.confirmPassword?.message}>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="********"
                      className="h-8 p-2"
                      {...registerSignup("confirmPassword")}
                    />
                  </Field>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader /> : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
