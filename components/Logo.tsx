"use client"
import { useSiteConfig } from '@/lib/store/config'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  const { config } = useSiteConfig()
  return (
    <Link href="/" className="flex items-center space-x-2 hover-lift">
             
    <div className="text-primary-foreground p-2 rounded-lg">
    <Image
      src={config?.logo || '/logo.svg'}
      alt={config?.name || 'Northway'}
      height={60}
      width={60}
      className="object-cover"
    />
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-lg text-foreground">{config?.name || 'Northway'}</span>
      <span className="text-sm text-primary font-bold hidden sm:block">Immigration Consultants</span>
    </div>
  </Link>
  )
}

export default Logo