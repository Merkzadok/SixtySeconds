// components/ProfileCard.tsx
"use client";

import { useUser } from "@/provider/CurrentUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ProfileForm = {
  name: string;
  email: string;
  avatarImage: string;
  age: number;
};

export default function ProfileCard() {
  const { user, setUser, loading } = useUser();
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const formik = useFormik<ProfileForm>({
    initialValues: {
      name: user?.profile?.name || "",
      email: user?.email || "",
      avatarImage: user?.profile?.avatarImage || "",
      age: user?.profile?.age || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Нэр оруулах шаардлагатай"),
      email: Yup.string().email("Зөв имэйл оруулна уу").required("Имэйл шаардлагатай"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("Token:");
        if (!token) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/update/${user?.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error("Failed to update");
        const data = await res.json();

        // Context update
        setUser({
          ...user!,
          email: values.email,
          profile: {
            ...data.profile,
            avatarImage: data.profile.avatarImage || "",
            age: data.profile.age || 0,
          },
        });
        setEditing(false);
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (loading) return <p className="text-center">Loading...</p>;
  if (!user) return <p className="text-center">No user found</p>;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-purple-300 h-28 relative">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <img
            src={formik.values.avatarImage || "/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div className="pt-16 pb-6 px-6 text-center">
        {editing ? (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <input
              name="name"
              placeholder="Нэр"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded-lg"
            />
            {formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}

            <input
              name="email"
              placeholder="Имэйл"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded-lg"
            />
            {formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}

            <input
              name="avatarImage"
              placeholder="Avatar URL"
              value={formik.values.avatarImage}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded-lg"
            />

            <input
              name="age"
              type="number"
              placeholder="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded-lg"
            />

            <div className="flex gap-2">
              <button type="button" onClick={() => setEditing(false)} className="flex-1 bg-gray-400 text-white py-2 rounded-lg">
                Цуцлах
              </button>
              <button type="submit" className="flex-1 bg-green-500 text-white py-2 rounded-lg">
                Хадгалах
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{formik.values.name || "Нэр байхгүй"}</h2>
            <p className="text-gray-500">{formik.values.email || "Имэйл байхгүй"}</p>
            <p className="text-gray-500">Age: {formik.values.age}</p>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditing(true)} className="flex-1 bg-purple-500 text-white py-2 rounded-lg shadow hover:opacity-90">
                Edit profile
              </button>
              <button onClick={() => router.push("/subscription")} className="flex-1 bg-blue-500 text-white py-2 rounded-lg shadow hover:opacity-90">
                Subscription
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
