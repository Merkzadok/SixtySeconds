"use client";
import { useUser } from "@/provider/CurrentUser";
import React, { useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import MainHeader from "@/app/(main)/home/components/MainHeader";

type BillingPeriod = "7 Өдөр үнэгүй" | "Сарын эрх" | "3-Сарын эрх" | "Жилээр";

const billingOptions = [
  { key: "7 Өдөр үнэгүй" as BillingPeriod, label: "7 Өдөр үнэгүй", price: 0, planId: 1 },
  { key: "Сарын эрх" as BillingPeriod, label: "Сарын эрх", price: 19900, planId: 2 },
  { key: "3-Сарын эрх" as BillingPeriod, label: "3-Сарын эрх", price: 49900, planId: 3 },
  { key: "Жилээр" as BillingPeriod, label: "Жилээр", price: 179900, planId: 4 },
];

const features = [
  "Бүх тоглоомууд",
  "Хязгааргүй цаг ашиглах",
  "Хязгааргүй унших",
  "Хязгааргүй дасгал",
  "Хязгааргүй хичээл",
  "Эцэг эхийн хяналт",
  "Олон төхөөрөмжөөс ашиглах",
  "Хязгааргүй хэрэглэгчийн дэмжлэг",
];

export default function Subscription() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("7 Өдөр үнэгүй");
  const { user } = useUser();
  const currentOption = billingOptions.find((o) => o.key === billingPeriod)!;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("mn-MN").format(price);
  const getMonthlyEquivalent = (price: number, period: BillingPeriod) => {
    const months = period === "3-Сарын эрх" ? 3 : period === "Жилээр" ? 12 : 1;
    return Math.floor(price / months);
  };
const handleSubscribe = async () => {
  if (!user) {
    alert("Та эхлээд нэвтэрнэ үү!");
    return;
  }

  const token = localStorage.getItem("Token:");
  if (!token) {
    alert("Та нэвтэрсэн байх шаардлагатай.");
    return;
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create`,
      {
        userId: user.id,
        planId: currentOption.planId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.activeSubscription) {
      alert(
        `Таны идэвхтэй subscription аль хэдийн бий.\n` +
        `Төлөв: ${res.data.activeSubscription.status}\n` +
        `Эхлэх: ${new Date(res.data.activeSubscription.startDate).toLocaleDateString()}\n` +
        `Дуусах: ${new Date(res.data.activeSubscription.endDate).toLocaleDateString()}`
      );
      return;
    }

    if (res.status === 201) {
      alert("Таны subscription амжилттай бүртгэгдлээ!");
    }

  } catch (error: any) {
    console.error("Front-end - Subscription error:", error.response?.data || error.message);
    alert("Алдаа гарлаа, дахин оролдоно уу.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <MainHeader />
      <div className="mt-12 flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Subscription
        </h1>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="mb-6 grid grid-cols-4 gap-2 bg-gray-100 p-2 rounded-2xl">
          {billingOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setBillingPeriod(option.key)}
              className={`py-2 rounded-xl font-semibold hover:bg-gray-300 transition-colors ${
                billingPeriod === option.key ? "bg-white shadow" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="text-center mb-6">
          {currentOption.price === 0 ? (
            <p className="text-3xl md:text-4xl font-bold text-green-500">
              7 ӨДӨР ҮНЭГҮЙ
            </p>
          ) : (
            <p className="text-3xl md:text-4xl font-bold text-purple-700">
              ₮{formatPrice(currentOption.price)}
            </p>
          )}
          {billingPeriod !== "7 Өдөр үнэгүй" && (
            <p className="text-gray-600 mt-1">
              Сард ₮
              {formatPrice(
                getMonthlyEquivalent(currentOption.price, billingPeriod)
              )}
            </p>
          )}
        </div>

        <div className="mb-6">
          <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">
            Багтсан боломжууд
          </h4>
          {billingPeriod === "7 Өдөр үнэгүй" ? (
            <div className="flex items-center justify-center text-gray-700">
              <Check className="w-5 h-5 text-green-400 mr-2" />7 өдөр бүх хичээл
              үнэгүй
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center text-gray-700 p-2 rounded-lg">
                  <Check className="w-5 h-5 text-green-400 mr-2" />
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubscribe}
          className="w-full py-4 bg-gray-200 hover:bg-gray-300 text-black font-bold text-lg rounded-2xl shadow-lg "
        >
          {billingPeriod === "7 Өдөр үнэгүй" ? "үнэгүй эхлүүлэх" : "худалдаж авахы"}
        </button>
      </div>
    </div>
  );
}
