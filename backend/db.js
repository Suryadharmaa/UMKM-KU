/* ============================================================
   UMKM KU  Dummy Backend: db.js
   Lapisan penyimpanan data ("database").
   Hari ini: localStorage browser. Nanti: ganti isi fungsi di
   sini dengan fetch() ke server asli  file lain tidak berubah.
   ============================================================ */
window.DB = (function () {
  "use strict";
  const PREFIX = "umkmku_v1_";
  let scope = "guest"; // id pengguna aktif; data tiap akun terpisah

  function setScope(userId) { scope = userId || "guest"; }
  function key(collection) { return PREFIX + scope + "_" + collection; }

  /* ---- Koleksi (tabel) ---- */
  function read(collection) {
    try { return JSON.parse(localStorage.getItem(key(collection))) || []; }
    catch (e) { return []; }
  }
  function write(collection, rows) {
    localStorage.setItem(key(collection), JSON.stringify(rows));
  }
  function insert(collection, row) {
    const rows = read(collection);
    row.id = row.id || ("r" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
    row.createdAt = row.createdAt || new Date().toISOString();
    rows.push(row);
    write(collection, rows);
    return row;
  }
  function update(collection, id, patch) {
    const rows = read(collection);
    const i = rows.findIndex(r => r.id === id);
    if (i >= 0) { rows[i] = Object.assign({}, rows[i], patch); write(collection, rows); return rows[i]; }
    return null;
  }
  function remove(collection, id) {
    write(collection, read(collection).filter(r => r.id !== id));
  }
  function clear(collection) { write(collection, []); }

  /* ---- Nilai tunggal per akun (pengaturan, skor, checklist) ---- */
  function get(name, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(PREFIX + scope + "_meta_" + name));
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function set(name, value) {
    localStorage.setItem(PREFIX + scope + "_meta_" + name, JSON.stringify(value));
  }

  return { setScope, read, write, insert, update, remove, clear, get, set };
})();
