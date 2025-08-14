import Lottie from "lottie-react";
import BrainAnimation from "/Users/25LP1749/Desktop/final-project/final-project/public/Meditating-Brain.json";

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
