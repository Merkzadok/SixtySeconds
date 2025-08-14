export const Payment = () => {
    return(
        <div className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Одоогийн гишүүнчлэл</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Premium төлөвлөгөө</p>
            <p className="text-gray-500 text-sm">Жилээр төлөгдөнө • Дараагийн төлбөр: 2025-02-15</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">₮50,000</p>
            <p className="text-gray-500 text-sm">жилд</p>
          </div>
        </div>
      </div>
    )
}
export default Payment; 