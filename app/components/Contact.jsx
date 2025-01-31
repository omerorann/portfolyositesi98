"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiMail, FiUser, FiMessageSquare } from "react-icons/fi";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="text-sm mb-4">
        Proje fikirlerinizi paylaşmak veya bir konuda yardım almak için benimle
        iletişime geçebilirsiniz.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">İsim Soyisim:</label>
          <div className="flex gap-2">
            <span className="win98-button p-1">
              <FiUser className="h-4 w-4" />
            </span>
            <input
              {...register("name", { required: true })}
              className="win98-input flex-grow"
              placeholder="Adınızı ve soyadınızı girin"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">E-posta Adresi:</label>
          <div className="flex gap-2">
            <span className="win98-button p-1">
              <FiMail className="h-4 w-4" />
            </span>
            <input
              {...register("email", { required: true })}
              type="email"
              className="win98-input flex-grow"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Mesajınız:</label>
          <div className="flex gap-2">
            <span className="win98-button p-1">
              <FiMessageSquare className="h-4 w-4" />
            </span>
            <textarea
              {...register("message", { required: true })}
              rows="4"
              className="win98-input flex-grow"
              placeholder="Mesajınızı buraya yazın"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-win98-border-dark">
          <button
            type="submit"
            disabled={isLoading}
            className={`win98-button px-4 py-1 ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            {isLoading ? "Gönderiliyor..." : "Gönder"}
          </button>

          {status && (
            <div
              className={`win98-button px-4 py-1 ${
                status === "success" ? "bg-win98-button" : "shadow-win98-in"
              }`}
            >
              {status === "success"
                ? "Mesajınız gönderildi!"
                : "Bir hata oluştu."}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
