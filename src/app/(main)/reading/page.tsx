import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import Link from "next/link";
import path from "path";

const level = [
  {
    title: "Түвшин 1",
    description: "1 дүгээр ангийн хүүхдүүдэд амар сэдэв",
    path: "/reading/levelOne",
  },
  {
    title: "Түвшин 2",
    description: "1 дүгээр ангийн хүүхдүүдэд дунд зэргийн сэдэв",
    path: "/reading/levelTwo",
  },
  {
    title: "Түвшин 3",
    description: "1 дүгээр ангийн хүүхдүүдэд хэцүү сэдэв",
    path: "/reading/levelThree",
  },
];

const ReadingPage = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 mt-12">
          <h1 className="text-4xl font-bold mb-4">Унших</h1>
          <p className="text-muted-foreground text-lg">Түвшингээ сонгоорой</p>
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
                    Түвшин рүү орох
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ReadingPage;
