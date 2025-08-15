export const Payment = () => {
    return(
        <div className="flex items-center gap-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-6 rounded-2xl shadow-lg text-white max-w mx-auto">
        <h2 className="text-lg font-semibold mb-4">Одоогийн гишүүнчлэл</h2>
        <div className="flex justify-between ">
          <div>
            <p className="font-medium">Premium төлөвлөгөө</p>
            <p className="text-gray-500 text-sm">Жилээр төлөгдөнө • Дараагийн төлбөр: 2025-02-15</p>
          </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">₮179,000</p>
            <p className="text-gray-500 text-sm">жилд</p>
          </div>
        
      </div>
    )
}
export default Payment; 