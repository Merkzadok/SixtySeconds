import globeAnimation from "@/data/animations/DuoAttack.json";
import Lottie from "lottie-react";
export const LoaderScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
     <Lottie
                  animationData={globeAnimation}
                  loop={true}
                  className="absolute inset-0"
                />
    </div>
  );
};
