"use client";

import React, { useState } from "react";
import { Check, Crown, Gamepad2, BookOpen, Shield, Users, Star } from "lucide-react";
import Header from "@/app/(landing-page)/LandingHeader";
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
  const currentOption = billingOptions.find(o => o.key === billingPeriod)!;

  const formatPrice = (price: number) => new Intl.NumberFormat("mn-MN").format(price);

  const getMonthlyEquivalent = (price: number, period: BillingPeriod) => {
    const months = period === "quarterly" ? 3 : period === "yearly" ? 12 : 1;
    return Math.floor(price / months);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <MainHeader/>
      <div className="flex flex-col items-center text-center mb-10">
<h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Subscription</h1>
      </div>

      {/* Billing Card */}
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Billing Options */}
        <div className="mb-6 grid grid-cols-4 gap-2 bg-gray-100 p-2 rounded-2xl">
          {billingOptions.map(option => (
            <button
              key={option.key}
              onClick={() => setBillingPeriod(option.key)}
              className={`py-2 rounded-xl font-semibold hover:bg-gray-300 transition-colors `}
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
                <div key={i} className="flex items-center text-gray-700 p-2 rounded-lg">
                  <Check className="w-5 h-5 text-green-400 mr-2" />
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button className="w-full py-4 bg-gray-200 hover:bg-gray-300 text-black font-bold text-lg rounded-2xl shadow-lg ">
          {billingPeriod === "free" ? "Start Free" : "BUY NOW"}
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
