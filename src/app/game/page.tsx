'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Snowflake, RefreshCw } from 'lucide-react'

interface CardType {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const createNewGame = (): CardType[] => {
  const emojis = ['🎅', '🎄', '🎁', '❄️', '⛄', '🔔', '🦌', '🍪']
  const cards = emojis.concat(emojis).map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }))
  return shuffleArray(cards)
}

const shuffleArray = (array: CardType[]): CardType[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function ChristmasMemoryGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    setCards(createNewGame())
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      checkForMatch(newFlippedCards)
    }
  }

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds
    if (cards[firstId].emoji === cards[secondId].emoji) {
      const newCards = [...cards]
      newCards[firstId].isMatched = true
      newCards[secondId].isMatched = true
      setCards(newCards)
      setFlippedCards([])
      setMatches(matches + 1)
    } else {
      setTimeout(() => {
        const newCards = [...cards]
        newCards[firstId].isFlipped = false
        newCards[secondId].isFlipped = false
        setCards(newCards)
        setFlippedCards([])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Christmas Memory Game</h1>
      <div className="mb-4 flex items-center space-x-4">
        <span className="text-lg font-semibold">Moves: {moves}</span>
        <span className="text-lg font-semibold">Matches: {matches}</span>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`w-20 h-20 flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 ${
              card.isFlipped || card.isMatched ? 'bg-white' : 'bg-red-500'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.emoji : <Snowflake className="text-white" />}
          </Card>
        ))}
      </div>
      <Button onClick={startNewGame} className="bg-green-500 hover:bg-green-600 text-white">
        <RefreshCw className="mr-2 h-4 w-4" /> New Game
      </Button>
    </div>
  )
}

