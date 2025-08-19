import { Crown, Star } from "lucide-react";

export default function LeaderboardUser() {
    return (
        <div
        >
            <div className="flex items-center justify-between space-x-4 p-4 transition-all duration-200 border-2 border-yellow-300 rounded-lg">
                <div className="flex items-center space-x-4 ">
                <Crown className="text-yellow-500 w-6 h-6" />
                    <div className="text-3xl">
                        👦
                    </div>
                    <div className=" frlex font-bold">Emma</div>
                    <div>
                        <p className="text-gray-600 text-sm flex"> 12 lessons</p>
                    </div>
                </div >
                <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400"/> <div className="text-xl font-bold"> 980 points</div>
                </div>
            </div>
        </div>
    )
}