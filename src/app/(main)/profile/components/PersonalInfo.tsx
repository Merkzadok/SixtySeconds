"use client";

import { useUser } from "@/provider/CurrentUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Image, Calendar, Edit3, CreditCard, Loader2 } from "lucide-react";

type ProfileForm = {
  username: string;
  email: string;
  avatarImage: string;
  age: number;
};

export default function ProfileCard() {
  const { user, setUser, loading } = useUser();
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const handleProfileSave = async (values: ProfileForm) => {
    try {
      const token = localStorage.getItem("Token:");
      if (!token || !user) return;

      let url = "";
      let method: "POST" | "PUT" = "PUT";

  
      if (!user.profile) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/profile/create/${user.id}`;
        method = "POST";
      } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}/profile/update/${user.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.username,
          avatarImage: values.avatarImage,
          age: values.age,
        }),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      const data = await res.json();

      setUser({
        ...user,
        email: values.email,
        profile: {
          ...data.userProfile ?? data.profile,
          avatarImage: data.userProfile?.avatarImage || data.profile?.avatarImage || "",
          age: data.userProfile?.age || data.profile?.age || 0,
        },
      });

      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik<ProfileForm>({
    initialValues: {
      username: user?.profile?.name || "",
      email: user?.email || "",
      avatarImage: user?.profile?.avatarImage || "",
      age: user?.profile?.age || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("Нэр оруулах шаардлагатай"),
      email: Yup.string().email("Зөв имэйл оруулна уу").required("Имэйл шаардлагатай"),
    }),
    onSubmit: handleProfileSave,
  });

  if (loading)
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <Loader2 className="w-12 h-12 mx-auto text-purple-500 animate-spin" />
        <p className="text-lg font-semibold text-purple-600 mt-4">Loading...</p>
      </div>
    );

  if (!user)
    return (
      <div className="max-w-md mx-auto p-8 text-center bg-red-100 rounded-3xl">
        <p className="text-lg font-semibold text-red-600">No user found</p>
      </div>
    );

  return (
    <div className="mt-12 max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 relative">
      {/* bg imgg */}
      <div className="relative h-40">
        <img src="/kids.png" alt="Header background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <svg
          className="absolute bottom-0 left-0 w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,208C840,213,960,203,1080,197.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>

        {/* profile zurgg */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 cursor-pointer w-24 h-24 rounded-full overflow-hidden shadow-xl ring-4 ring-white bg-white">
          <label htmlFor="avatar-input" className="w-full h-full block relative">
            <img src="/avatar-bg.png" alt="avatar background" className="absolute inset-0 w-full h-full object-cover" />
            <img
              src={formik.values.avatarImage || "/default-avatar.png"}
              alt="avatar"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </label>
          <input
            type="file"
            id="avatar-input"
            accept="image/*"
            className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  formik.setFieldValue("avatarImage", reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>

      
      <div className="pt-16 pb-8 px-8">
        {editing ? (
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                <User className="w-5 h-5 text-purple-500" /> Нэр
              </label>
              <input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-400 outline-none"
                placeholder="Нэрээ бичнэ үү"
              />
              {formik.errors.username && <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                <Mail className="w-5 h-5 text-blue-500" /> Имэйл
              </label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Имэйл хаяг"
              />
              {formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                <Calendar className="w-5 h-5 text-orange-500" /> Нас
              </label>
              <input
                type="number"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Нас"
              />
            </div>

            {/* savee */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition"
              >
                Цуцлах
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Хадгалах
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">{formik.values.username || "Нэр байхгүй"}</h2>
            <p className="text-gray-600">{formik.values.email || "Имэйл байхгүй"}</p>
            <p className="text-gray-700 font-medium">{formik.values.age} нас</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                <Edit3 className="w-5 h-5" /> Засах
              </button>
              <button
                onClick={() => router.push("/subscription")}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" /> Гишүүнчлэл
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
