"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Skeleton } from "./ui/skeleton";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function Header() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date();
        let christmas = new Date(now.getFullYear(), 11, 25);
        
        if (now > christmas) {
            christmas = new Date(now.getFullYear() + 1, 11, 25);
        }
        
        const diff = christmas.getTime() - now.getTime();

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
    };

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    AOS.init();

    return (
        <header data-aos="fade-down" className="flex fixed top-4 items-center justify-between w-1/2 p-4 px-8 bg-gray-100 rounded-full text-blue-600">
            <div className="flex justify-center christmas-countdown gap-4">
                <h2 className="text-2xl">🎄</h2>
                <div>
                    {timeLeft ? (
                        `${timeLeft.days} Tage, ${timeLeft.hours} Stunden, 
                        ${timeLeft.minutes} Minuten, ${timeLeft.seconds} Sekunden`
                    ) : (
                        <Skeleton className="h-4 w-12"/>
                    )}
                </div>
            </div>
            <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/about">Über</Link>
                <Link href="/contact">Kontakt</Link>
            </div>
        </header>
    );
}