'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const quotes = [
    "The best way to spread Christmas cheer is singing loud for all to hear.",
    "Christmas isn't just a day, it's a frame of mind.",
    "Christmas magic is silent. You don't hear it — you feel it.",
    "Christmas is like candy; it slowly melts in your mouth sweetening every taste bud, making you wish it could last forever.",
    "Christmas is doing a little something extra for someone.",
    "The smells of Christmas are the smells of childhood.",
    "Christmas is a season not only of rejoicing but of reflection.",
    "Christmas is a necessity. There has to be at least one day of the year to remind us that we're here for something else besides ourselves.",
    "Christmas is a day of meaning and traditions, a special day spent in the warm circle of family and friends.",
    "Christmas is not as much about opening our presents as opening our hearts.",
    "Christmas waves a magic wand over this world, and behold, everything is softer and more beautiful.",
    "Christmas is a bridge. We need bridges as the river of time flows past.",
    "Christmas is a season for kindling the fire for hospitality in the hall, the genial flame of charity in the heart.",
    "Christmas is the season of joy, of gift-giving, and of families united.",
    "Christmas is not just a time for festivity and merry making. It is more than that. It is a time for the contemplation of eternal things.",
    "Christmas is a time when you get homesick — even when you're home.",
    "Christmas is the day that holds all time together.",
    "Christmas is a season for kindling the fire for hospitality in the hall, the genial flame of charity in the heart.",
    "Christmas is doing a little something extra for someone.",
    "Christmas is forever, not for just one day. For loving, sharing, giving, are not to put away.",
    "Christmas is a time when everybody wants his past forgotten and his present remembered.",
    "Christmas is the gentlest, loveliest festival of the revolving year.",
    "Christmas is a time when you get homesick — even when you're home.",
    "Christmas is the season for kindling the fire of hospitality in the hall, the genial flame of charity in the heart."
];
  

const Door = ({ day, quote }: { day: number; quote: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full h-0 pb-[100%]">
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotateY: isOpen ? 180 : 0 }}
        initial={{ rotateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-600 rounded-lg shadow-lg backface-hidden">
          <span className="text-4xl mb-2">🎁</span>
          <span className="text-2xl font-bold text-white">{day}</span>
        </div>
        <div 
          className="absolute inset-0 flex items-center justify-center p-4 bg-green-600 rounded-lg backface-hidden [transform:rotateY(180deg)]"
        >
          <p className="text-center text-white text-sm">{quote}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function AdventCalendar() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Advent Calendar</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {quotes.map((quote, index) => (
          <Door key={index} day={index + 1} quote={quote} />
        ))}
      </div>
    </div>
  )
}

