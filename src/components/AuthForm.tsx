'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
//Form validation tools
//defining the form fields

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Input } from './ui/input'


const AuthFormCombined = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [eye, setEye] = useState(false)

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setLoading(true);
        try {
            //Sign up with
            if (type === "sign-up") {
                // const newUser = await signUp(values);

            }
            else if (type === 'sign-in') {
                // const response = await SignIn({
                //     email: values.email,
                //     password: values.password
                // })
                // if(response){
                //     Router.push("/");
                // }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }
    return (
        <section className='auth-form'>
            <header className='flex flex-col md:gap-8'>
                <Link href="/" className="flex cursor-pointer items-center gap-1">
                    <Image
                        src="/icons/logo.svg"
                        alt="jb-bank logo"
                        height={34}
                        width={34}
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Jb Bank</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {
                            user ? 'Link Account'
                                : type === 'sign-in' ? "Sign In" : "Sign Up"
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {
                user ? (
                    <div className='flex flex-col gap-4'>
                        {/* Plaid Link  */}
                    </div>
                ) : (
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {type === 'sign-up' && (
                                    <>
                                        <div className='flex gap-4'>
                                            <CustomInput type="text" control={form.control} name="firstname" label="Firstname" placeholder="Enter your firstname" />
                                            <CustomInput type="text" control={form.control} name="lastname" label="Lastname" placeholder="Enter your lastname" />
                                        </div>
                                        <CustomInput type="text" control={form.control} name="address1" label="Address" placeholder="Enter your address" />
                                        <CustomInput type="text" control={form.control} name="city" label="City" placeholder="Ex: Kolkata" />
                                        <div className='flex gap-4'>

                                            <CustomInput type="text" control={form.control} name="state" label="State" placeholder="Ex: West Bengal" />
                                            <CustomInput type="text" control={form.control} name="postalCode" label="Postal Code" placeholder="Ex: 700124" />
                                        </div>
                                        <CustomInput type="date" control={form.control} name="dateOfBirth" label="Date Of Birth" placeholder="dd-mm-yyyy" />
                                        <CustomInput type="text" control={form.control} name="ssn" label="SSN" placeholder="Ex: 1234" />
                                    </>
                                )}
                                <CustomInput type="email" control={form.control} name="email" label="Email" placeholder="Enter your email" />
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <div className="form-item">
                                            <FormLabel className='form-label'>
                                                Password
                                            </FormLabel>
                                            <div className='relative flex w-full flex-col'>

                                                <FormControl>
                                                    < Input placeholder="Password" type={eye ? "text" : "password"} id="password" className='input-class'
                                                        {...field} />
                                                </FormControl>
                                                <div className='absolute top-3 right-2 eye-btn' onClick={() => setEye(!eye)}>{eye ? <IoMdEye /> : <IoMdEyeOff />}</div>

                                                <FormMessage className='form-message mt-2' />
                                            </div>
                                        </div>
                                    )}
                                />
                                <div className='flex flex-col gap-4'>
                                    <Button type="submit" className='form-btn' disabled={loading}>
                                        {loading ?
                                            (<>
                                                <Loader2 size={20} className='animate-spin' />&nbsp; Loading...
                                            </>) : type === 'sign-in' ?
                                                'Sign In' : 'Sign Up'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <footer className='flex justify-center gap-1 pt-3'>
                            <p className='text-14 font-normal text-gray-600'>{
                                type === 'sign-in' ?
                                    "Don't have an account?" : "Already have an account"
                            }</p>
                            <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : 'sign-in'}>{
                                type === 'sign-in' ? 'Sign up' : 'Sign In'
                            }</Link>
                        </footer>
                    </div>
                )
            }
        </section >
    )
}

export default AuthFormCombined