import Lottie from "lottie-react";
// @ts-expect-error: TypeScript may not recognize JSON imports without a declaration
import BrainAnimation from "@/assets/lottie/brain.json";

const Gifff = () => {
  return (
    <div className="h-screen">
      <Lottie
        animationData={BrainAnimation}
        loop={true}
        className="w-32 h-64"
      />
    </div>
  );
};
export default Gifff;
