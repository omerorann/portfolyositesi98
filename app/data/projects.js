export const projects = [

  {
    id: 1,
    title: "AyChef",
    description: "Modern tarif paylaşım ve keşif platformu",
    longDescription: `Fransız mutfak teması ile tasarlanmış kapsamlı tarif platformu. Öne çıkan özellikler:
      - Modern ve şık arayüz tasarımı (French cuisine teması)
      - Gelişmiş admin paneli ile tarif yönetimi
      - Slug tabanlı SEO dostu URL yapısı
      - Adım adım görsel tarif rehberleri
      - Supabase entegrasyonu ile resim yükleme
      - Responsive tasarım (tüm cihazlarda uyumlu)
      - Gelişmiş arama ve filtreleme sistemi
      - Interaktif malzeme listesi (tiklenebilir)
      - Tarif kategorileri ve zorluk seviyeleri
      - Rating ve değerlendirme sistemi
      - Modal tabanlı tarif düzenleme
      - Analytics ve istatistik paneli
      - PostgreSQL veritabanı (Prisma ORM)
      - Modern teknoloji stack
      - Hızlı yükleme performansı
      - Otomatik slug oluşturma (Türkçe karakter desteği)`,
    image: "/aychef-preview.png", // Ana sayfa görselini ekleyebilirsiniz
    tech: [
      "Next.js 14", 
      "React", 
      "Tailwind CSS", 
      "Prisma ORM", 
      "PostgreSQL", 
      "Supabase Storage",
      "Slugify",
      "Vercel"
    ],
    url: "https://aychef.vercel.app", // Deploy URL'niz
    featured: true,
    stats: {
      views: 850,
    },
    
  },
  {
    id: 2,
    title: "Evercraft Solutions",
    description: "Endüstriyel mühendislik çözümleri için kurumsal web sitesi",
    longDescription: `Demiryolu, havacılık, denizcilik ve savunma sanayii için gelişmiş mühendislik çözümleri sunan Evercraft Solutions'ın kurumsal web sitesi. Öne çıkan özellikler:
      - Modern ve profesyonel kurumsal tasarım
      - Interaktif 3D model gösterimleri (Three.js entegrasyonu)
      - Canvas tabanlı OBJ model renderlaması (uçak, gemi, tren, tank modelleri)
      - Gelişmiş animasyon sistemi (GSAP & Framer Motion)
      - Responsive tasarım (mobil, tablet, desktop uyumlu)
      - Endüstri bazlı sayfalar (Railway, Aviation, Marine, Defense)
      - Video entegrasyonlu tesisler bölümü (YouTube iframe)
      - Partner logoları grid sistemi
      - Dinamik hero slider (Swiper.js)
      - Hakkımızda sayfası (misyon, vizyon, değerler)
      - SEO dostu URL yapısı
      - Contact Us formu
      - Modern navigation menüsü (mobile hamburger menü)
      - Skills/yetenekler showcase bölümü
      - Footer sosyal medya entegrasyonu
      - Export build konfigürasyonu
      - Çoklu font desteği (Poppins, Chakra Petch)
      - Tailwind CSS ile optimize edilmiş styling
      - Smooth scroll animasyonları
      - Loading spinners ve UX iyileştirmeleri`,
    image: "/evercraft-preview.png", // Bu görseli ekleyebilirsiniz
    tech: [
      "Next.js 14", 
      "React", 
      "Tailwind CSS", 
      "Three.js",
      "GSAP",
      "Framer Motion", 
      "Swiper.js",
      "React Three Fiber",
      "HTML5 Canvas",
      "Vercel"
    ],
    url: "https://evercraft-solutions.vercel.app", // Deploy URL'inizi buraya ekleyin
    github: "https://github.com/omerorann/evercraft", // GitHub repo URL'i
    featured: true,
    stats: {
      views: 950,
    },
  },
  {
    id: 3,
    title: "Meer E-Ticaret",
    description: "Modern ve kullanıcı dostu e-ticaret platformu",
    longDescription: `Gelişmiş özelliklere sahip e-ticaret projesi. Özellikler:
      - Kategori bazlı ürün listeleme
      - Responsive tasarım`,
    image: "/meerfend.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "Axios", "Vercel"],
    url: "https://meer-mocha.vercel.app",
    github: "https://github.com/omerorann/meer-front-end",
    featured: true,
    stats: {
      views: 1500,
    },
  },
  {
    id: 4,
    title: "Meer Yönetim Paneli",
    description: ".NET Core 8 ile geliştirilmiş modern admin paneli",
    longDescription: `E-ticaret platformu için kapsamlı yönetim paneli. Özellikler:
      - Ürün yönetimi`,
    image: "/noimg.png",
    tech: [
      ".NET Core 8",
      "C#",
      "Entity Framework",
      "Postgres",
      "REST API",
      "Heroku",
    ],
    url: "https://meer-backend-3189f875378d.herokuapp.com",
    featured: true,
    stats: {
      views: 1200,
    },
  },
  {
    id: 5,
    title: "Portfolio 98",
    description: "Windows 98 temalı kişisel portfolyo web sitesi",
    longDescription: `Windows 98 teması ile tasarlanmış interaktif portfolyo sitesi. Öne çıkan özellikler:
      - Windows 98 arayüz tasarımı ve ikonları
      - Tam işlevsel pencere yönetimi (minimize, maximize, close)
      - Gerçekçi dosya gezgini simülasyonu
      - Masaüstü ikonları ve sağ tık menüsü
      - Görev çubuğu ve başlat menüsü
      - Komut satırı (CMD) simülasyonu
      - Responsive tasarım (mobil uyumlu)
      - Modern teknoloji stack (Next.js, React, Tailwind CSS)
      - SEO optimizasyonu
      - Hızlı yükleme performansı
      - İletişim formu entegrasyonu
      - Yükleme ekranı animasyonu
      - Tarayıcı simülasyonu`,
    image: "/portfolio98.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    url: "https://portfolio98.vercel.app",
    github: "https://github.com/omerorann/portfolyositesi98",
    featured: true,
    stats: {
      views: 1000,
    },
  },

 
  {
    id: 6,
    title: "Smart Mansion",
    description: "Akıllı ev teknolojileri için kurumsal web sitesi",
    longDescription: `Smart Mansion için geliştirilen modern ve profesyonel kurumsal web sitesi. Öne çıkan özellikler:
      - Responsive tasarım
      - Animasyonlar
      - Ürün ve hizmet tanıtımları
      - İletişim formu
      - SEO optimizasyonu
      - Modern UI/UX tasarımı
      - Hızlı yükleme performansı`,
    image: "/smartmansion.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    url: "https://smartmansionsoftware.com",
    featured: true,
    stats: {
      views: 2500,
    },
  },
  {
    id: 7,
    title: "Akay Dijital Baskı E-Ticaret",
    description: "Kapsamlı e-ticaret platformu ve yönetim paneli",
    longDescription: `Dijital baskı ürünleri için gelişmiş e-ticaret sitesi. Özellikler:
      - Ürün yönetim paneli
      - Sipariş yönetimi
      - Sepet yönetimi
      - Kullanıcı hesapları
      - Admin dashboard
      - Stok takibi
      - Ödeme işlemeleri
      - Kargo takibi
      - Responsive tasarım
      - Animasyonlar`,
    image: "/akaydijitalb.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "Firebase", "Vercel"],
    url: "https://akaydijitalbaski.vercel.app",
    featured: true,
    stats: {
      views: 1800,
    },
  },
  
];
