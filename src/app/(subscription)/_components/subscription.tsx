"use client";

import React, { useState, useContext } from "react";
import { Check, Star, Users, BookOpen, Gamepad2, Shield, Crown } from "lucide-react";
// import { AuthContext } from "@/context/AuthContext";

type BillingPeriod = "MONTHLY" | "THREE_MONTHS" | "YEARLY";

interface BillingOption {
  key: BillingPeriod;
  label: string;
  discount: number;
  price: number;
  planId: number;
}

const billingOptions: BillingOption[] = [
  { key: "MONTHLY", label: "Сараар", discount: 0, price: 19900, planId: 1 },
  { key: "THREE_MONTHS", label: "3 сараар", discount: 15, price: 49900, planId: 2 },
  { key: "YEARLY", label: "Жилээр", discount: 25, price: 179900, planId: 3 },
];

const features = [
  "Бүх тоглоомууд",
  "Хязгааргүй цаг ашиглах",
  "Хязгааргүй унших",
  "Хязгааргүй дасгал",
  "хязгааргүй хичээл",
  "",
  "Эцэг эхийн хяналт",
  "Олон төхөөрөмжөөс ашиглах",
  "Хэрэглэгчийн дэмжлэг",
  "Хязгааргүй хэрэглэгчийн бүртгэл",
  "Хязгааргүй хэрэглэгчийн дэмжлэг",
  "Хязгааргүй хэрэглэгчийн тохиргоо",
];

export default function Subscription() {
  // const { user } = useContext(AuthContext);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("MONTHLY");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const currentOption = billingOptions.find((o) => o.key === billingPeriod)!;

  const formatPrice = (price: number) => new Intl.NumberFormat("mn-MN").format(price);

  const getMonthlyEquivalent = (price: number, period: BillingPeriod) =>
    period === "THREE_MONTHS" ? Math.floor(price / 3) : period === "YEARLY" ? Math.floor(price / 12) : price;

  const handleSubscribe = async () => {
    if (!Users) {
      setMessage("Та эхлээд нэвтэрсэн байх шаардлагатай.");
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:4001/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: currentOption.planId }),
      });

      if (!res.ok) throw new Error(`Subscription creation failed: ${res.status}`);
      const data = await res.json();
      setMessage("Амжилттай бүртгэгдлээ!");
      console.log("Subscription created:", data);
    } catch (err) {
      console.error(err);
      setMessage("Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-4 rounded-full shadow-lg">
              <Crown className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            60{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Second
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Хүүхдийн хөгжилд зориулсан уншлагын платформ
          </p>
        </div>

        {/* Main Subscription Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden p-8">
          {/* Billing Toggle */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Төлбөрийн хугацаа</h3>
            <div className="bg-gray-100 p-2 rounded-2xl grid grid-cols-3 gap-1">
              {billingOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setBillingPeriod(option.key)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 relative ${
                    billingPeriod === option.key
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white"
                  }`}
                >
                  {option.label}
                  {option.discount > 0 && (
                    <span className="absolute -top-2 -right-1 bg-pink-400 text-white text-xs px-2 py-1 rounded-full">
                      -{option.discount}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-gray-800 mb-2">
              ₮{formatPrice(currentOption.price)}
            </div>
            {currentOption.discount > 0 && (
              <div className="text-sm text-green-600 font-semibold">
                {currentOption.discount}% хямдрал авах боломжтой!
              </div>
            )}
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 mt-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold text-lg rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50"
            >
              {loading ? "Түр хүлээнэ үү..." : "Премиум болгох"}
            </button>
            {message && <p className="mt-4 font-semibold text-center">{message}</p>}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-3 mt-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
