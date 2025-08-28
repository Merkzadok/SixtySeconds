"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useUser } from "@/provider/CurrentUser";
import { useRouter } from "next/navigation";

const avatarOptions = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
];

export default function ProfileForm() {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    profileImage: "/avatars/avatar1.png",
  });

  const [previewImage, setPreviewImage] = useState<string>(
    "/avatars/avatar1.png"
  );
  const [uploading, setUploading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        username: user.username || "",
      }));
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formImage = new FormData();
    formImage.append("file", file);
    formImage.append("upload_preset", "profileImage");

    setUploading(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/daywx3gsj/image/upload",
        {
          method: "POST",
          body: formImage,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setPreviewImage(data.secure_url);
        setFormData((prev) => ({ ...prev, profileImage: data.secure_url }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarSelect = (url: string) => {
    setPreviewImage(url);
    setFormData((prev) => ({ ...prev, profileImage: url }));
  };
  console.log(user);
  const handleSubmit = async (e: FormEvent) => {
    if (!user?.id) return;
    e.preventDefault();
    setLoadingSave(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/create/${user?.id}`,
        {
          avatarImage: formData.profileImage,
          age: parseInt(formData.age),
          username: formData.username,
        }
      );
      alert("Мэдээлэл амжилттай хадгалагдлаа!");
      setTimeout(() => router.push("/home"), 1000);
    } catch (error) {
      console.error("Хадгалах үед алдаа гарлаа:", error);
      alert("Хадгалах үед алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-100 to-yellow-50 flex flex-col items-center py-6 px-4">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-yellow-500 mb-6 text-center">
        Миний профайл
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border-2 border-green-500 rounded-3xl shadow-lg px-5 py-6 space-y-6"
      >
        <div className="flex justify-center">
          <img
            src={previewImage}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full border-4 border-green-400 object-cover"
          />
        </div>

        <div className="flex justify-center gap-2 flex-wrap mt-2">
          {avatarOptions.map((url, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleAvatarSelect(url)}
              className={`w-12 h-12 rounded-full p-1 border-2 ${
                previewImage === url ? "border-green-500" : "border-transparent"
              } hover:border-blue-400 transition-all`}
            >
              <img
                src={url}
                alt={`Avatar ${index + 1}`}
                className="rounded-full w-full h-full"
              />
            </button>
          ))}
        </div>

        <div className="text-center">
          <Label htmlFor="upload" className="text-sm text-gray-600">
            📤 Зураг оруулах:
          </Label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="ml-2 text-sm"
          />
        </div>
        {uploading && (
          <p className="text-center text-blue-500 text-sm mt-1">
            Зураг байршиж байна...
          </p>
        )}

        <div>
          <Label htmlFor="name">Нэр</Label>
          <Input
            id="name"
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Имэйл</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            readOnly
            className="mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <Label htmlFor="age">Нас</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div className="pt-3">
          <Button
            type="submit"
            disabled={loadingSave}
            className="w-full bg-green-400 hover:bg-green-500 text-white text-lg py-3 rounded-xl disabled:opacity-70"
          >
            {loadingSave ? "Хадгалж байна..." : "✅ Хадгалах"}
          </Button>
        </div>
      </form>
    </div>
  );
}
