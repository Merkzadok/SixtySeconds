export const ProfileCard = () => {
    return (
      <div className="flex items-center gap-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-6 rounded-2xl shadow-lg text-white max-w max-auto">
        {/* Профайл зураг */}
        <img
          src="https://via.placeholder.com/80"
          alt="Аватар"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
        />
  
        {/* Мэдээлэл */}
        <div>
          <h2 className="text-xl font-bold">Анар</h2>
          <p className="text-yellow-200 font-medium">⭐ Premium гишүүн</p>
          <p className="text-sm text-white/80">2024 оны 1-р сараас гишүүн</p>
        </div>
      </div>
    );
  };
  export default ProfileCard;
  