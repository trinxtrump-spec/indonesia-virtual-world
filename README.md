# Indonesia Virtual World — Starter MVP

Ini adalah **fondasi awal yang bisa dijalankan**, bukan game final. Isinya:
- dunia desa 3D sederhana di browser (Three.js),
- karakter pemain third-person,
- kontrol keyboard dan joystick layar sentuh,
- sinkronisasi posisi pemain melalui WebSocket,
- chat sederhana dan penggantian nama.

## Kebutuhan
- VPS Ubuntu 22.04/24.04 atau Linux sejenis
- Node.js 20 atau lebih baru
- Port TCP 3000 dibuka pada firewall VPS

## Menjalankan di VPS
Masuk ke terminal VPS, lalu unggah dan ekstrak ZIP ini. Di folder proyek jalankan:

```bash
npm install
npm start
```

Buka `http://IP-VPS:3000` dari browser untuk tes awal.

Untuk akses publik yang aman, pasang domain + HTTPS/WSS melalui Nginx dan sertifikat TLS sebelum membagikan game ke pemain. Jangan biarkan port administrasi VPS terbuka untuk umum.

## Catatan penting
- Ini starter prototype; belum ada akun permanen, database, sistem rumah/provinsi, pekerjaan, voting, pembayaran, atau GOD PANEL.
- Server saat ini menyimpan pemain hanya di memori. Jika proses restart, sesi pemain hilang.
- Tidak ada sistem admin/otorisasi pada prototype ini.
- Three.js dimuat dari CDN sehingga perangkat perlu internet.
- Jangan memasukkan password VPS, token, atau API key ke file publik.
- VPS 4 GB cocok untuk uji coba kecil; kapasitas pemain perlu diuji dan ditingkatkan sebelum peluncuran ramai.

## Tahap berikutnya
1. Tambah database PostgreSQL dan akun.
2. Tambah autentikasi aman dan peran admin.
3. Bangun provinsi, rumah, pekerjaan dan persetujuan jabatan.
4. Tambah voting pembangunan, GOD PANEL dan event.
5. Optimasi jaringan, keamanan, dan skala multiplayer.
