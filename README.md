# Aplikasi Pemesanan Vila Permai

Project UTS Teknologi Web berupa website sederhana untuk melihat pilihan vila di kawasan Puncak, Bogor. Pengunjung dapat mencari vila, mengisi form, lalu melihat perkiraan harga dan menyimpan simulasi pesanannya di browser.

## Identitas

- **Nama:** Ade Evan Alvianysah
- **NIM:** 24011130331
- **Repository:** [Adeevanvansyah_24011130331_UTS_VillaPermai](https://github.com/adeevan2024-m-design/Adeevanvansyah_24011130331_UTS_VillaPermai)

## Sekilas tentang aplikasi

Halaman menampilkan tiga pilihan vila lengkap dengan lokasi, jumlah kamar, fasilitas, harga per malam, dan status. Kolom pencarian bisa digunakan untuk mencari nama, lokasi, maupun fasilitas. Pemesanan dilakukan melalui form di halaman yang sama.

Harga dihitung dari jumlah malam. Untuk setiap tamu di atas dua orang, ada tambahan Rp100.000 per malam. Sebelum pesanan disimpan, aplikasi memeriksa isian form, tanggal, jumlah tamu, dan status vila.

### Yang bisa dicoba

- Cari kata seperti `Cisarua`, `Anggrek`, atau `WiFi`.
- Coba pilih Vila Melati untuk melihat pesan bahwa vila sedang penuh.
- Isi form dengan tanggal check-in dan check-out, lalu pilih **Cek Ketersediaan** untuk melihat rincian biaya.
- Pilih **Pesan Sekarang** untuk menambahkan simulasi pesanan ke riwayat.

## Menjalankan project

Project tidak memerlukan instalasi package atau server backend.

1. Clone repository atau unduh sebagai ZIP dari GitHub.
2. Buka folder project di VS Code.
3. Buka `index.html` langsung di browser. Jika menggunakan ekstensi Live Server, klik kanan `index.html`, lalu pilih **Open with Live Server**.

Untuk clone melalui terminal:

```bash
git clone https://github.com/adeevan2024-m-design/Adeevanvansyah_24011130331_UTS_VillaPermai.git
cd Adeevanvansyah_24011130331_UTS_VillaPermai
```

## Isi repository

```text
├── index.html                    # Struktur halaman
├── style.css                     # Tampilan dan aturan responsif
├── script.js                     # Data vila dan proses pemesanan
├── README.md                     # Dokumentasi project
└── assets/
    ├── villa-permai-desktop-full.png
    └── villa-permai-mobile-full.png
```

## Tampilan

Gambar berikut menunjukkan halaman secara penuh, dari bagian atas sampai footer.

### Desktop

![Halaman Villa Permai pada desktop](assets/villa-permai-desktop-full.png)

### Mobile

![Halaman Villa Permai pada mobile](assets/villa-permai-mobile-full.png)

## Catatan penggunaan

Ini adalah demo front-end, bukan sistem reservasi yang terhubung ke pemilik vila. Data vila dan status ketersediaannya ditentukan di `script.js`. Nama terakhir dan riwayat simulasi disimpan menggunakan `localStorage`, jadi hanya tersedia pada browser dan perangkat tempat pesanan dibuat. Menghapus data browser juga akan menghapus riwayat tersebut.

## Riwayat commit

Riwayat lengkap dapat dilihat di [halaman commits repository](https://github.com/adeevan2024-m-design/Adeevanvansyah_24011130331_UTS_VillaPermai/commits/main/), atau dari folder project dengan perintah `git log --oneline`.

Beberapa commit yang menandai perkembangan project:

| Commit | Keterangan |
| --- | --- |
| `0e107be` | Menambahkan file awal aplikasi |
| `5433539` | Merapikan README dan menambahkan `.gitignore` |
| `1624460` | Menambahkan panduan penggunaan dan preview |
| `0385a06` | Menambahkan screenshot mobile |
| `3183a04` | Menyesuaikan README dengan identitas dan format tugas |
| `dfe8009` | Menambahkan screenshot penuh desktop dan mobile |

## Teknologi

HTML, CSS, dan JavaScript. Data nama tamu terakhir serta riwayat pesanan disimpan di `localStorage` browser.
