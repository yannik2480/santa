import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function CookieRecipeList() {
const ingredients = [
    "450 g Weizenmehl",
    "1 Vanilleschote",
    "250 g Puderzucker",
    "1 unbehandelte Zitrone, davon die abgeriebene Schale",
    "2 Ei",
    "250 g Butter",
    "100 g Haselnuss, gemahlen",
    "etwas Zuckerglasur",
    "1 Päckchen Zuckerperlen, silber"
]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Chocolate Chip Cookies</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Checkbox id={`ingredient-${index}`} />
              <label
                htmlFor={`ingredient-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {ingredient}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

