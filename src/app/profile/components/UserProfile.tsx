import * as Avatar from '@radix-ui/react-avatar';

export const UserProfile = () => {
  return (
    <div className="space-y-8">
      {/* Профайлын толгой хэсэг */}
      <div className="bg-fuchsia-300 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-6">
          {/* Хэрэглэгчийн дүрс (аватар) */}
          <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden w-20 h-20 rounded-full bg-gray-700">
            <Avatar.Image
              className="w-full h-full object-cover"
              src="https://i.pravatar.cc/150?u=anar"
              alt="Анар"
            />
            <Avatar.Fallback
              className="flex items-center justify-center w-full h-full bg-gray-500 text-white text-xl"
              delayMs={600}
            >
              А
            </Avatar.Fallback>
          </Avatar.Root>

          <div>
            <h1 className="text-xl font-semibold">Анар</h1>
            <p className="text-gray-300">Premium гишүүн</p>
            <p className="text-gray-400">2024 оны 1-р сараас гишүүн</p>
          </div>
        </div>
      </div>
    
    </div>
  );
};
export default UserProfile;   
