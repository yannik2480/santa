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

    return (
        <div className="flex flex-col min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 flex-grow">
                {isPending
                    ? Array.from({ length: 30 }).map((_, index) => (
                          <Skeleton key={index} className="h-60 w-[50vh]" />
                      ))
                    : whishes?.map((wish: { name: string; shortDescription: string; description: string }) => (
                          <Card
                              key={wish.name}
                              className="group border border-green-200 hover:border-green-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-sm bg-white/90 transform hover:scale-105"
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
            <footer className="text-center p-4 text-sm text-gray-500">
                Powered by{" "}
                <Link href="https://www.wunschpate.de" target="_blank" className="text-green-600 hover:text-green-700 underline">
                    Wunschpate
                </Link>
            </footer>
        </div>
    );
}
