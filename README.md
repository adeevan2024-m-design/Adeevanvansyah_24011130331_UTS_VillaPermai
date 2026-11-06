# Villa Permai — Aplikasi Pemesanan Vila Berbasis Web

Aplikasi web statis untuk pemesanan vila Villa Permai di kawasan Puncak, Kabupaten Bogor. Project ini dibuat untuk membantu calon tamu melihat daftar vila, mengecek ketersediaan, menghitung perkiraan biaya, dan mengirim pesanan tanpa harus berkomunikasi lewat WhatsApp secara manual.

## Deskripsi Proyek

Project ini menampilkan tiga unit vila dengan informasi seperti nama, tipe, lokasi, harga, fasilitas, dan status ketersediaan. Semua data disimpan dalam array objek di file `script.js` dan ditampilkan secara dinamis ke halaman menggunakan JavaScript.

## Struktur Folder

```text
uts-vila-permai/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
└── assets/ (opsional, jika ditambahkan nanti)
```

## Fitur

- Menampilkan daftar 3 vila dengan status tersedia / penuh
- Pencarian vila berdasarkan nama, lokasi, atau fasilitas
- Form pemesanan dengan validasi input
- Hitung total biaya otomatis berdasarkan lama menginap dan jumlah tamu
- Penyimpanan data terakhir dan riwayat pesanan ke `localStorage`
- Tampilan responsif untuk desktop, tablet, dan ponsel

## Cara Menjalankan

1. Pastikan Anda sudah berada di folder project.
2. Buka file `index.html` di browser.
3. Atau jalankan Live Server di VS Code agar file CSS dan JavaScript terbaca dengan benar.

Contoh browser langsung:

```text
file:///C:/path/ke/folder/project/index.html
```

## Validasi Form

Form ini sudah dilengkapi dengan validasi berikut:

- Nama tamu wajib diisi
- Vila harus dipilih
- Tanggal check-in dan check-out wajib diisi
- Tanggal check-out harus lebih besar dari check-in
- Tanggal check-in tidak boleh di masa lalu
- Jumlah tamu harus 1–10 orang

## Logika Harga

Perhitungan total biaya menggunakan rumus berikut:

```text
total = harga per malam × jumlah malam
```

Jika jumlah tamu lebih dari 2 orang, maka biaya tambahan Rp100.000 per malam akan dikenakan untuk setiap tamu tambahan.

## Riwayat Pengembangan

Project ini dibuat secara bertahap dalam beberapa tahap:

1. Pembuatan struktur halaman utama
2. Styling dasar dan responsif layout
3. Render data vila dan form pemesanan dengan JavaScript
4. Penambahan validasi, localStorage, dan hitung total biaya

## Informasi Pemilik

- Nama usaha: Villa Permai
- Lokasi: Puncak, Kabupaten Bogor
- Kontak pemilik: Pak Hendra
- WhatsApp: 0812-9045-2217

## Status Project

Project ini siap digunakan sebagai tugas UTS dan sudah berfungsi sebagai aplikasi pemesanan vila berbasis web statis.
