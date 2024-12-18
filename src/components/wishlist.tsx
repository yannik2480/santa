"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Wishlist() {
  const { data: whishes, isPending } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await fetch("/api/wishes");
      if (!response.ok) throw new Error("Failed to fetch the wishlist");
      return response.json();
    },
  });

  return isPending ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 30 }).map((_, index) => (
        <Skeleton key={index} className="h-60 w-[50vh]" />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {whishes?.map((wish: { name: string; shortDescription: string; description: string }) => (
        <Card
          key={wish.name}
          className="border-2 border-green-500 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
        >
          <div>
            <CardHeader className="bg-green-50">
              <CardTitle className="text-red-700 text-xl">{wish?.name}</CardTitle>
              <CardDescription className="text-green-700">
                {wish?.shortDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{wish?.description}</p>
            </CardContent>
          </div>
          <CardFooter>
            <Link href="https://www.wunschpate.de/wuensche/" target="_blank">
              <Button>
                Wunsch erfüllen
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
