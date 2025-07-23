"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Başlatılıyor...");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.floor(Math.random() * 10) + 5, 100);
        return next;
      });
    }, 200); // Daha sık ve hızlı güncelleme

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    // Progress'e göre status belirleme
    if (progress < 10) setStatus("Sistem yapılandırması kontrol ediliyor…");
    else if (progress < 30) setStatus("Portfolio 98 yükleniyor…");
    else if (progress < 50) setStatus("Masaüstü ortamı hazırlanıyor...");
    else if (progress < 70) setStatus("Dosya Gezgini başlatılıyor...");
    else if (progress < 90) setStatus("Kullanıcı profili yükleniyor...");
    else if (progress < 100) setStatus("Neredeyse hazır...");
    else {
      setStatus("Tamamlandı!");
      setTimeout(() => {
        onLoadingComplete();
      }, 300); // Daha kısa bekleme süresi
    }
  }, [progress, onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-[#008080] flex flex-col items-center justify-center text-white z-[9999]">
      <div className="win98-window bg-[#c0c0c0] text-black p-4 w-[400px] max-w-[90vw]">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/windows-0.png"
            alt="Windows 98"
            width={32}
            height={32}
            className="animate-bounce"
          />
          <h1 className="text-xl">Portfolio 98</h1>
        </div>

        <div className="mb-4">
          <div className="win98-window bg-white p-1 h-5 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#000080] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-sm">{status}</p>
      </div>
    </div>
  );
}