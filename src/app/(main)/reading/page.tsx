import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import Link from "next/link";
import path from "path";

 const level = [
   {
     title: "Level 1",
     description: "1 dugeer angiin huuhduuded amar sedew",
     path: "/reading/levelOne",
   },
   {
     title: "Level 2",
     description: "1 dugeer angiin huuhduuded jaahan hetsuu sedew",
     path: "/reading/levelTwo",
   },
   {
     title: "Level 3",
     description: "1 dugeer angiin huuhduuded hetsuu sedew",
     path: "/reading/levelThree",
   }
 ];

const ReadingPage = () => {
 
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 mt-12">
          <h1 className="text-4xl font-bold mb-4">Reading</h1>
          <p className="text-muted-foreground text-lg">Choose your level</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {level.map((route, index) => (
            <Link href={route.path} key={index}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{route.title}</CardTitle>
                <CardDescription>{route.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 cursor-pointer
"
                >
                  Play
                </Button>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReadingPage