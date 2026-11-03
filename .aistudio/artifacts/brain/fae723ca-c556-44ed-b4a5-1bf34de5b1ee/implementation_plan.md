# Undangan Digital Arisan Keluarga Barista

Website undangan digital arisan keluarga barista yang berkelas, hangat, dan dirancang khusus untuk kenyamanan browsing di perangkat seluler maupun desktop. Menghadirkan amplop pembuka interaktif, hitung mundur acara, peta lokasi terpadu, konfirmasi kehadiran via WhatsApp, serta galeri kenang-kenangan keluarga dengan 5 foto momen kebersamaan.

### User Review & Critical Decisions

> [!IMPORTANT]
> Keputusan dan preferensi yang telah dikonfirmasi dari sesi tanya-jawab:
> - **Waktu Acara**: Minggu, 15 November 2026 pukul 10:00 WIB.
> - **Kontak RSVP WhatsApp**: `+62 812-1346-6786` (tuan rumah: kediaman D Mmh Adam / Mamik Digital).
> - **Palet Warna**: Warm Maroon (#701A24, #881337), Rose Gold / Champagne (#E0A96D, #D4AF37), dan Warm Cream Linen (#FDFBF7, #F5EDE0) yang harmonis dengan busana pada foto keluarga.
> - **Aset Foto**: Menggunakan 5 foto momen kebersamaan keluarga yang telah dilampirkan, dilengkapi fitur galeri interaktif dan penampil lightbox layar penuh.

---

### 1. Overview & Core Concept

- **Apa yang Dibangun**: Platform undangan web arisan keluarga barista yang interaktif dan responsif, menyajikan informasi lengkap tentang jadwal, lokasi kediaman, panduan rute, rundown acara, buku doa keluarga, serta galeri foto kenangan.
- **Target Pengguna**: Seluruh anggota keluarga besar, kerabat, dan tamu undangan yang mengakses melalui tautan WhatsApp di smartphone mereka.
- **Nilai Utama**: Mempermudah silaturahmi keluarga dengan tampilan yang mewah dan menyentuh hati, memudahkan tamu menemukan lokasi perumahan PK13 Blok H14 No 1, serta mencatat kehadiran tamu secara rapi melalui WhatsApp.

---

### 2. User Experience & Visual Design

- **Alur Pengguna**:
  1. **Sampul Interaktif (Envelope Opening Cover)**: Tamu disambut dengan amplop elegan bertuliskan nama tamu undangan, ornamen floral emas, dan tombol "Buka Undangan" dengan animasi transisi lembut serta opsi musik latar instrumen syahdu.
  2. **Hero & Hitung Mundur**: Salam hangat, kutipan silaturahmi arisan barista, serta kartu hitung mundur langsung (Hari, Jam, Menit, Detik) menuju Minggu, 15 November 2026 pukul 10:00 WIB, dilengkapi tombol "Simpan ke Kalender".
  3. **Detail Acara & Tuan Rumah**: Informasi lengkap kediaman D Mmh Adam / Mamik Digital, Perumahan PK13 Blok H14 No 1, serta jadwal susunan acara yang terstruktur rapi.
  4. **Peta Lokasi & Navigasi**: Peta interaktif (Leaflet / OpenStreetMap) yang disematkan dengan penanda khusus kediaman, plus tombol pintas "Buka Google Maps" dan "Panduan Rute Waze".
  5. **Galeri Momen Kebersamaan**: Menampilkan 5 foto keluarga dalam layout visual yang apik, filter momen, rotasi potret, serta pembuka lightbox fullscreen resolusi tinggi.
  6. **Form RSVP WhatsApp**: Formulir konfirmasi kehadiran (Nama, Konfirmasi Hadir/Tidak, Jumlah Anggota, Ucapan Hangat) yang langsung memformat dan mengirim pesan rapi ke WhatsApp `+62 812-1346-6786`.
  7. **Buku Doa & Ucapan Hangat**: Kolom kirim ucapan dan doa dengan penyimpanan lokal (localStorage) agar tamu dapat melihat doa-doa dari kerabat lainnya.
  8. **Navigasi Mobile Floating Bar**: Navigasi bawah ringkas (Home, Waktu, Lokasi, Galeri, RSVP) dengan tinggi $\le 15\%$ viewport sesuai standar ergonomi mobile touch.

- **Identitas Visual & Tipografi**:
  - *Gaya Desain*: Elegan, hangat, kekeluargaan modern dengan sentuhan barista artisan.
  - *Warna*: Dominan Warm Cream Canvas (#FAF7F2), Aksen Mewah Deep Maroon (#701A24) dan Rose Gold (#D4A373, #C89666).
  - *Tipografi*: Display Serif anggun (`Playfair Display` / `Cormorant`) untuk judul dan salam kehormatan, berpadu dengan Geometric Sans (`Plus Jakarta Sans`) untuk teks isi yang sangat nyaman dibaca di layar ponsel.

---

### 3. Key Product Decisions & Trade-Offs

- **Konfirmasi WhatsApp Langsung (Direct wa.me Integration)**:
  - *Pendekatan*: Form terstruktur di web yang otomatis men-generate teks konfirmasi terformat rapi (nama tamu, jumlah rombongan, pesan) lalu membuka tautan WhatsApp ke nomor `+62 812-1346-6786`.
  - *Alasan*: Tidak memerlukan login/akun pihak ketiga, langsung diterima oleh penerima pesan tanpa hambatan teknis.
- **Peta Lokasi Interaktif & Navigasi Terpadu**:
  - *Pendekatan*: Menampilkan peta interaktif OpenStreetMap/Leaflet tanpa dependensi API key berbayar yang rumit, dilengkapi deep-link ke Google Maps dan Waze untuk petunjuk arah akurat menuju PK13 Blok H14 No 1.
- **Galeri Foto Cerdas dengan Koreksi Rotasi**:
  - *Pendekatan*: Foto keluarga (termasuk foto portrait `image_0fa601eb.png`) dioptimalkan dengan orientasi vertikal yang tepat, rasio aspek yang seimbang, dan modal lightbox layar penuh.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     App.tsx (Root View)                     │
├──────────────────────────────┬──────────────────────────────┤
│ EnvelopeModal / Cover Gate   │ Floating Navigation Bar      │
│ (Buka Undangan + Audio BGM)  │ (Ringkas ergonomis mobile)   │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
     ┌─────────┴─────────┐          ┌─────────┴─────────┐
     ▼                   ▼          ▼                   ▼
┌──────────────┐  ┌──────────────┐ ┌──────────────┐  ┌──────────────┐
│ HeroCountdown│  │ EventDetails │ │ Interactive  │  │ PhotoGallery │
│ (15 Nov 2026 │  │ (Kediaman    │ │ Map & Route  │  │ (5 Foto Asli │
│  + Calendar) │  │  Mamik/Adam) │ │ (OSM+Google) │  │  + Lightbox) │
└──────────────┘  └──────────────┘ └──────────────┘  └──────────────┘
               │                              │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │ RSVP & WhatsApp Dispatcher   │
               │ (Nama, Status, +6281213466786│
               │  + Guestbook LocalStorage)   │
               └──────────────────────────────┘
```

- **Penyimpanan Data**: LocalStorage untuk menyimpan ucapan buku tamu dan status audio background music agar tidak membebani server serta langsung responsif.
- **Komponen Interaktif**:
  - `EnvelopeCover`: Sampul amplop animasi dengan segel wax stamp digital.
  - `CountdownTimer`: Perhitungan waktu real-time presisi ke tanggal 15 November 2026 10:00:00 WIB.
  - `InteractiveMap`: Peta interaktif Leaflet + tombol rute cepat.
  - `GallerySection`: Grid masonry responsif untuk 5 foto keluarga dengan fitur lightbox.
  - `RsvpForm`: Validasi input dan generator tautan pesan WhatsApp.
  - `Guestbook`: Daftar ucapan selamat dan doa keberkahan silaturahmi.
