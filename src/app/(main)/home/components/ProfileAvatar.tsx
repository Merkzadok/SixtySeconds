import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

export default function ProfileAvatar() {
  return (
    <Avatar className="w-10 h-10 ring-2 ring-purple-200 cursor-pointer hover:ring-purple-300 transition-all">
      <AvatarImage src="/user-profile-illustration.png" />
      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
        JD
      </AvatarFallback>
    </Avatar>
  );
}
