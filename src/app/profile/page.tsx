import Dansnii from "./components/Dansnii";

import HuviinMedeellel from "./components/Huviin-medeelel";
import Payment from "./components/Payment";
import UserProfile from "./components/UserProfile";

export const Page = () => {return(
    <div className="space-y-8">
    <UserProfile/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border p-6"> <HuviinMedeellel/></div>
        <div className="bg-white rounded-xl border p-6">  <Dansnii/></div>
      
      
      </div>
      <Payment/>
      </div>

)

}
export default Page;        