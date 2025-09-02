"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/Components/ui/card";

const levels = [
  {
    id: "levelOne",
    title: "Түвшин 1",
    description: "1 дүгээр ангийн хүүхдүүдэд амар сэдэв",
    path: "/reading/levelOne",
    image: "/level1.png",
  },
  {
    id: "levelTwo",
    title: "Түвшин 2",
    description: "1 дүгээр ангийн хүүхдүүдэд дунд зэргийн сэдэв",
    path: "/reading/levelTwo",
    image: "/level2.png",
  },
  {
    id: "levelThree",
    title: "Түвшин 3",
    description: "1 дүгээр ангийн хүүхдүүдэд хэцүү сэдэв",
    path: "/reading/levelThree",
    image: "/level3.png",
  },
  {
    id: "readingTimer",
    title: "60 sec",
    description: "Хугацаатай унших дасгал",
    path: "/reading/reading-timer",
    image: "/hourglass.png",
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
          {levels.map((level) => (
            <Link key={level.id} href={level.path}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center p-4">
                <div className="w-full h-70 flex items-center justify-center">
                  <Image
                    src={level.image}
                    alt={level.title}
                    width={220}
                    height={220}
                    className="object-contain w-full h-full"
                  />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingPage;
