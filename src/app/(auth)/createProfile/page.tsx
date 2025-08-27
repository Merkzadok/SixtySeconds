"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useUser } from "@/provider/CurrentUser";

const avatarOptions = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
];

// Та өөрийн userProvider-оос хэрэглэгчийн id-ийг авна гэж үзье
const { user, setUser, loading } = useUser();

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    profileImage: "",
  });

  const [previewImage, setPreviewImage] = useState<string>(
    formData.profileImage
  );
  const [uploading, setUploading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingSave(true);
    try {
      await axios.post(`http://localhost:4200/profile/create/${user?.id}`, {
        avatarImage: formData.profileImage,
        age: formData.age,
        name: formData.name,
      });
      alert("Мэдээлэл амжилттай хадгалагдлаа!");
    } catch (error) {
      console.error("Хадгалах үед алдаа гарлаа:", error);
      alert("Хадгалах үед алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-100 to-yellow-50 flex flex-col items-center py-6 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-yellow-500 mb-6 text-center">
        Миний профайл
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border-2 border-green-500 rounded-3xl shadow-lg px-5 py-6 space-y-6"
      >
        {/* Profile Image Preview */}
        <div className="flex justify-center">
          <img
            src={previewImage}
            alt="Profile Preview"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-green-400 object-cover"
          />
        </div>

        {/* Avatar Selection */}
        <div className="flex justify-center gap-3 flex-wrap mt-2">
          {avatarOptions.map((url, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleAvatarSelect(url)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full p-1 border-2 ${
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

        {/* Upload from device */}
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

        {/* Name */}
        <div>
          <Label htmlFor="name">Нэр</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-1"
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Имэйл</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            disabled
            className="mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Age */}
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

        {/* Save Button Only */}
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
