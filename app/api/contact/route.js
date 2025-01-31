import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    // Temel doğrulama
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tüm alanların doldurulması zorunludur" },
        { status: 400 }
      );
    }

    // E-posta gönderme
    const mailOptions = {
      from: email,
      to: "omerorn.dev@gmail.com",
      subject: `${name} - Seninle İletişim Kurmak İstiyor`,
      text: `İsim: ${name}\nE-posta: ${email}\nMesaj: ${message}`,
      html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "E-posta başarıyla gönderildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    return NextResponse.json(
      { error: "E-posta gönderilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
