import CookieRecipeList from "@/components/cookies"

export default function ChristmasMemoryGame() {
  return (
    <main className="flex flex-col justify-center items-center h-screen relative">
      <h1 className="text-3xl font-bold absolute top-12">Marry Christmas 🎄✨</h1>
      <iframe className="w-[60%] h-[120vh] rounded-2xl mb-16 mt-32" src="https://santatracker.google.com/"></iframe>
      <CookieRecipeList />
    </main>
  )
}