"use client";
import { useUser } from "@/provider/CurrentUser";
import React, { useEffect, useState } from "react";

export const PersonalInfo = () => {
  const { user } = useUser();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({
    name: "",
    about: "",
    avatarImage: "",
    birthDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        birthDate: user.birthDate
          ? new Date(user.birthDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    console.log(user);
    if (!user) return console.log("dfadfaalga");

    try {
      const token = localStorage.getItem("Token:");
      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }
      console.log(form);
      const res = await fetch(
        `http://localhost:4001/profile/create/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      console.log("Updated:", data);

      // if your provider has setUser, update it here
      // setUser(data);

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
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Имэйл"
            />
            <input
              name="about"
              value={form.about}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Утас"
            />
            <input
              name="avatarImage"
              value={form.avatarImage}
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
