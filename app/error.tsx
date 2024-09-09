"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Error = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4 dark:bg-[#1f1f1f]'>
        <Image
            src="/error.png"
            alt='Error'
            height="300"
            width="300"
            className='dark:hidden'
        />
        <Image
            src="/error-dark.png"
            alt='Error'
            height="300"
            width="300"
            className='dark:block hidden'
        />
        <h2
            className='text-xl font-medium'
        >
            Something went wrong!
        </h2>
        <Button asChild>
            <Link href="/documents">
                Go back
            </Link>
        </Button>
    </div>
  )
}

export default Error;
