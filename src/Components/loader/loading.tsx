import globeAnimation from "@/data/animations/ReadingBook.json";
import Lottie from "lottie-react";
export const LoaderScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#C0e6BA] z-50">
      <Lottie
        animationData={globeAnimation}
        loop={true}
        className="w-40 h-40 sm:w-60 sm:h-60 lg:w-100 lg:h-100"
      />
    </div>
  );
};
