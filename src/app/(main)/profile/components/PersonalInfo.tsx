// "use client";
// import { useUser } from "@/provider/CurrentUser";
// import React, { useEffect, useState } from "react";

// export const PersonalInfo = () => {
//   const { user } = useUser();

//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState<any>({
//     name: "",
//     about: "",
//     avatarImage: "",
//     birthDate: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (user) {
//       setForm({
//         ...user,
//         birthDate: user.birthDate
//           ? new Date(user.birthDate).toISOString().split("T")[0]
//           : "",
//       });
//     }
//   }, [user]);

//   const handleSave = async () => {
//     if (!user) return;

//     try {
//       const token = localStorage.getItem("Token:");
//       if (!token) {
//         console.error("No token found. User not authenticated.");
//         return;
//       }

//       const res = await fetch(
//         `http://localhost:4001/profile/create/${user.id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(form),
//         }
//       );

//       if (!res.ok) throw new Error("Failed to update profile");

//       const data = await res.json();

//       // if your provider has setUser, update it here
//       // setUser(data);

//       setEditing(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <span>👤</span> Хувийн мэдээлэл
//       </h2>

//       <div className="space-y-4">
//         {editing ? (
//           <>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Имэйл"
//             />
//             <input
//               name="about"
//               value={form.about}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Утас"
//             />
//             <input
//               name="avatarImage"
//               value={form.avatarImage}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Байршил"
//             />
//             <input
//               type="date"
//               name="birthDate"
//               value={form.birthDate}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </>
//         ) : (
//           <>
//             <div className="flex items-center gap-3">
//               <span className="text-blue-500 text-xl">📧</span>
//               <div>
//                 <p className="text-gray-500 text-sm">Имэйл</p>
//                 <p className="font-medium text-gray-800">{form.email}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="text-green-500 text-xl">📞</span>
//               <div>
//                 <p className="text-gray-500 text-sm">Утас</p>
//                 <p className="font-medium text-gray-800">{form.phone}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="text-pink-500 text-xl">📍</span>
//               <div>
//                 <p className="text-gray-500 text-sm">Байршил</p>
//                 <p className="font-medium text-gray-800">{form.location}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="text-yellow-500 text-xl">📅</span>
//               <div>
//                 <p className="text-gray-500 text-sm">Төрсөн өдөр</p>
//                 <p className="font-medium text-gray-800">{form.birthDate}</p>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {editing ? (
//         <button
//           onClick={handleSave}
//           className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
//         >
//           Хадгалах
//         </button>
//       ) : (
//         <button
//           onClick={() => setEditing(true)}
//           className="mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
//         >
//           Мэдээлэл засах
//         </button>
//       )}
//     </div>
//   );
// };

// export default PersonalInfo;
"use client";
import { useUser } from "@/provider/CurrentUser";
import { UserType } from "@/type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Define the form type based on the fields you're actually using
type PersonalInfoFormType = {
  name: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string; // ISO date string for form inputs
};

export const PersonalInfo = () => {
  const { user } = useUser();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<PersonalInfoFormType>({
    name: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setForm({
        name: user.profile?.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        birthDate: user.birthDate
          ? new Date(user.birthDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    try {
      const token = localStorage.getItem("Token:");
      if (!token) {
        toast.error("No authentication token found");
        return;
      }

      // Show loading toast
      toast.loading("Saving profile...");

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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await res.json();

      // Success toast with auto-navigation
      toast.success("Profile updated successfully! 🎉", {
        description: "Your changes have been saved.",
        duration: 2000,
      });

      setEditing(false);

      // Optional: If you have a setUser function in your context, update it
      // setUser(data);
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to save profile", {
        description:
          err instanceof Error ? err.message : "Please try again later",
      });
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (user) {
      setForm({
        name: user.profile?.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        birthDate: user.birthDate
          ? new Date(user.birthDate).toISOString().split("T")[0]
          : "",
      });
    }
    setEditing(false);
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>👤</span> Хувийн мэдээлэл
      </h2>

      <div className="space-y-4">
        {editing ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Нэр
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Таны нэр"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имэйл
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Утас
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+976 9999 9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Байршил
              </label>
              <input
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Улаанбаатар, Монгол"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Төрсөн өдөр
              </label>
              <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <span className="text-purple-500 text-xl">👤</span>
              <div>
                <p className="text-gray-500 text-sm">Нэр</p>
                <p className="font-medium text-gray-800">
                  {form.name || "Тодорхойгүй"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <span className="text-blue-500 text-xl">📧</span>
              <div>
                <p className="text-gray-500 text-sm">Имэйл</p>
                <p className="font-medium text-gray-800">
                  {form.email || "Тодорхойгүй"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <span className="text-green-500 text-xl">📞</span>
              <div>
                <p className="text-gray-500 text-sm">Утас</p>
                <p className="font-medium text-gray-800">
                  {form.phone || "Тодорхойгүй"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <span className="text-pink-500 text-xl">📍</span>
              <div>
                <p className="text-gray-500 text-sm">Байршил</p>
                <p className="font-medium text-gray-800">
                  {form.location || "Тодорхойгүй"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <span className="text-yellow-500 text-xl">📅</span>
              <div>
                <p className="text-gray-500 text-sm">Төрсөн өдөр</p>
                <p className="font-medium text-gray-800">
                  {form.birthDate
                    ? new Date(form.birthDate).toLocaleDateString("mn-MN")
                    : "Тодорхойгүй"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {editing ? (
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-500 text-white py-3 rounded-lg shadow hover:bg-gray-600 transition font-medium"
          >
            Цуцлах
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg shadow hover:bg-green-600 transition font-medium"
          >
            Хадгалах
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg shadow hover:opacity-90 transition font-medium"
        >
          Мэдээлэл засах
        </button>
      )}
    </div>
  );
};

export default PersonalInfo;
