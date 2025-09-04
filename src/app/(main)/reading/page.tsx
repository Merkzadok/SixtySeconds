// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Card } from "@/Components/ui/card";

// const levels = [
//   {
//     id: "levelOne",
//     title: "Түвшин 1",
//     description: "Амархан сэдэв",
//     path: "/reading/levelOne",
//     image: "/level1.png",
//   },
//   {
//     id: "levelTwo",
//     title: "Түвшин 2",
//     description: "Дунд зэргийн сэдэв",
//     path: "/reading/levelTwo",
//     image: "/level2.png",
//   },
//   {
//     id: "levelThree",
//     title: "Түвшин 3",
//     description: "хэцүү сэдэв",
//     path: "/reading/levelThree",
//     image: "/level3.png",
//   },
//   // {
//   //   id: "readingTimer",
//   //   title: "60 sec",
//   //   description: "Хугацаатай унших дасгал",
//   //   path: "/reading/reading-timer",
//   //   image: "/hourglass.png",
//   // },
// ];

// const ReadingPage = () => {
//   return (
//     <div className="min-h-screen bg-[#C0e6BA] p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Толгой хэсэг */}
//         <div className="text-center mb-10 mt-12">
//           <h1 className="text-4xl font-bold mb-4">Унших булан</h1>
//           <p className="text-lg text-gray-700 font-medium">
//             Түвшингээ сонгоод уншаарай
//           </p>
//         </div>

//         {/* Түвшин сонгох картууд */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {levels.map((level) => (
//             <Link key={level.id} href={level.path}>
//               <Card className="cursor-pointer group rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-transform flex flex-col items-center justify-center p-6">
//                 <div className="w-40 h-40 flex items-center justify-center mb-4">
//                   <Image
//                     src={level.image}
//                     alt={level.title}
//                     width={160}
//                     height={160}
//                     className="object-contain drop-shadow-md group-hover:rotate-3 transition-transform"
//                   />
//                 </div>
//                 <h2 className="text-2xl font-bold text-purple-600 mb-2">
//                   {level.title}
//                 </h2>
//                 <p className="text-base text-gray-600 text-center">
//                   {level.description}
//                 </p>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReadingPage;
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/Components/ui/card";
import ProtectedRoute from "@/provider/ProtectPage";

const levels = [
  {
    id: "levelOne",
    title: "Түвшин 1 ✨",
    description: "Энгийн үгтэй хөгжилтэй үлгэр",
    path: "/reading/levelOne",
    image: "/level1.png",
  },
  {
    id: "levelTwo",
    title: "Түвшин 2 ✨",
    description: "Адал явдалтай сонирхолтой өгүүлбэр",
    path: "/reading/levelTwo",
    image: "/level2.png",
  },
  {
    id: "levelThree",
    title: "Түвшин 3 ✨",
    description: "Ид шидтэй жаахан хэцүү үлгэр",
    path: "/reading/levelThree",
    image: "/level3.png",
  },

  // {
  //   id: "readingTimer",
  //   title: "60 sec",
  //   description: "Хугацаатай унших дасгал",
  //   path: "/reading/reading-timer",
  //   image: "/hourglass.png",
  // },
];

const ReadingPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#A8E6CF] via-[#b6ffc5] to-[#c3ffa5] p-6">
        <div className="max-w-6xl mx-auto">
          {/* Толгой хэсэг */}
          <div className="text-center mb-10 mt-12">
            <h1 className="text-5xl font-extrabold mb-4 text-pink-700 drop-shadow-lg">
              📚 Унших булан
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Түвшингээ сонгоод адал явдалд бэлэн үү?
            </p>
          </div>

          {/* Түвшин сонгох картууд */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {levels.map((level) => (
              <Link key={level.id} href={level.path}>
                <Card className="cursor-pointer group rounded-2xl border-4 border-yellow-300 bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-transform flex flex-col items-center justify-center p-6">
                  <div className="w-40 h-40 flex items-center justify-center mb-4">
                    <Image
                      src={level.image}
                      alt={level.title}
                      width={160}
                      height={160}
                      className="object-contain drop-shadow-md group-hover:rotate-3 transition-transform"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-purple-600 mb-2">
                    {level.title}
                  </h2>
                  <p className="text-base text-gray-600 text-center">
                    {level.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ReadingPage;
