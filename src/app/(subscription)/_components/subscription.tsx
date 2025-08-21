"use client";

import React, { useState } from "react";
import { Check, Crown, Gamepad2, BookOpen, Shield, Users, Star } from "lucide-react";

type BillingPeriod = "free" | "monthly" | "quarterly" | "yearly";

const billingOptions = [
  { key: "free" as BillingPeriod, label: "Free", price: 0 },
  { key: "monthly" as BillingPeriod, label: "Monthly", price: 19900 },
  { key: "quarterly" as BillingPeriod, label: "Quarterly", price: 49900 },
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
  const currentOption = billingOptions.find(o => o.key === billingPeriod)!;

  const formatPrice = (price: number) => new Intl.NumberFormat("mn-MN").format(price);

  const getMonthlyEquivalent = (price: number, period: BillingPeriod) => {
    const months = period === "quarterly" ? 3 : period === "yearly" ? 12 : 1;
    return Math.floor(price / months);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-pink-400 to-yellow-400 p-5 rounded-full shadow-lg mb-4">
          <Crown className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-2">
          60{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Second
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Хүүхдийн хөгжилд зориулсан, тоглоомтой уншлагын платформ
        </p>
      </div>

      {/* Billing Card */}
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Billing Options */}
        <div className="mb-6 grid grid-cols-4 gap-2 bg-gray-100 p-2 rounded-2xl">
          {billingOptions.map(option => (
            <button
              key={option.key}
              onClick={() => setBillingPeriod(option.key)}
              className={`py-2 rounded-xl font-semibold transition-all duration-200 ${
                billingPeriod === option.key
                  ? "bg-gradient-to-r from-yellow-400 to-pink-400 text-white shadow-md scale-105"
                  : "text-gray-600 hover:bg-white hover:text-purple-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          {currentOption.price === 0 ? (
            <p className="text-3xl md:text-4xl font-bold text-green-500">7 ӨДӨР ҮНЭГҮЙ</p>
          ) : (
            <p className="text-3xl md:text-4xl font-bold text-purple-700">
              ₮{formatPrice(currentOption.price)}
            </p>
          )}
          {billingPeriod !== "free" && (
            <p className="text-gray-600 mt-1">
              Сард ₮{formatPrice(getMonthlyEquivalent(currentOption.price, billingPeriod))}
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
              <Check className="w-5 h-5 text-green-400 mr-2" />
              7 өдөр бүх хичээл үнэгүй
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center text-gray-700 p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition">
                  <Check className="w-5 h-5 text-green-400 mr-2" />
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold text-lg rounded-2xl shadow-lg hover:scale-105 transform transition">
          {billingPeriod === "free" ? "Үнэгүй туршилт эхлүүлэх" : "Захиалах"}
        </button>
      </div>

      {/* Bottom Features */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-purple-700 mb-6">Яагаад биднийг сонгох вэ?</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="bg-yellow-100 p-3 rounded-full inline-block mb-2">
              <Gamepad2 className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="font-semibold text-gray-800">Олон төрлийн тоглоом</p>
            <p className="text-gray-600 text-sm mt-1">Сурах сонирхлыг нэмэгдүүлэх</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="bg-pink-100 p-3 rounded-full inline-block mb-2">
              <BookOpen className="w-6 h-6 text-pink-400" />
            </div>
            <p className="font-semibold text-gray-800">Боловсрол</p>
            <p className="text-gray-600 text-sm mt-1">Хөгжилтэй аргаар суралцах</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="bg-purple-100 p-3 rounded-full inline-block mb-2">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <p className="font-semibold text-gray-800">Аюулгүй</p>
            <p className="text-gray-600 text-sm mt-1">100% хүүхдэд зориулсан</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="bg-green-100 p-3 rounded-full inline-block mb-2">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <p className="font-semibold text-gray-800">Бүх төхөөрөмж</p>
            <p className="text-gray-600 text-sm mt-1">Утас, таблет, компьютер</p>
          </div>
        </div>
      </div>
    </div>
  );
}
