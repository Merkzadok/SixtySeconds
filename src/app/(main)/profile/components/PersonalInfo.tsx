export const PersonalInfo = () => {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>👤</span> Хувийн мэдээлэл
        </h2>
  
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-blue-500 text-xl">📧</span>
            <div>
              <p className="text-gray-500 text-sm">Имэйл</p>
              <p className="font-medium text-gray-800">boloroo2020@yahoo.com</p>
            </div>
          </div>
  
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-xl">📞</span>
            <div>
              <p className="text-gray-500 text-sm">Утас</p>
              <p className="font-medium text-gray-800">976 89898989</p>
            </div>
          </div>
  
          <div className="flex items-center gap-3">
            <span className="text-pink-500 text-xl">📍</span>
            <div>
              <p className="text-gray-500 text-sm">Байршил</p>
              <p className="font-medium text-gray-800">ulaanbaatar, Mongolia</p>
            </div>
          </div>
  
          <div className="flex items-center gap-3">
            <span className="text-yellow-500 text-xl">📅</span>
            <div>
              <p className="text-gray-500 text-sm">Төрсөн өдөр</p>
              <p className="font-medium text-gray-800">1990 оны 3-р сарын 15</p>
            </div>
          </div>
        </div>
  
        <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition">
          Мэдээлэл засах
        </button>
      </div>
    );
  };
export default PersonalInfo;  