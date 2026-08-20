# UMKM KU  Prototipe v2 (Frontend + Backend Dummy)

Website interaktif untuk membantu pelaku UMKM Indonesia mengakses informasi usaha:
panduan mulai usaha, pencatatan keuangan sederhana, checklist legalitas, cek kesiapan
modal, dan materi belajar singkat. Ringan, mobile-first, ramah pemula, bahasa sehari-hari.

---

## 1. Cara Menjalankan

Tidak butuh instalasi apa pun:

- **Paling cepat:** klik dua kali `index.html`  langsung jalan dari browser.
- **Disarankan (paling stabil):** jalankan server statis kecil dari folder ini, misalnya
  `python3 -m http.server 8000` lalu buka `http://localhost:8000`.
- **Untuk demo ke orang lain:** upload seluruh folder ke Netlify Drop / Vercel /
  GitHub Pages  semuanya statis, gratis.

### Akun Demo (sekali klik)

Di halaman **Masuk**, tekan **"Masuk sebagai Akun Demo"** → masuk sebagai
*Budi Santoso  Warung Gado-Gado Barokah*, sudah berisi 7 contoh transaksi,
progres legalitas, dan skor kesiapan. Cocok untuk presentasi.

---

## 2. Struktur Folder

```
umkmku/
├── index.html          Beranda (hero, pemilih kebutuhan, statistik)
├── panduan.html        Panduan Usaha  4 langkah awal
├── catat.html          Catat Uang (BUTUH LOGIN)  tambah/hapus/ringkasan/CSV
├── layanan.html        Urus Izin  checklist NIB, Halal, PIRT, Merek
├── cek.html            Cek Kesiapan  kuis 5 pertanyaan + gauge skor
├── belajar.html        Belajar  materi bertingkat (Dasar/Menengah/Siap UMKM) + video YouTube
├── berita.html         Berita  kurasi berita resmi oss.go.id dengan tautan langsung
├── masuk.html          Masuk/Daftar dummy (nama + no HP) + akun demo
├── bantuan.html        FAQ
│
├── css/
│   └── style.css       Semua gaya bersama (palet plum–gold ala UniSQ)
├── js/
│   └── app.js          Header/footer/navigasi/animasi bersama  App.boot()
├── backend/            ★ BACKEND DUMMY ★
│   ├── db.js           "Database": adapter penyimpanan per-akun (localStorage)
│   ├── seed.js         Data awal: akun demo + katalog materi
│   ├── auth.js         Sesi login/logout/penjaga halaman (Auth.guard)
│   └── api.js          "REST API" tiruan dengan jeda jaringan simulasi
└── assets/img/         Ilustrasi WebP (hero, catat, legal)
```

---

## 3. Arsitektur Backend Dummy

Halaman **tidak pernah** menyentuh `localStorage` langsung. Semua data mengalir
lewat lapisan yang meniru backend sungguhan:

```
Halaman (catat.html, layanan.html, ...)
        │  hanya memanggil Api.*
        ▼
backend/api.js        REST-like: Api.transaksi.add(), Api.legalitas.toggle(),
        │             Api.kesiapan.save(), Api.materi.list()  semua async (Promise)
        ▼
backend/db.js         "tabel" per akun: read/insert/update/remove + nilai tunggal
        ▼
localStorage          penyimpanan hari ini (mudah diganti fetch() ke server)
```

- **Multi-akun:** data diberi prefix per ID pengguna (`umkmku_v1_<userId>_...`),
  sehingga akun berbeda punya catatan yang terpisah.
- **Auth.guard()** di `catat.html` mengalihkan ke `masuk.html?lanjut=catat.html`
  bila belum masuk  pola yang sama seperti proteksi rute di backend asli.
- **Seed** hanya berjalan sekali (flag `umkmku_v1_seeded`).

### Migrasi ke backend sungguhan (nanti)

Ganti isi fungsi di `backend/api.js` menjadi `fetch()` ke server/Supabase/Firebase 
**tidak ada satu pun halaman yang perlu diubah.** Contoh:

```js
// sekarang (dummy)
list() { return respond(DB.read("transaksi")); }

// nanti (sungguhan)
list() { return fetch("/api/transaksi", { headers: { Authorization: token } })
          .then(r => r.json()); }
```

Untuk login sungguhan: ganti `Auth.masuk()` dengan verifikasi OTP WhatsApp + token JWT.

---

## 4. Yang Sudah Berfungsi Penuh

| Fitur | Halaman | Backend dummy yang dipakai |
|---|---|---|
| Tambah/hapus catatan, ringkasan untung | `catat.html` | `Api.transaksi` |
| Unduh catatan sebagai CSV | `catat.html` | `Api.transaksi.list` |
| Checklist legalitas + progress bar | `layanan.html` | `Api.legalitas` |
| Kuis kesiapan + riwayat skor | `cek.html` | `Api.kesiapan` |
| Katalog materi 3 tingkat + halaman baca | `belajar.html` | `Api.materi` (dari seed) |
| Video YouTube terputar in-site + poin kunci | `belajar.html?id=video-...` | `Api.materi` |
| Berita resmi OSS dengan tautan langsung | `berita.html` + beranda | `Api.berita` |
| Masuk/keluar, akun demo, sapaan personal | semua | `Auth` + `Api.profil` |

## 5. Batasan Versi Dummy (jujur)

- Data tersimpan **di browser perangkat itu saja**  pindah HP/browser berarti mulai kosong.
- Login tanpa kata sandi hanya untuk demo; **belum aman** untuk produksi.
- Konten materi & syarat legalitas adalah ringkasan edukatif  selalu rujuk situs resmi.

© 2026 UMKM KU  prototipe untuk pelaku UMKM Indonesia. Bukan situs pemerintah.
