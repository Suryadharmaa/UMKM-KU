/* ============================================================
   UMKM KU  Dummy Backend: seed.js
   Data awal (seed) seperti pada backend sungguhan:
   - 1 akun demo lengkap dengan transaksi & progres
   - Katalog materi Belajar: ARTIKEL tulisan + VIDEO YouTube,
     bertingkat: Dasar → Menengah → Siap UMKM
   - Berita resmi OSS (kurasi, dengan tautan langsung ke artikel)
   Dijalankan sekali saja (ditandai di localStorage).
   ============================================================ */
window.Seed = (function () {
  "use strict";

  const DEMO_USER = {
    id: "demo",
    nama: "Budi Santoso",
    hp: "081234567890",
    usaha: "Warung Gado-Gado Barokah",
    createdAt: "2026-08-01T08:00:00.000Z"
  };

  function daysAgo(d, h, m) {
    const t = new Date();
    t.setDate(t.getDate() - d);
    t.setHours(h || 9, m || 0, 0, 0);
    return t.toISOString();
  }

  const DEMO_TRANSAKSI = [
    { jenis: "masuk",  jumlah: 185000, catatan: "Penjualan gado-gado pagi",        at: daysAgo(2, 9, 12) },
    { jenis: "keluar", jumlah: 95000,  catatan: "Belanja sayur & bumbu dapur",    at: daysAgo(2, 6, 30) },
    { jenis: "masuk",  jumlah: 240000, catatan: "Penjualan siang + pesanan kantor", at: daysAgo(2, 13, 40) },
    { jenis: "keluar", jumlah: 25000,  catatan: "Gas LPG 3 kg",                  at: daysAgo(1, 8, 5) },
    { jenis: "masuk",  jumlah: 160000, catatan: "Penjualan pagi",                at: daysAgo(1, 11, 20) },
    { jenis: "keluar", jumlah: 60000,  catatan: "Minyak goreng & tepung",        at: daysAgo(0, 7, 15) },
    { jenis: "masuk",  jumlah: 210000, catatan: "Penjualan hari ini",            at: daysAgo(0, 12, 2) }
  ];

  /* ============================================================
     BERITA  dikurasi dari oss.go.id/id/berita (Kementerian
     Investasi/BKPM). Setiap judul membuka langsung artikelnya.
     ============================================================ */
  const BERITA = [
    {
      judul: "Memahami Transisi KBLI 2025 dalam Ekosistem Perizinan Berusaha",
      tanggal: "24 Juni 2026",
      ringkas: "BKPM menyampaikan proses transisi KBLI 2025 dan dampaknya pada pengajuan perizinan berusaha  penting saat memilih kode bidang usaha untuk NIB Anda.",
      url: "https://oss.go.id/id/berita/memahami-transisi-kbli-2025-dalam-ekosistem-perizinan-berusaha"
    },
    {
      judul: "Partisipasi Perempuan dalam Perizinan Usaha Terus Menguat",
      tanggal: "1 Desember 2025",
      ringkas: "Data penerbitan NIB periode 2021–2025 menunjukkan makin banyak perempuan meresmikan usahanya  tren positif bagi ekosistem UMKM Indonesia.",
      url: "https://oss.go.id/id/berita/partisipasi-perempuan-dalam-perizinan-usaha-terus-menguat"
    },
    {
      judul: "Maklumat Pelayanan: Komitmen Deputi TI Penanaman Modal Tingkatkan Layanan Publik",
      tanggal: "9 September 2025",
      ringkas: "Komitmen resmi peningkatan layanan OSS: kanal bantuan WhatsApp, email, tatap muka, dan panggilan video untuk pelaku usaha.",
      url: "https://oss.go.id/id/berita/maklumat-pelayanan%3A-komitmen-deputi-bidang-teknologi-informasi-penanaman-modal-untuk-tingkatkan-layanan-publik"
    },
    {
      judul: "Kejar Pertumbuhan Tinggi, Rosan Optimis Kontribusi Investasi Lebih Besar",
      tanggal: "28 Agustus 2024",
      ringkas: "Kementerian Investasi menargetkan kontribusi investasi yang lebih besar  iklim usaha yang membaik berarti peluang bagi UMKM.",
      url: "https://oss.go.id/id/berita/kejar-pertumbuhan-tinggi-rosan-optimis-kontribusi-investasi-lebih-besar"
    },
    {
      judul: "Peralihan Penyelenggaraan Perizinan Berusaha Menjadi Perizinan Berusaha Berbasis Risiko melalui Sistem OSS",
      tanggal: "2 Juni 2021",
      ringkas: "Berita fondasi sistem OSS RBA: perizinan kini dikelompokkan berdasarkan tingkat risiko usaha  dasar dari cara kerja NIB hari ini.",
      url: "https://oss.go.id/id/berita/peralihan-penyelenggaraan-perizinan-berusaha-menjadi-penyelenggaraan-perizinan-berusaha-berbasis-risiko-melalui-sistem-oss"
    },
    {
      judul: "Kewajiban Penyampaian Laporan Kegiatan Penanaman Modal (LKPM) Periode Triwulan I Tahun 2021",
      tanggal: "2 Juni 2021",
      ringkas: "Pengingat kewajiban lapor berkala bagi pelaku usaha  kenali kewajiban LKPM sejak dini agar tidak kena sanksi administratif.",
      url: "https://oss.go.id/id/berita/kewajiban-penyampaian-laporan-kegiatan-penanaman-modal-%28lkpm%29-periode-triwulan-i-tahun-2021"
    }
  ];

  /* ============================================================
     MATERI BELAJAR
     jenis:  "artikel" (isi: paragraf) | "video" (youtube: ID, poin: [])
     tingkat: "Dasar" | "Menengah" | "Siap UMKM"
     ============================================================ */
  const MATERI = [

    /* ================= DASAR ================= */
    {
      id: "validasi-ide", jenis: "artikel", tingkat: "Dasar", kategori: "Memulai",
      judul: "Validasi Ide Usaha: dari Kebutuhan Tetangga ke Penjualan Pertama",
      ringkas: "Cara memastikan ide usaha Anda benar-benar dibutuhkan  sebelum uang keluar banyak.",
      menit: 7,
      isi: [
        "Ide usaha yang kuat jarang lahir dari ruangan; ia lahir dari keluhan sehari-hari. Prinsip dasarnya: jual solusi untuk masalah yang nyata, bukan produk yang hanya Anda anggap keren. Warung kopi laku karena orang lewat butuh kopi  bukan karena logonya bagus.",
        "Langkah 1  Amati sekitar Anda selama seminggu. Apa yang sering dikeluhkan tetangga? Antrean apa yang panjang di daerah Anda? Barang apa yang harus dibeli jauh ke kota? Catat minimal 5 'masalah'  salah satunya bisa jadi usaha Anda.",
        "Langkah 2  Uji dengan 5 percakapan. Tanya calon pembeli: 'Terakhir kali kapan Anda butuh X? Berapa biasanya Anda bayar? Apa yang paling menyebalkan dari pilihan yang ada sekarang?' Jawaban mereka adalah riset pasar gratis yang paling jujur.",
        "Langkah 3  Jual dulu, produksi belakangan. Tawarkan lewat status WhatsApp atau foto katalog sederhana sebelum membeli peralatan. Lima pesanan nyata jauh lebih berharga daripada seratus komentar 'wah bagus idenya'. Ini disebut validasi  bukti bahwa orang mau membayar.",
        "Langkah 4  Ukur hasilnya. Jika dari 10 orang yang ditawari minimal 3 membeli, ide Anda layak lanjut. Jika kurang, ubah produk, harga, atau cara menawarkannya  itu normal dan bukan berarti gagal total. Yang gagal adalah yang tidak pernah menguji sama sekali."
      ]
    },
    {
      id: "modal-awal", jenis: "artikel", tingkat: "Dasar", kategori: "Keuangan",
      judul: "Menyiapkan Modal Awal & Memilih Bentuk Usaha yang Tepat",
      ringkas: "Modal tetap vs modal kerja, contoh hitungan nyata, dan kapan perlu badan usaha.",
      menit: 8,
      isi: [
        "Pahami dua jenis modal. Modal tetap: peralatan, gerobak, etalase  dibeli sekali, dipakai lama. Modal kerja: bahan, gas, kemasan  habis setiap minggu dan harus diisi ulang. Kesalahan paling umum pemula: menghabiskan semua uang untuk peralatan bagus, lalu tidak punya sisa untuk belanja bahan.",
        "Contoh nyata warung makan sederhana: gerobak + alat masak Rp2.500.000 (modal tetap), bahan 2 minggu Rp1.400.000, cadangan darurat Rp600.000  total Rp4.500.000. Aturan amannya: selalu sisakan cadangan minimal satu kali belanja bahan.",
        "Urutan sumber modal yang paling sehat: (1) tabungan sendiri, (2) menjual aset yang tidak terpakai, (3) patungan keluarga dengan perjanjian tertulis sederhana, (4) pinjaman produktif seperti KUR  tetapi ini HANYA setelah usaha berjalan dan punya catatan. Berutang untuk ide yang belum teruji adalah cara tercepat terjebak cicilan.",
        "Soal bentuk usaha: mulai saja sebagai usaha perseorangan  gratis dan langsung jalan, cukup dengan NIB. Pertimbangkan PT Perorangan saat omzet sudah besar atau Anda butuh kontrak formal dengan perusahaan. CV cocok bila ada partner yang patungan modal dan kerja.",
        "Aturan emas hari pertama: pisahkan uang usaha dari uang pribadi, dan catat modal yang Anda masukkan sebagai 'setoran modal'  bukan penjualan. Dua kebiasaan kecil ini membuat kondisi usaha Anda selalu terbaca jelas."
      ]
    },
    {
      id: "harga-jual", jenis: "artikel", tingkat: "Dasar", kategori: "Keuangan",
      judul: "Menentukan Harga Jual Tanpa Rugi: HPP, Margin, dan Titik Impas",
      ringkas: "Hitung semua modal dulu, baru tentukan untung  lengkap dengan contoh angka.",
      menit: 8,
      isi: [
        "Banyak usaha kecil rugi bukan karena sepi, tetapi karena harga jualnya salah. Rumus dasar: Harga Jual = HPP per porsi ÷ (1 − margin target). HPP (Harga Pokok Penjualan) adalah semua biaya yang menempel langsung pada produk.",
        "Contoh nyata semangkuk gado-gado: bahan Rp6.500 + kemasan Rp1.000 + gas & listrik Rp500 + transport belanja Rp300 = HPP Rp8.300 per porsi. Dengan margin target 40%: harga = 8.300 ÷ 0,6 ≈ Rp13.800 → bulatkan Rp14.000. Jangan jual Rp10.000 hanya karena 'kasihan'  itu di bawah biaya sesungguhnya.",
        "Jangan lupakan biaya tersembunyi: gaji untuk diri sendiri, penyusutan alat (gerobak Rp2,5 juta dipakai 2 tahun ≈ Rp3.500/hari), dan bahan yang terbuang. Biaya yang tidak dihitung tetap menggerus untung  diam-diam.",
        "Kenali titik impas (BEP): biaya tetap bulanan ÷ untung per porsi. Contoh: biaya tetap Rp900.000/bulan, untung Rp5.000 per porsi → Anda harus menjual 180 porsi per bulan (≈6 porsi/hari) hanya untuk impas. Angka ini menentukan apakah lokasi dan jam jualan Anda masuk akal.",
        "Men naikkan harga tanpa kehilangan pembeli: naikkan bertahap 5–10%, perkuat nilai yang terasa (porsi konsisten, kebersihan, keramahan), dan sediakan opsi paket. Pembeli memaafkan harga naik; mereka tidak memaafkan kualitas turun."
      ]
    },
    {
      id: "apa-itu-nib", jenis: "artikel", tingkat: "Dasar", kategori: "Legalitas",
      judul: "Apa itu NIB dan Kenapa Penting?",
      ringkas: "\"KTP\" untuk usaha Anda  gratis, online, dan jadi syarat hampir semua bantuan.",
      menit: 5,
      isi: [
        "NIB (Nomor Induk Berusaha) adalah nomor identitas resmi untuk usaha Anda, diterbitkan lewat sistem OSS (oss.go.id). Anggap seperti KTP: tanpa NIB, usaha Anda belum 'tercatat' oleh negara.",
        "Kenapa penting? Hampir semua program bantuan pemerintah, pelatihan resmi, pinjaman KUR, pendaftaran sertifikasi halal, bahkan pembukaan toko di marketplace besar mensyaratkan NIB. Mengurusnya gratis dan bisa selesai dalam satu hari lewat HP.",
        "Siapkan KTP (NIK), KK, alamat email, dan nomor HP aktif. Buka oss.go.id → Daftar → pilih skala UMK → perseorangan → verifikasi email → isi profil usaha dan pilih kode KBLI (jenis usaha) yang paling sesuai. Pilihan KBLI menentukan tingkat risiko usaha Anda  usaha kecil berisiko rendah umumnya cukup dengan NIB saja.",
        "Setelah NIB terbit, simpan dokumennya baik-baik (unduh PDF-nya), lalu centang NIB di halaman Urus Izin. Jika usaha Anda makanan/minuman kemasan, lanjutkan ke PIRT dan sertifikasi halal  baca Peta Legalitas Lengkap di tingkat Menengah."
      ]
    },
    {
      id: "foto-produk-hp", jenis: "artikel", tingkat: "Dasar", kategori: "Pemasaran",
      judul: "Foto Produk Menarik Cukup dengan HP",
      ringkas: "Cahaya pagi, latar bersih, dan satu properti pendukung. Itu saja resepnya.",
      menit: 5,
      isi: [
        "Foto yang bagus bukan soal kamera mahal, melainkan cahaya dan kerapian. Cahaya terbaik adalah cahaya matahari pagi (sekitar pukul 7–9) dari arah samping produk. Hindari lampu kuning dari atas karena membuat warna makanan berubah.",
        "Gunakan latar yang bersih: meja kayu, kain polos, atau kertas nasi yang rapi. Satu properti pendukung sudah cukup  misalnya gelas teh di samping piring. Terlalu banyak benda justru membuat produk utama tidak menonjol.",
        "Ambil foto dari sudut 45 derajat untuk makanan, atau dari atas (flat lay) untuk produk kemasan. Sentuh layar HP pada produk agar fokus tajam, lalu geser kecerahan sedikit ke atas. Selesai  tidak perlu aplikasi edit yang rumit."
      ]
    },
    {
      id: "jualan-whatsapp", jenis: "artikel", tingkat: "Dasar", kategori: "Pemasaran",
      judul: "Jualan Lewat WhatsApp & Status",
      ringkas: "Katalog WA Business, broadcast yang sopan, dan cara membalas chat calon pembeli.",
      menit: 7,
      isi: [
        "Mulai dari WhatsApp Business (gratis). Isi profil usaha: nama, jam buka, alamat, dan tautan. Lalu masukkan produk ke fitur Katalog  cukup foto, nama, dan harga. Pembeli bisa melihat semua produk tanpa bertanya satu per satu.",
        "Manfaatkan Status WA seperti etalase harian: 1–3 status per hari sudah cukup. Pagi hari tampilkan menu, siang hari tampilkan testimoni atau stok yang menipis. Jangan mengirim broadcast promosi setiap hari  sekali seminggu dengan isi yang berguna lebih dihargai.",
        "Saat calon pembeli chat, balas cepat dan ramah. Siapkan jawaban siap pakai (fitur 'Pesan Cepat') untuk pertanyaan yang sering muncul: harga, ongkir, dan cara pesan. Pembeli yang dibalas cepat jauh lebih mungkin jadi membeli."
      ]
    },
    {
      id: "video-nib", jenis: "video", tingkat: "Dasar", kategori: "Legalitas",
      judul: "Cara Daftar NIB di OSS Lewat HP (Video)",
      ringkas: "Panduan video langkah demi langkah mendaftar NIB langsung dari ponsel.",
      menit: 10, youtube: "1cO-8BKMC3M", kanal: "DesaPreneur",
      poin: [
        "Siapkan NIK (KTP), alamat email, dan nomor HP aktif sebelum mulai",
        "Pilih skala usaha UMK dan jenis pelaku usaha perseorangan",
        "Isi data usaha & kode KBLI dengan benar  NIB terbit setelah verifikasi"
      ]
    },

    /* ================= MENENGAH ================= */
    {
      id: "pisahkan-uang", jenis: "artikel", tingkat: "Menengah", kategori: "Keuangan",
      judul: "Pisahkan Uang Usaha & Uang Pribadi",
      ringkas: "Kebiasaan kecil yang membuat untung Anda benar-benar terlihat.",
      menit: 4,
      isi: [
        "Kesalahan paling umum pelaku usaha kecil: uang hasil jualan langsung bercampur dengan uang belanja dapur. Akibatnya untung tidak pernah terlihat dan modal diam-diam tergerus.",
        "Solusinya sederhana: sediakan satu wadah khusus uang usaha  bisa dompet terpisah, amplop, atau rekening/e-wallet kedua. Semua pemasukan usaha masuk ke situ, semua biaya usaha keluar dari situ.",
        "Tentukan 'gaji' untuk diri sendiri, misalnya Rp50.000 per hari, dan pindahkan secara rutin. Sisa uang di wadah usaha adalah milik usaha: untuk belanja bahan, cadangan, dan pengembangan. Catat semuanya di fitur Catat Uang agar makin rapi."
      ]
    },
    {
      id: "pembukuan-sederhana", jenis: "artikel", tingkat: "Menengah", kategori: "Keuangan",
      judul: "Pembukuan Sederhana yang Benar: Kas Masuk, Kas Keluar, dan Laba",
      ringkas: "Metode kas harian yang 15 menit seminggu  cukup untuk tahu untung atau rugi.",
      menit: 9,
      isi: [
        "Tanpa catatan, untung hanyalah perasaan. Pembukuan menjawab tiga hal penting: usaha Anda untung atau rugi, uang kas tersisa berapa, dan siapa yang masih berutang. Kabar baiknya: untuk usaha kecil, metode kas sudah cukup  catat setiap kali uang bergerak.",
        "Bentuk paling sederhana adalah buku kas harian dengan lima kolom: tanggal | keterangan | uang masuk | uang keluar | saldo. Contoh: modal awal Rp500.000 → belanja bahan Rp450.000 (saldo Rp50.000) → penjualan hari itu Rp970.000 (saldo Rp1.020.000). Setiap gerak uang langsung dicatat, jangan menunda.",
        "Bangun ritual 15 menit setiap minggu: cocokkan saldo di catatan dengan uang fisik dan saldo rekening Anda. Jika ada selisih, berarti ada transaksi yang lupa dicatat  cari sampai ketemu. Selisih yang dibiarkan akan membesar dan membuat laporan tidak bisa dipercaya.",
        "Di akhir bulan, buat laporan laba sederhana: total penjualan − total pembelian bahan − biaya operasional (gas, listrik, transport, gaji) = laba bersih. Bandingkan antar bulan. Usaha yang penjualannya naik tapi labanya turun sedang bocor di biaya  dan Anda hanya bisa melihatnya lewat catatan.",
        "Kesalahan yang paling sering terjadi: mencatat 'nanti' lalu lupa; mencampur uang pribadi; menganggap pengeluaran kecil tidak penting (parkir Rp2.000 × 30 hari = Rp60.000); dan tidak memisahkan kasbon pelanggan dari kas tunai.",
        "Naik level: setelah rutin tiga bulan, pindahkan catatan ke aplikasi  fitur Catat Uang di situs ini sudah cukup untuk memulai, dan datanya bisa diunduh sebagai CSV untuk dibuka di Excel. Catatan rapi 3 bulan adalah bukti kuat saat mengajukan KUR."
      ]
    },
    {
      id: "administrasi-usaha", jenis: "artikel", tingkat: "Menengah", kategori: "Operasional",
      judul: "Administrasi Usaha Kecil: Stok, Kasbon Pelanggan, dan Arsip Dokumen",
      ringkas: "Membuat usaha 'terbaca'  stok tidak bocor, utang tidak hilang, dokumen tidak hilang.",
      menit: 8,
      isi: [
        "Administrasi bukan birokrasi  administrasi membuat usaha Anda 'terbaca'. Tiga hal yang paling dulu berantakan di usaha kecil: stok bahan, utang-piutang, dan dokumen penting. Ketiganya punya solusi sederhana.",
        "Stok: buat kartu stok untuk 3–5 bahan paling penting (beras, minyak, tepung, gas). Kolomnya cukup: tanggal | masuk | keluar | sisa. Tentukan stok minimum per bahan  saat sisa menyentuh angka itu, bahan otomatis masuk daftar belanja. Hitung stok fisik seminggu sekali; selisih dengan catatan berarti ada kebocoran yang perlu dicari.",
        "Kasbon pelanggan: boleh saja, tetapi berbahaya bila tidak dicatat. Aturannya: buku kasbon terpisah dari buku kas; batas maksimal per orang; jadwal menagih yang sopan lewat pesan WA yang disiapkan; dan total kasbon beredar jangan melebihi sepertiga modal kerja Anda. Kasbon adalah uang Anda yang sedang 'dititipkan'  perlakukan sebagai piutang, bukan penjualan.",
        "Arsip dokumen: siapkan satu map fisik dan satu folder khusus di HP. Isinya: KTP, KK, NIB, PIRT/halal (bila ada), kontrak sewa tempat, dan nota-nota pembelian besar. Foto setiap nota sebelum hilang atau pudar  saat mengajukan modal atau mengurus izin, Anda akan sangat berterima kasih pada diri sendiri.",
        "Satukan semuanya dalam rutinitas admin 30 menit per minggu: rekap kas, cek stok minimum, tagih kasbon yang jatuh tempo, arsipkan nota. Administrasi yang ringan tetapi konsisten mengalahkan sistem canggih yang tidak pernah dibuka."
      ]
    },
    {
      id: "legalitas-lengkap", jenis: "artikel", tingkat: "Menengah", kategori: "Legalitas",
      judul: "Peta Legalitas Lengkap UMKM: NIB, PIRT, Halal, BPOM, dan Merek",
      ringkas: "Urutan yang benar, syarat per dokumen, dan jalur gratis yang jarang diketahui orang.",
      menit: 10,
      isi: [
        "Urutan yang benar mengurus legalitas: (1) NIB sebagai identitas usaha, (2) izin produk sesuai jenis usaha  PIRT untuk makanan rumahan, Halal untuk F&B, BPOM untuk produk kemasan skala lebih besar, (3) Merek saat nama usaha mulai dikenal orang. Jangan terbalik  Merek tanpa NIB ibarat pagar tanpa rumah.",
        "NIB  gratis di oss.go.id. Siapkan KTP (NIK), email, dan HP aktif. Pilih skala UMK → perseorangan → verifikasi email → isi profil → pilih kode KBLI yang tepat. KBLI menentukan tingkat risiko: usaha risiko rendah cukup berbekal NIB; risiko menengah rendah menambah pernyataan mandiri; risiko lebih tinggi perlu verifikasi atau izin tambahan.",
        "PIRT  untuk makanan/minuman olahan kemasan buatan rumah. Diurus di Dinas Kesehatan kabupaten/kota (banyak daerah sudah online lewat e-pirt.kemkes.go.id). Syarat umum: fotokopi KTP, pas foto 3×4, surat domisili usaha, denah lokasi produksi, surat keterangan pemeriksaan dari Puskesmas/dokter, dan data produk. Anda akan mengikuti penyuluhan keamanan pangan singkat sebelum sertifikat terbit.",
        "Sertifikasi Halal  wajib bertahap untuk produk F&B, dan kabar baiknya: pelaku usaha mikro-kecil bisa GRATIS lewat program SEHATI (jalur self-declare) di aplikasi SIHALAL (bpjph.halal.go.id). Syaratnya: punya NIB, bahan yang dipakai jelas kehalalannya, dan didampingi Pendamping P3H. Per 2026, bahkan usaha warung makan (warteg dan sejenisnya) masuk kategori gratis berdasarkan Kepka BPJPH No. 146/2025.",
        "BPOM (MD)  untuk produk kemasan yang diproduksi lebih besar dan tahan lama, atau yang akan masuk ritel modern. Butuh sarana produksi yang memenuhi standar dan prosesnya lebih ketat. Naik ke level ini saat produksi sudah stabil  jangan di awal.",
        "Merek Dagang  di dgip.go.id (DJKI Kemenkumham). Melindungi nama dan logo usaha agar tidak dipakai pihak lain. Untuk UMK biayanya sekitar Rp500.000 per kelas (kelas 30 untuk makanan, kelas 43 untuk warung/kafe, kelas 35 untuk jasa penjualan). Cek dulu ketersediaan nama di situs DJKI sebelum mendaftar. Setelah semua siap, centang progresnya di halaman Urus Izin."
      ]
    },
    {
      id: "video-pembukuan", jenis: "video", tingkat: "Menengah", kategori: "Keuangan",
      judul: "Tutorial Pembukuan Sederhana bagi Pelaku UMKM (Video)",
      ringkas: "Video tutorial: buku kas, contoh pencatatan, sampai laporan laba rugi harian.",
      menit: 12, youtube: "CKbWkDa_LzY", kanal: "YouTube",
      poin: [
        "Manfaat pembukuan: memisahkan uang usaha vs pribadi dan mengetahui laba-rugi",
        "Empat langkah: analisis transaksi → jurnal umum → buku besar → laporan keuangan",
        "Contoh nyata pencatatan saldo dan laporan laba rugi harian yang bisa ditiru"
      ]
    },
    {
      id: "video-digital-marketing", jenis: "video", tingkat: "Menengah", kategori: "Pemasaran",
      judul: "Cara Jitu Mulai Digital Marketing untuk Bisnis/UMKM (Video)",
      ringkas: "Panduan video memulai pemasaran digital dari nol, tanpa modal besar.",
      menit: 15, youtube: "ztYpiXJFFbI", kanal: "YouTube",
      poin: [
        "Mulai dari satu kanal yang paling dekat dengan pembeli Anda",
        "Konten yang menjual: tunjukkan produk, proses, dan testimoni",
        "Konsistensi mengalahkan viral  jadwal sederhana yang bisa Anda jaga"
      ]
    },

    /* ================= SIAP UMKM ================= */
    {
      id: "mengenal-kur", jenis: "artikel", tingkat: "Siap UMKM", kategori: "Modal",
      judul: "Mengenal KUR: Modal Murah untuk Usaha Kecil",
      ringkas: "Bunga 6% flat, syarat nyata 2025–2026, dan cara menyiapkan pengajuan yang lolos.",
      menit: 7,
      isi: [
        "KUR (Kredit Usaha Rakyat) adalah pinjaman modal usaha dengan bunga yang disubsidi pemerintah, disalurkan lewat bank seperti BRI, BNI, Mandiri, BCA, BTN, dan BPD. Sejak Permenko 15/2020, bunganya flat 6% efektif per tahun untuk semua jenis KUR  jauh lebih murah dari pinjaman biasa.",
        "Tiga jenjang plafon: KUR Super Mikro sampai Rp10 juta; KUR Mikro Rp10–100 juta; KUR Kecil Rp100–500 juta. Kabar penting: pengajuan sampai Rp100 juta tidak memerlukan agunan tambahan. KUR Kecil mensyaratkan agunan tambahan dan kepesertaan BPJS Ketenagakerjaan.",
        "Syarat umumnya: usaha produktif yang sudah berjalan minimal 6 bulan, memiliki NIB atau Surat Keterangan Usaha, e-KTP, KK, dan NPWP untuk pengajuan di atas Rp50 juta, serta tidak sedang menerima kredit produktif lain (KPR/KKB/kartu kredit konsumtif dikecualikan).",
        "Cara mengajukan: datang ke kantor cabang bank penyalur terdekat, atau online  misalnya lewat kur.bri.co.id. Siapkan catatan penjualan 3 bulan terakhir. Di sinilah kebiasaan mencatat uang terbayar: pembukuan rapi adalah 'rapor' yang membuat bank percaya.",
        "Tips agar lolos dan aman: ajukan sesuai kebutuhan arus kas (bukan sebesar yang ditawarkan), pastikan cicilan tidak melebihi sepertiga laba bulanan, dan tolak keras siapa pun yang meminta 'uang pelicin'  pengajuan KUR resmi tidak dipungut biaya calo."
      ]
    },
    {
      id: "ekspansi-online", jenis: "artikel", tingkat: "Siap UMKM", kategori: "Pemasaran",
      judul: "Naik Kelas Penjualan: Marketplace, Pengiriman, dan Iklan Sederhana",
      ringkas: "Kapan siap jualan online, pilih kanal yang benar, dan iklan yang tidak boncos.",
      menit: 9,
      isi: [
        "Jangan jualan online lebih cepat dari kesiapan Anda. Tanda siap: produk dan rasa sudah stabil, harga sudah dihitung dengan HPP + margin, foto produk sudah layak (baca materi Foto Produk), dan kapasitas produksi sanggup naik dua kali lipat saat pesanan membludak.",
        "Pilih kanal sesuai tenaga. Marketplace (Shopee, Tokopedia): siapkan NIB, rekening, dan katalog; pahami bahwa ada komisi/biaya admin per transaksi, jadi masukkan ke harga. WhatsApp Business + status: paling ringan untuk pembeli tetangga. Layanan pesan-antar makanan (GoFood/GrabFood): komisinya lebih tinggi  buat harga khusus delivery agar tidak rugi.",
        "Rapikan operasional sebelum ramai: tentukan jam layanan chat, siapkan template balasan, sediakan packing yang aman (bubble wrap untuk yang rawan), pilih ekspedisi andal, dan tetapkan jam cut-off pengiriman harian. Pembeli online memaafkan harga; mereka tidak memaafkan paket rusak dan balasan dua hari.",
        "Iklan sederhana yang tidak boncos: mulai Rp20–30 ribu per hari di SATU kanal, lalu ukur satu angka saja  biaya iklan per pesanan. Jika lebih kecil dari untung per pesanan, lanjutkan dan naikkan pelan-pelan. Jika lebih besar, matikan dan perbaiki foto/harga dulu. Jangan pernah beriklan untuk menutupi produk yang belum siap.",
        "Terakhir, jaga reputasi seperti menjaga etalase: kirim tepat waktu, balas ulasan negatif dengan sopan dan cepat, dan minta pembeli puas meninggalkan ulasan. Rating adalah promosi termurah yang pernah ada."
      ]
    },
    {
      id: "siap-berkembang", jenis: "artikel", tingkat: "Siap UMKM", kategori: "Operasional",
      judul: "Checklist Siap Berkembang: Karyawan Pertama, SOP, Pajak, dan Jejak Ekspor",
      ringkas: "Apa yang harus beres ketika semua fondasi sudah jalan  sebelum tumbuh lebih besar.",
      menit: 10,
      isi: [
        "Kapan usaha benar-benar siap berkembang? Tiga tandanya: permintaan rutin melebihi kapasitas Anda, catatan menunjukkan untung positif 3–6 bulan berturut-turut, dan cara kerja Anda sudah bisa dituliskan untuk diikuti orang lain. Kalau tiga-tiganya terpenuhi, materi ini untuk Anda.",
        "Karyawan pertama: mulai dari paruh waktu. Tulis daftar tugas hariannya dengan jelas, gaji sesuai ketentuan upah minimum setempat, dan daftarkan BPJS Ketenagakerjaan bila statusnya tetap. Satu aturan emas: pisahkan wewenang uang  yang memegang kas jangan sekaligus yang mencatat.",
        "SOP tertulis: dokumentasikan resep/standar produk, alur buka–tutup toko, dan cara menangani komplain. SOP membuat kualitas tidak tergantung pada siapa yang bertugas  dan menjadi modal saat Anda ingin menambah cabang atau bermitra.",
        "Pajak UMKM jangan ditakuti, pahami saja: untuk wajib pajak orang pribadi, omzet sampai Rp500 juta setahun dikenakan tarif 0%; di atas itu berlaku PPh final 0,5% dari omzet (PP 55/2022). Urus NPWP gratis secara online, lalu laporkan lewat DJP Online setahun sekali. Taat pajak membuat usaha Anda bersih di mata bank.",
        "Jejak ekspor untuk yang penasaran: mulai dari permintaan diaspora lewat marketplace atau kurir internasional. Produk pangan olahan perlu memperhatikan aturan keamanan pangan negara tujuan. Manfaatkan pelatihan ekspor gratis dari pemerintah (Kemenkop UKM, Bea Cukai) sebelum mengirim apa pun.",
        "Tutup dengan ritual berkembang: rapat kecil 30 menit setiap bulan  lihat tren penjualan, tren biaya, dan pilih SATU perbaikan untuk dieksekusi bulan itu. Usaha yang tumbuh sehat adalah yang berkembang satu langkah sadar setiap bulannya."
      ]
    },
    {
      id: "video-kur", jenis: "video", tingkat: "Siap UMKM", kategori: "Modal",
      judul: "Cara dan Syarat Ajukan KUR BRI 2025 (Video)",
      ringkas: "Video praktik: dokumen, alur pengajuan, sampai simulasi angsuran KUR.",
      menit: 12, youtube: "h9sGpzILcCg", kanal: "YouTube",
      poin: [
        "Dokumen yang disiapkan: e-KTP, KK, NIB/SKU, NPWP (pengajuan besar)",
        "Alur pengajuan KUR BRI dari formulir sampai verifikasi usaha",
        "Hitung kemampuan cicilan dari laba bulanan sebelum mengajukan"
      ]
    }
  ];

  /* Buat akun demo + isi datanya. Idempoten: hanya jalan sekali. */
  function ensure() {
    if (localStorage.getItem("umkmku_v1_seeded")) return;

    localStorage.setItem("umkmku_v1_users", JSON.stringify([DEMO_USER]));

    DB.setScope(DEMO_USER.id);
    DEMO_TRANSAKSI.forEach(t => DB.insert("transaksi", t));
    DB.set("legalitas", { nib: true, halal: false, pirt: false, merek: false });
    DB.set("kesiapan", { skor: 60, at: daysAgo(1, 20, 30) });
    DB.setScope("guest");

    localStorage.setItem("umkmku_v1_seeded", "1");
  }

  return { ensure, MATERI, BERITA, DEMO_USER };
})();
