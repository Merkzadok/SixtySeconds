export const AccountSecurity = () => {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>🛡️</span> Аюулгүй байдлын тохиргоо
        </h2>
  
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Хоёр шатлалт нэвтрэлт</p>
              <p className="text-gray-500 text-sm">Давхар хамгаалалт нэмэх</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500"></div>
              <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
            </label>
          </div>
  
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Имэйл мэдэгдэл</p>
              <p className="text-gray-500 text-sm">Имэйлээр мэдээлэл авах</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500"></div>
              <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
            </label>
          </div>
  
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">SMS мэдэгдэл</p>
              <p className="text-gray-500 text-sm">Чухал мэдэгдлийг SMS-ээр авах</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full"></div>
              <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform"></div>
            </label>
          </div>
        </div>
  
        <button className="mt-6 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition">
          Нууц үг солих
        </button>
      </div>
    );
  };
export default AccountSecurity;  