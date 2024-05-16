import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Field, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
import { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

const formSchema = authFormSchema('sign-up')

interface CustomInputProps {
    //Since we want to use all the fields
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    type: string,
    p?: string
}

const CustomInput = ({
    control,
    name,
    label,
    placeholder,
    type,
    p
}: CustomInputProps) => {
    return (

        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className='relative flex w-full flex-col'>
                        <FormControl>
                            < Input placeholder={placeholder} id={name} type={type} className='input-class'
                                {...field} />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput