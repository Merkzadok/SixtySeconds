"use client";

import React, { useState } from "react";
import { useUser } from "@/provider/CurrentUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2, Edit2, Check, X } from "lucide-react";
import Image from "next/image";

type ProfileForm = {
  username: string;
  email: string;
  avatarImage: string;
  age: number;
};

const avatarList = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
];

export default function ProfileCard() {
  const { user, setUser, loading } = useUser();
  const [editing, setEditing] = useState(false);

  const formik = useFormik<ProfileForm>({
    initialValues: {
      username: user?.profile?.username || "",
      email: user?.email || "",
      avatarImage: user?.profile?.avatarImage || "",
      age: user?.profile?.age || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("Нэр оруулах шаардлагатай"),
      email: Yup.string()
        .email("Зөв имэйл оруулна уу")
        .required("Имэйл шаардлагатай"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("Token:");
        if (!token || !user) return;

        const url = `${process.env.NEXT_PUBLIC_API_URL}/profile/update/${user.id}`;

        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error("Failed to save profile");

        const data = await res.json();

        setUser({
          ...user,
          email: values.email,
          profile: {
            ...(data.profile ?? {}),
            avatarImage: data.profile?.avatarImage || values.avatarImage,
            age: data.profile?.age || values.age,
            username: data.profile?.username || values.username,
            name: data.profile?.name || user.profile.username,
          },
        });

        setEditing(false);
      } catch {
        alert("Профайл хадгалах явцад алдаа гарлаа.");
      }
    },
  });

  if (loading)
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <Loader2 className="w-12 h-12 mx-auto text-green-600 animate-spin" />
        <p className="text-lg font-semibold text-green-600 mt-4">Loading...</p>
      </div>
    );

  if (!user)
    return (
      <div className="max-w-md mx-auto p-8 text-center bg-red-100 rounded-3xl">
        <p className="text-lg font-semibold text-red-600">No user found</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center py-10 bg-white min-h-screen space-y-8 px-4 md:px-0">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#2a7b9b] via-[#57c785] to-[#eddd53] bg-clip-text text-transparent mb-6">
        Миний профайл
      </h1>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border-2 border-[#0AA84C] p-6 space-y-6 relative">
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0AA84C] shadow-md relative">
            <Image
              src={formik.values.avatarImage || "/default-avatar.png"}
              alt="avatar"
              fill
              className="object-cover rounded-full"
            />
          </div>
        </div>

        {editing && (
          <div className="flex justify-center gap-4 flex-wrap">
            {avatarList.map((avatar, index) => (
              <button
                key={index}
                type="button"
                onClick={() => formik.setFieldValue("avatarImage", avatar)}
                className={`w-14 h-14 rounded-full overflow-hidden border-4 transition-all duration-300 relative ${
                  formik.values.avatarImage === avatar
                    ? "border-[#0AA84C] scale-110 shadow-lg"
                    : "border-transparent hover:border-[#0AA84C]"
                }`}
              >
                <Image
                  src={avatar}
                  alt={`avatar-${index}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {!editing ? (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold">
              {user?.profile?.username}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p>Нас: {user?.profile?.age}</p>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                Нэр
              </label>
              <input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#0AA84C] outline-none transition"
                placeholder="Нэрээ бичнэ үү"
              />
              {formik.errors.username && formik.touched.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                Имэйл
              </label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#068F3F] outline-none transition"
                placeholder="Имэйл хаяг"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                Нас
              </label>
              <input
                type="number"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#057534] outline-none transition"
                placeholder="Нас"
              />
            </div>

            <div className="flex justify-between space-x-4">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#55E691] hover:bg-[#32C971] text-white font-semibold py-3 rounded-xl transition w-full"
              >
                <Check size={20} /> Хадгалах
              </button>
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setEditing(false);
                }}
                className="flex items-center justify-center gap-2 bg-[#3ACAF2] hover:bg-[#2397B8] text-white font-semibold py-3 rounded-xl transition w-full"
              >
                <X size={20} /> Болих
              </button>
            </div>
          </form>
        )}

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#55E691] text-white hover:bg-[#0E9654] transition"
            aria-label="Edit profile"
          >
            <Edit2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
