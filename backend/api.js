/* ============================================================
   UMKM KU  Dummy Backend: api.js
   "REST API" tiruan dengan jeda jaringan simulasi (~160 ms).
   Semua halaman HANYA berbicara dengan Api  tidak menyentuh
   localStorage langsung. Migrasi ke server asli = ganti isi
   fungsi-fungsi ini menjadi fetch() tanpa mengubah halaman.
   ------------------------------------------------------------
   Contoh migrasi:
     list() { return fetch('/api/transaksi').then(r => r.json()) }
   ============================================================ */
window.Api = (function () {
  "use strict";

  const respond = (value, ms) =>
    new Promise(resolve => setTimeout(() => resolve(value), ms == null ? 160 : ms));

  /* ---------------- Transaksi (Catat Uang) ---------------- */
  const transaksi = {
    list() {
      const rows = DB.read("transaksi").slice()
        .sort((a, b) => (a.at < b.at ? 1 : -1));
      return respond(rows);
    },
    add({ jenis, jumlah, catatan }) {
      jumlah = Number(jumlah);
      if (jenis !== "masuk" && jenis !== "keluar") return Promise.reject(new Error("Jenis tidak dikenal."));
      if (!jumlah || jumlah <= 0) return Promise.reject(new Error("Jumlah harus lebih dari nol."));
      const row = DB.insert("transaksi", {
        jenis, jumlah,
        catatan: (catatan || "").trim().slice(0, 48),
        at: new Date().toISOString()
      });
      return respond(row);
    },
    remove(id) { DB.remove("transaksi", id); return respond(true); },
    clear() { DB.clear("transaksi"); return respond(true); },
    ringkasan() {
      const rows = DB.read("transaksi");
      const masuk = rows.filter(r => r.jenis === "masuk").reduce((s, r) => s + r.jumlah, 0);
      const keluar = rows.filter(r => r.jenis === "keluar").reduce((s, r) => s + r.jumlah, 0);
      return respond({ masuk, keluar, untung: masuk - keluar, jumlahCatatan: rows.length });
    }
  };

  /* ---------------- Legalitas (Urus Izin) ---------------- */
  const LEGAL_DEFAULT = { nib: false, halal: false, pirt: false, merek: false };
  const legalitas = {
    get() { return respond(Object.assign({}, LEGAL_DEFAULT, DB.get("legalitas", {}))); },
    toggle(keyName, value) {
      const cur = Object.assign({}, LEGAL_DEFAULT, DB.get("legalitas", {}));
      cur[keyName] = !!value;
      DB.set("legalitas", cur);
      const done = Object.keys(cur).filter(k => cur[k]).length;
      return respond({ state: cur, persen: Math.round(done / Object.keys(cur).length * 100) });
    }
  };

  /* ---------------- Cek Kesiapan ---------------- */
  const kesiapan = {
    save(skor) {
      const row = { skor: Math.round(skor), at: new Date().toISOString() };
      DB.set("kesiapan", row);
      return respond(row);
    },
    terakhir() { return respond(DB.get("kesiapan", null)); }
  };

  /* ---------------- Materi Belajar ---------------- */
  const materi = {
    list() {
      return respond(Seed.MATERI.map(m => ({
        id: m.id, jenis: m.jenis, tingkat: m.tingkat, kategori: m.kategori,
        judul: m.judul, ringkas: m.ringkas, menit: m.menit, kanal: m.kanal || null
      })));
    },
    byTingkat() {
      const tiers = ["Dasar", "Menengah", "Siap UMKM"];
      const grouped = {};
      tiers.forEach(t => { grouped[t] = []; });
      Seed.MATERI.forEach(m => { if (grouped[m.tingkat]) grouped[m.tingkat].push(m); });
      return respond(grouped);
    },
    get(id) { return respond(Seed.MATERI.find(m => m.id === id) || null); }
  };

  /* ---------------- Berita resmi (kurasi OSS) ---------------- */
  const berita = {
    list() { return respond(Seed.BERITA.slice()); }
  };

  /* ---------------- Profil pengguna ---------------- */
  const profil = {
    get() { return respond(Auth.current()); }
  };

  return { transaksi, legalitas, kesiapan, materi, berita, profil };
})();
