/* ============================================================
   UMKM KU  Dummy Backend: auth.js
   Autentikasi & sesi (versi dummy).
   Sungguhan nanti: verifikasi OTP via SMS/WhatsApp + token JWT.
   Di sini cukup nama + nomor HP  sesi disimpan di localStorage.
   ============================================================ */
window.Auth = (function () {
  "use strict";
  const SES_KEY = "umkmku_v1_session";
  const USERS_KEY = "umkmku_v1_users";

  function users() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveUsers(list) { localStorage.setItem(USERS_KEY, JSON.stringify(list)); }

  function setSession(userId) {
    localStorage.setItem(SES_KEY, userId);
    DB.setScope(userId);
  }

  /* Dipanggil sekali di awal setiap halaman (oleh App.boot). */
  function init() {
    const u = current();
    DB.setScope(u ? u.id : "guest");
    return u;
  }

  function current() {
    const id = localStorage.getItem(SES_KEY);
    if (!id) return null;
    return users().find(u => u.id === id) || null;
  }

  /* Masuk: kalau no HP sudah terdaftar → login; kalau belum → daftar baru. */
  function masuk({ nama, hp, usaha }) {
    nama = (nama || "").trim();
    hp = (hp || "").replace(/[^\d]/g, "");
    if (nama.length < 2) throw new Error("Nama minimal 2 huruf.");
    if (hp.length < 9) throw new Error("Nomor HP tidak valid.");

    let u = users().find(x => x.hp === hp);
    if (!u) {
      u = {
        id: "u" + Date.now().toString(36),
        nama: nama,
        hp: hp,
        usaha: (usaha || "").trim(),
        createdAt: new Date().toISOString()
      };
      const list = users(); list.push(u); saveUsers(list);
    }
    setSession(u.id);
    return u;
  }

  /* Satu klik untuk keperluan demo/presentasi. */
  function masukDemo() {
    const demo = users().find(u => u.id === "demo") || Seed.DEMO_USER;
    setSession(demo.id);
    return demo;
  }

  function keluar() {
    localStorage.removeItem(SES_KEY);
    DB.setScope("guest");
  }

  /* Penjaga halaman: paksa masuk dulu, kembali ke halaman semula. */
  function guard(returnTo) {
    if (current()) return true;
    const lanjut = returnTo ? ("?lanjut=" + encodeURIComponent(returnTo)) : "";
    location.href = "masuk.html" + lanjut;
    return false;
  }

  return { init, current, masuk, masukDemo, keluar, guard };
})();
