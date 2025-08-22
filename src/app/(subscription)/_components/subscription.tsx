"use client";
import { useUser } from "@/provider/CurrentUser";
import React, { useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import MainHeader from "@/app/(main)/home/components/MainHeader";

type BillingPeriod = "free" | "monthly" | "quarterly" | "yearly";

const billingOptions = [
  { key: "free" as BillingPeriod, label: "Free", price: 0 },
  { key: "monthly" as BillingPeriod, label: "Monthly", price: 19900 },
  { key: "quarterly" as BillingPeriod, label: "Three Month", price: 49900 },
  { key: "yearly" as BillingPeriod, label: "Yearly", price: 179900 },
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
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("free");

  const { user } = useUser(); //users context herglegchiin medeelel awah

  const currentOption = billingOptions.find((o) => o.key === billingPeriod)!;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("mn-MN").format(price);
  const getMonthlyEquivalent = (price: number, period: BillingPeriod) => {
    const months = period === "quarterly" ? 3 : period === "yearly" ? 12 : 1;
    return Math.floor(price / months);
  };

  // 👇 subscription hadgalah
  const handleSubscribe = async () => {
    if (!user) {
      alert("Та эхлээд нэвтэрнэ үү!");
      return;
    }
    try {
      const token = localStorage.getItem("Token"); // auth token авч байна
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions`,
        {
          userId: user.id,
          plan: billingPeriod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Таны subscription амжилттай бүртгэгдлээ!");
    } catch (error) {
      console.error(error);
      alert("Алдаа гарлаа, дахин оролдоно уу.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <MainHeader />
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Subscription
        </h1>
      </div>

      {/* Billing Card */}
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Billing Options */}
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

        {/* Pricing */}
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
          {billingPeriod !== "free" && (
            <p className="text-gray-600 mt-1">
              Сард ₮
              {formatPrice(
                getMonthlyEquivalent(currentOption.price, billingPeriod)
              )}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">
            Багтсан боломжууд
          </h4>
          {billingPeriod === "free" ? (
            <div className="flex items-center justify-center text-gray-700">
              <Check className="w-5 h-5 text-green-400 mr-2" />7 өдөр бүх хичээл
              үнэгүй
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center text-gray-700 p-2 rounded-lg"
                >
                  <Check className="w-5 h-5 text-green-400 mr-2" />
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSubscribe}
          className="w-full py-4 bg-gray-200 hover:bg-gray-300 text-black font-bold text-lg rounded-2xl shadow-lg "
        >
          {billingPeriod === "free" ? "Start Free" : "BUY NOW"}
        </button>
      </div>
    </div>
  );
}
