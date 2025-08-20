"use client";
import React from "react";
import { useState } from "react";

export const PersonalInfo = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    email: "boloroo2020@yahoo.com",
    phone: "976 89898989",
    location: "Ulaanbaatar, Mongolia",
    birthDate: "1990-03-15",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/profile/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("Updated:", data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>👤</span> Хувийн мэдээлэл
      </h2>

      <div className="space-y-4">
        {editing ? (
          <>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Имэйл"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Утас"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Байршил"
            />
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <span className="text-blue-500 text-xl">📧</span>
              <div>
                <p className="text-gray-500 text-sm">Имэйл</p>
                <p className="font-medium text-gray-800">{form.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">📞</span>
              <div>
                <p className="text-gray-500 text-sm">Утас</p>
                <p className="font-medium text-gray-800">{form.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-pink-500 text-xl">📍</span>
              <div>
                <p className="text-gray-500 text-sm">Байршил</p>
                <p className="font-medium text-gray-800">{form.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-xl">📅</span>
              <div>
                <p className="text-gray-500 text-sm">Төрсөн өдөр</p>
                <p className="font-medium text-gray-800">{form.birthDate}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {editing ? (
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          Хадгалах
        </button>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          Мэдээлэл засах
        </button>
      )}
    </div>
  );
};

export default PersonalInfo;
