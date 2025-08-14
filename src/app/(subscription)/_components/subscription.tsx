"use client";

import React, { useState } from 'react';
import { Check, Star, Users, BookOpen, Gamepad2, Shield, Crown } from 'lucide-react';

type BillingPeriod = 'monthly' | 'quarterly' | 'yearly';

const billingOptions = [
  { key: 'monthly' as BillingPeriod, label: 'Сараар', discount: 0, price: 19900 },
  { key: 'quarterly' as BillingPeriod, label: '3 сараар', discount: 15, price: 49900 },
  { key: 'yearly' as BillingPeriod, label: 'Жилээр', discount: 25, price: 179900 },
];

const features = [
  'Бүх тоглоомууд',
  'Хязгааргүй цаг ашиглах',
  'HD видео харах',
  'Зураг татах боломж',
  'хязгааргүй хичээл',
  '24/7 дэмжлэг',
  'Эцэг эхийн хяналт',
  'Олон төхөөрөмжөөс ашиглах',
];

function Subscription() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('mn-MN').format(price);
  };

  const getMonthlyEquivalent = (price: number, period: BillingPeriod) => {
    const months = period === 'quarterly' ? 3 : period === 'yearly' ? 12 : 1;
    return Math.floor(price / months);
  };

  const currentOption = billingOptions.find(option => option.key === billingPeriod)!;

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
60 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Second</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Хүүхдийн хөгжилд зориулсан уншлагын платформ
          </p>
        </div>

        {/* Main Subscription Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden">
            {/* Popular Badge */}
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center py-3">
              <div className="flex items-center justify-center">
                <Star className="w-5 h-5 mr-2" />
                Премиум багц
              </div>
            </div>

            <div className="p-8">
              {/* Billing Toggle */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Төлбөрийн хугацаа</h3>
                <div className="bg-gray-100 p-2 rounded-2xl">
                  <div className="grid grid-cols-3 gap-1">
                    {billingOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => setBillingPeriod(option.key)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 relative ${
                          billingPeriod === option.key
                            ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg transform scale-105'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-white'
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
              </div>

              {/* Pricing Display */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-gray-800">
                    ₮{formatPrice(currentOption.price)}
                  </span>
                </div>
                <div className="text-gray-600">
                  {billingPeriod === 'monthly' && <span>сард</span>}
                  {billingPeriod === 'quarterly' && (
                    <div>
                      <span>3 сард</span>
                      <div className="text-green-600 font-semibold mt-1">
                        сард зөвхөн ₮{formatPrice(getMonthlyEquivalent(currentOption.price, billingPeriod))}
                      </div>
                    </div>
                  )}
                  {billingPeriod === 'yearly' && (
                    <div>
                      <span>жилд</span>
                      <div className="text-green-600 font-semibold mt-1">
                        сард зөвхөн ₮{formatPrice(getMonthlyEquivalent(currentOption.price, billingPeriod))}
                      </div>
                    </div>
                  )}
                </div>
                {currentOption.discount > 0 && (
                  <div className="mt-2 text-sm text-green-600 font-semibold">
                    {currentOption.discount}% хямдрал авах боломжтой!
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Багтсан боломжууд</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold text-lg rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Премиум болгох
              </button>

            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Яагаад биднийг сонгох вэ?</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Gamepad2 className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">олон төрлийн тоглоом</h4>
              <p className="text-gray-600 text-sm text-center">Сурах сонирхлыг нэмэгдүүлэх</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Боловсрол</h4>
              <p className="text-gray-600 text-sm text-center">хөгжилтэй аргаар суралцах</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-pink-100 p-3 rounded-full mb-4">
                <Shield className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Аюулгүй</h4>
              <p className="text-gray-600 text-sm text-center">100% хүүхдэд зориулсан</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Бүх төхөөрөмж</h4>
              <p className="text-gray-600 text-sm text-center">Утас, таблет, компьютер</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;