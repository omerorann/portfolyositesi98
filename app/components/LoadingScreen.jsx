"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Başlatılıyor...");

  useEffect(() => {
    const statuses = [
      "Sistem yapılandırması kontrol ediliyor…",
      "Portfolio 98 yükleniyor…",
      "Masaüstü ortamı hazırlanıyor...",
      "Dosya Gezgini başlatılıyor...",
      "Kullanıcı profili yükleniyor...",
      "Neredeyse hazır..."
    ];

    let currentStatus = 0;
    const statusInterval = setInterval(() => {
      if (currentStatus < statuses.length) {
        setStatus(statuses[currentStatus]);
        currentStatus++;
      }
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(statusInterval);
          setTimeout(() => {
            onLoadingComplete();
          }, 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [onLoadingComplete]);

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
              className="absolute inset-y-0 left-0 bg-[#000080] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-sm">{status}</p>
      </div>
    </div>
  );
}
