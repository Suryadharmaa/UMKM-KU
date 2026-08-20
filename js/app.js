/* ============================================================
   UMKM KU  js/app.js
   Kerangka UI bersama untuk SEMUA halaman:
   header, navigasi aktif, area akun, footer, animasi reveal.
   Halaman cukup memanggil: App.boot('nama-halaman')
   ============================================================ */
window.App = (function () {
  "use strict";

  const NAV = [
    { id: "panduan", href: "panduan.html", label: "Panduan" },
    { id: "catat",   href: "catat.html",   label: "Catat Uang" },
    { id: "layanan", href: "layanan.html", label: "Urus Izin" },
    { id: "belajar", href: "belajar.html", label: "Belajar" },
    { id: "berita",  href: "berita.html",  label: "Berita" },
    { id: "bantuan", href: "bantuan.html", label: "Bantuan" }
  ];

  const CHIPS = [
    { href: "panduan.html", label: "Panduan Usaha" },
    { href: "catat.html",   label: "Catat Uang" },
    { href: "layanan.html", label: "Urus Izin" },
    { href: "cek.html",     label: "Cek Kesiapan" },
    { href: "belajar.html", label: "Belajar" },
    { href: "berita.html",  label: "Berita" },
    { href: "bantuan.html", label: "Bantuan" }
  ];

  const LOGO_SVG =
    '<svg viewBox="0 0 64 64"><path d="M32 50V34" stroke="#F2A93B" stroke-width="5" stroke-linecap="round" fill="none"/>' +
    '<path d="M32 40c0-9-6-12-14-12 0 9 6 12 14 12z" fill="#F2A93B"/>' +
    '<path d="M32 30c0-8 5-11 12-11 0 8-5 11-12 11z" fill="#F8CE7A"/></svg>';

  function navHTML(active) {
    return NAV.map(n =>
      '<a href="' + n.href + '"' + (n.id === active ? ' class="active" aria-current="page"' : "") + ">" + n.label + "</a>"
    ).join("");
  }

  function chipsHTML(active) {
    return CHIPS.map(c =>
      '<a href="' + c.href + '"' + (c.href.indexOf(active + ".html") === 0 ? ' class="active"' : "") + ">" + c.label + "</a>"
    ).join("");
  }

  function authHTML() {
    const u = Auth.current();
    if (!u) return '<a href="masuk.html" class="btn btn-gold small">Masuk</a>';
    const nama = u.nama.split(" ")[0];
    return (
      '<span class="user-chip" title="' + u.nama + (u.usaha ? "  " + u.usaha : "") + '">' +
        '<svg class="icon" viewBox="0 0 24 24" style="width:16px;height:16px"><circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>' +
        "<b>" + esc(nama) + "</b>" +
      "</span>" +
      '<button type="button" id="btnKeluar" class="link-btn">Keluar</button>'
    );
  }

  function headerHTML(active) {
    return (
      '<div class="wrap bar">' +
        '<a class="logo" href="index.html" aria-label="UMKM KU - Beranda">' +
          '<span class="mark" aria-hidden="true">' + LOGO_SVG + "</span>" +
          "UMKM <em>KU</em>" +
        "</a>" +
        '<nav class="main" aria-label="Navigasi utama">' + navHTML(active) + "</nav>" +
        '<div class="auth-area">' + authHTML() + "</div>" +
      "</div>" +
      '<nav class="chips" aria-label="Navigasi cepat">' + chipsHTML(active) + "</nav>"
    );
  }

  function footerHTML() {
    return (
      '<div class="wrap">' +
        '<div class="foot-grid">' +
          '<div class="foot-brand">' +
            '<a class="logo" href="index.html"><span class="mark" aria-hidden="true">' + LOGO_SVG + "</span>UMKM <em>KU</em></a>" +
            "<p>Pusat bantuan digital untuk pelaku usaha mikro, kecil, dan menengah Indonesia. Ringan, ramah pemula, dan gratis.</p>" +
          "</div>" +
          "<div><h5>Jelajah</h5><ul>" +
            '<li><a href="panduan.html">Panduan Usaha</a></li>' +
            '<li><a href="catat.html">Catat Uang</a></li>' +
            '<li><a href="layanan.html">Urus Izin</a></li>' +
            '<li><a href="cek.html">Cek Kesiapan</a></li>' +
            '<li><a href="belajar.html">Belajar</a></li>' +
          "</ul></div>" +
          "<div><h5>Sumber Resmi</h5><ul>" +
            '<li><a href="https://oss.go.id" target="_blank" rel="noopener">oss.go.id  NIB</a></li>' +
            '<li><a href="https://bpjph.halal.go.id" target="_blank" rel="noopener">bpjph.halal.go.id  Halal</a></li>' +
            '<li><a href="https://e-pirt.kemkes.go.id" target="_blank" rel="noopener">e-pirt.kemkes.go.id  PIRT</a></li>' +
            '<li><a href="https://dgip.go.id" target="_blank" rel="noopener">dgip.go.id  Merek</a></li>' +
            '<li><a href="https://sapa.umkm.go.id" target="_blank" rel="noopener">sapa.umkm.go.id  SAPA UMKM</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="foot-note">' +
          "<span>© 2026 UMKM KU  Prototipe v2 (backend dummy). Bukan situs pemerintah; konten adalah ringkasan edukatif.</span>" +
          "<span>Dibuat dengan ♥ untuk pelaku UMKM Indonesia.</span>" +
        "</div>" +
      "</div>"
    );
  }

  /* ---------- Util bersama ---------- */
  function rp(n) { return "Rp" + (n || 0).toLocaleString("id-ID"); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function tgl(iso) {
    try {
      return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) + ", " +
             new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    } catch (e) { return ""; }
  }

  function reveal() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".rv");
    if (!reduced && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: .12 });
      els.forEach(el => io.observe(el));
    } else {
      els.forEach(el => el.classList.add("in"));
    }
  }

  function bindKeluar() {
    const b = document.getElementById("btnKeluar");
    if (!b) return;
    b.addEventListener("click", function () {
      if (confirm("Keluar dari akun Anda? Data tetap tersimpan di perangkat ini.")) {
        Auth.keluar();
        location.href = "index.html";
      }
    });
  }

  /* Panggil di setiap halaman. active = id halaman ("catat", "layanan", ...). */
  function boot(active) {
    Seed.ensure();
    Auth.init();
    const h = document.getElementById("app-header");
    const f = document.getElementById("app-footer");
    if (h) h.innerHTML = headerHTML(active || "");
    if (f) f.innerHTML = footerHTML();
    bindKeluar();
    reveal();
  }

  return { boot, rp, esc, tgl, reveal };
})();
