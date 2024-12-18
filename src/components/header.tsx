"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'

const menuItems = [
    { name: "Startseite", href: "/" },
    { name: "Wunschzettel", href: "/wishes" },
    { name: "Spiel", href: "/game" }
]

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-1/2 z-50 w-[97%] md:w-1/2 -translate-x-1/2 mt-4" >
            <div className="rounded-full bg-white bg-opacity-20 backdrop-blur-lg backdrop-filter">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex-shrink-0 pl-4">
                                <span className="text-xl font-semibold text-[#333333]">🎅{" "}{ChristmasCountdown()}</span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4 mr-6">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="rounded-md px-3 py-2 text-sm font-medium text-[#333333] hover:bg-white hover:bg-opacity-10"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="-mr-2 pr-8 flex md:hidden">
                            <button
                                className="text-white"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute left-0 right-0 md:hidden">
                    <div className="mt-2 space-y-1 rounded-lg bg-white bg-opacity-20 px-2 pb-3 pt-2 backdrop-blur-lg backdrop-filter">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:bg-opacity-10"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

function ChristmasCountdown() {
        const [timeLeft, setTimeLeft] = useState('')

        useEffect(() => {
                const updateCountdown = () => {
                        const christmas = new Date(new Date().getFullYear(), 11, 25)
                        if (new Date() > christmas) {
                                christmas.setFullYear(christmas.getFullYear() + 1)
                        }
                        
                        const diff = christmas.getTime() - new Date().getTime()
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
                        
                        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s!`)
                        setTimeout(updateCountdown, 1000)
                }

                updateCountdown()
        }, [])

        return timeLeft
}