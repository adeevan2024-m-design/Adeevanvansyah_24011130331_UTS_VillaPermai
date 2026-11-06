const daftarVila = [
  {
    id: "vila-khayangan",
    nama: "Vila Khayangan",
    tipe: "3 Kamar Tidur",
    lokasi: "Bogor, Jawa Barat",
    harga: 1500000,
    fasilitas: ["Kolam renang pribadi", "WiFi", "Dapur lengkap", "Parkir luas"],
    gambar: "assets/vila-khayangan.webp",
    tersedia: true
  },
  {
    id: "villa-lembah-koi",
    nama: "Villa Lembah Koi",
    tipe: "2 Kamar Tidur",
    lokasi: "Jawa Barat",
    harga: 1100000,
    fasilitas: ["WiFi", "Teras dengan pemandangan gunung", "Pemanas air"],
    gambar: "assets/villa-lembah-koi.jpg",
    tersedia: true
  },
  {
    id: "villa-so-long-banyuwangi",
    nama: "Villa So Long Banyuwangi",
    tipe: "4 Kamar Tidur",
    lokasi: "Banyuwangi, Jawa Timur",
    harga: 2200000,
    fasilitas: ["Kolam renang", "Ruang karaoke", "Dapur lengkap", "WiFi", "Parkir 4 mobil"],
    gambar: "assets/villa-so-long-banyuwangi.webp",
    tersedia: false
  }
];

let daftarFavorit = new Set();
let hanyaFavorit = false;

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function formatTanggalLokal(tanggal) {
  const bagian = tanggal.split("-").map(Number);
  return new Date(Date.UTC(bagian[0], bagian[1] - 1, bagian[2]));
}

function tanggalHariIni() {
  const sekarang = new Date();
  const lokal = new Date(sekarang.getTime() - sekarang.getTimezoneOffset() * 60000);
  return lokal.toISOString().split("T")[0];
}

function cariVilaById(id) {
  return daftarVila.find(function (vila) {
    return vila.id === id;
  });
}

function renderDaftarVila(data) {
  const container = document.getElementById("villaList");
  container.innerHTML = "";

  if (data.length === 0) {
    const pesan = document.createElement("p");
    pesan.className = "pesan-kosong";
    pesan.textContent = hanyaFavorit
      ? "Belum ada vila favorit yang cocok dengan pilihan ini."
      : "Belum ada vila yang cocok. Coba kata kunci atau filter lain.";
    container.appendChild(pesan);
    return;
  }

  data.forEach(function (vila) {
    const kartu = document.createElement("article");
    kartu.className = "villa-card";

    const media = document.createElement("div");
    media.className = "villa-card__media";

    const gambar = document.createElement("img");
    gambar.className = "villa-card__gambar";
    gambar.src = vila.gambar;
    gambar.alt = vila.nama;
    gambar.loading = "lazy";
    media.appendChild(gambar);

    const status = document.createElement("span");
    status.className = vila.tersedia ? "status status--tersedia" : "status status--penuh";
    status.textContent = vila.tersedia ? "Tersedia" : "Penuh";
    media.appendChild(status);

    const tombolFavorit = document.createElement("button");
    tombolFavorit.type = "button";
    tombolFavorit.className = daftarFavorit.has(vila.id) ? "villa-card__favorit is-active" : "villa-card__favorit";
    tombolFavorit.setAttribute("aria-label", daftarFavorit.has(vila.id) ? "Hapus " + vila.nama + " dari favorit" : "Simpan " + vila.nama + " ke favorit");
    tombolFavorit.setAttribute("aria-pressed", daftarFavorit.has(vila.id));
    tombolFavorit.textContent = daftarFavorit.has(vila.id) ? "♥" : "♡";
    tombolFavorit.addEventListener("click", function () {
      ubahFavorit(vila.id);
    });
    media.appendChild(tombolFavorit);
    kartu.appendChild(media);

    const isi = document.createElement("div");
    isi.className = "villa-card__isi";
    const judul = document.createElement("h3");
    judul.textContent = vila.nama;
    isi.appendChild(judul);

    const tipe = document.createElement("p");
    tipe.className = "villa-card__tipe";
    tipe.textContent = vila.tipe;
    isi.appendChild(tipe);

    const lokasi = document.createElement("p");
    lokasi.className = "villa-card__lokasi";
    const ikonLokasi = document.createElement("span");
    ikonLokasi.setAttribute("aria-hidden", "true");
    ikonLokasi.textContent = "⌖ ";
    lokasi.append(ikonLokasi, document.createTextNode(vila.lokasi));
    isi.appendChild(lokasi);

    const harga = document.createElement("p");
    harga.className = "villa-card__price";
    harga.append(document.createTextNode(formatRupiah(vila.harga)));
    const satuanHarga = document.createElement("span");
    satuanHarga.textContent = " / malam";
    harga.appendChild(satuanHarga);
    isi.appendChild(harga);

    const fasilitasJudul = document.createElement("p");
    fasilitasJudul.className = "villa-card__fasilitas-judul";
    fasilitasJudul.textContent = "Yang tersedia";
    isi.appendChild(fasilitasJudul);

    const daftarFasilitas = document.createElement("ul");
    daftarFasilitas.className = "villa-card__fasilitas";
    vila.fasilitas.forEach(function (fasilitas) {
      const item = document.createElement("li");
      item.textContent = fasilitas;
      daftarFasilitas.appendChild(item);
    });
    isi.appendChild(daftarFasilitas);

    const tombolPilih = document.createElement("button");
    tombolPilih.type = "button";
    tombolPilih.className = "villa-card__aksi";
    tombolPilih.textContent = vila.tersedia ? "Pilih vila" : "Sedang penuh";
    tombolPilih.disabled = !vila.tersedia;
    tombolPilih.addEventListener("click", function () {
      document.getElementById("pilihVila").value = vila.id;
      perbaruiEstimasi();
      document.getElementById("form-pesan").scrollIntoView({ behavior: "smooth" });
      document.getElementById("tanggalCheckin").focus({ preventScroll: true });
    });
    isi.appendChild(tombolPilih);
    kartu.appendChild(isi);

    container.appendChild(kartu);
  });
}

function simpanDaftarFavorit() {
  try {
    localStorage.setItem("villaPermai_favorit", JSON.stringify(Array.from(daftarFavorit)));
  } catch (error) {
    console.error("Daftar favorit tidak dapat disimpan di perangkat ini.", error);
  }
}

function muatDaftarFavorit() {
  try {
    const tersimpan = localStorage.getItem("villaPermai_favorit");
    if (!tersimpan) {
      return new Set();
    }

    const favorit = JSON.parse(tersimpan);
    if (!Array.isArray(favorit)) {
      throw new Error("Format daftar favorit tidak valid.");
    }

    const idVila = daftarVila.map(function (vila) {
      return vila.id;
    });
    return new Set(favorit.filter(function (id) {
      return idVila.includes(id);
    }));
  } catch (error) {
    console.error("Daftar favorit tidak dapat dimuat.", error);
    return new Set();
  }
}

function ubahFavorit(id) {
  if (daftarFavorit.has(id)) {
    daftarFavorit.delete(id);
  } else {
    daftarFavorit.add(id);
  }
  simpanDaftarFavorit();
  perbaruiDaftarVila();
}

function perbaruiDaftarVila() {
  let hasil = filterVila(document.getElementById("cariVila").value);
  const statusPilihan = document.getElementById("filterStatus").value;

  if (statusPilihan !== "semua") {
    hasil = hasil.filter(function (vila) {
      return statusPilihan === "tersedia" ? vila.tersedia : !vila.tersedia;
    });
  }

  if (hanyaFavorit) {
    hasil = hasil.filter(function (vila) {
      return daftarFavorit.has(vila.id);
    });
  }

  const urutan = document.getElementById("urutHarga").value;
  if (urutan === "termurah") {
    hasil.sort(function (a, b) {
      return a.harga - b.harga;
    });
  } else if (urutan === "termahal") {
    hasil.sort(function (a, b) {
      return b.harga - a.harga;
    });
  }

  renderDaftarVila(hasil);
  document.getElementById("jumlahHasil").textContent = hasil.length + " vila ditemukan";

  const tombolFavorit = document.getElementById("btnFavorit");
  tombolFavorit.setAttribute("aria-pressed", hanyaFavorit);
  tombolFavorit.textContent = hanyaFavorit
    ? "♥ Semua vila"
    : "♡ Favorit (" + daftarFavorit.size + ")";
  tombolFavorit.classList.toggle("is-active", hanyaFavorit);
}

function isiDropdownVila() {
  const select = document.getElementById("pilihVila");
  select.innerHTML = "";

  daftarVila.forEach(function (vila) {
    const opsi = document.createElement("option");
    opsi.value = vila.id;
    opsi.textContent = vila.nama + " — " + formatRupiah(vila.harga) + "/malam";
    select.appendChild(opsi);
  });
}

function hitungJumlahMalam(tanggalCheckin, tanggalCheckout) {
  const masuk = formatTanggalLokal(tanggalCheckin);
  const keluar = formatTanggalLokal(tanggalCheckout);
  return (keluar - masuk) / (24 * 60 * 60 * 1000);
}

function hitungTotalHarga(vila, jumlahMalam, jumlahTamu) {
  const batasTamuNormal = 2;
  const biayaTamuTambahanPerMalam = 100000;

  let total = vila.harga * jumlahMalam;

  if (jumlahTamu > batasTamuNormal) {
    const tamuLebih = jumlahTamu - batasTamuNormal;
    total = total + tamuLebih * biayaTamuTambahanPerMalam * jumlahMalam;
  }

  return total;
}

function validasiForm(data) {
  const errors = [];
  if (!data.nama || data.nama.trim() === "") {
    errors.push("Nama tamu wajib diisi.");
  }

  if (!data.vilaId) {
    errors.push("Silakan pilih unit vila terlebih dahulu.");
  }

  if (!data.checkin || !data.checkout) {
    errors.push("Tanggal check-in dan check-out wajib diisi.");
  } else {
    if (data.checkin < tanggalHariIni()) {
      errors.push("Tanggal check-in tidak boleh di masa lalu.");
    }

    if (data.checkout <= data.checkin) {
      errors.push("Tanggal check-out harus setelah tanggal check-in.");
    }
  }

  if (!data.jumlahTamu || data.jumlahTamu < 1 || data.jumlahTamu > 10) {
    errors.push("Jumlah tamu harus antara 1 sampai 10 orang.");
  }

  return errors;
}

function perbaruiEstimasi() {
  const kotak = document.getElementById("estimasiBiaya");
  const data = ambilDataForm();
  const vila = cariVilaById(data.vilaId);
  let rincian = kotak.querySelector(".quote-box__details");

  if (rincian) {
    rincian.remove();
  }
  kotak.classList.remove("quote-box--active");

  const petunjuk = kotak.querySelector(".quote-box__hint");
  petunjuk.hidden = false;

  if (!data.checkin || !data.checkout || !Number.isInteger(data.jumlahTamu)) {
    petunjuk.textContent = "Pilih tanggal dan jumlah tamu untuk melihat rincian.";
    return;
  }

  if (data.checkin < tanggalHariIni() || data.checkout <= data.checkin || data.jumlahTamu < 1 || data.jumlahTamu > 10) {
    petunjuk.textContent = "Periksa kembali tanggal dan jumlah tamu untuk melihat estimasi.";
    return;
  }

  if (!vila || !vila.tersedia) {
    petunjuk.textContent = vila ? vila.nama + " sedang penuh. Silakan pilih vila lain." : "Pilih vila untuk melihat estimasi.";
    return;
  }

  const jumlahMalam = hitungJumlahMalam(data.checkin, data.checkout);
  const biayaTamuTambahan = Math.max(0, data.jumlahTamu - 2) * 100000 * jumlahMalam;
  const total = hitungTotalHarga(vila, jumlahMalam, data.jumlahTamu);
  petunjuk.hidden = true;

  rincian = document.createElement("div");
  rincian.className = "quote-box__details";
  [
    [vila.nama + " · " + jumlahMalam + " malam", formatRupiah(vila.harga * jumlahMalam)],
    [data.jumlahTamu + " tamu", biayaTamuTambahan ? formatRupiah(biayaTamuTambahan) + " biaya tambahan" : "Termasuk"]
  ].forEach(function (baris) {
    const item = document.createElement("div");
    item.className = "quote-box__row";
    const label = document.createElement("span");
    label.textContent = baris[0];
    const nilai = document.createElement("strong");
    nilai.textContent = baris[1];
    item.append(label, nilai);
    rincian.appendChild(item);
  });

  const totalBaris = document.createElement("div");
  totalBaris.className = "quote-box__total";
  const labelTotal = document.createElement("span");
  labelTotal.textContent = "Perkiraan total";
  const nilaiTotal = document.createElement("strong");
  nilaiTotal.textContent = formatRupiah(total);
  totalBaris.append(labelTotal, nilaiTotal);
  rincian.appendChild(totalBaris);
  kotak.appendChild(rincian);
  kotak.classList.add("quote-box--active");
}

function ambilDataForm() {
  return {
    nama: document.getElementById("namaTamu").value,
    vilaId: document.getElementById("pilihVila").value,
    checkin: document.getElementById("tanggalCheckin").value,
    checkout: document.getElementById("tanggalCheckout").value,
    jumlahTamu: parseInt(document.getElementById("jumlahTamu").value, 10)
  };
}

function tampilkanPesan(pesan, jenis) {
  const kotak = document.getElementById("hasilPesanan");
  kotak.innerHTML = "";
  kotak.className = "hasil-box hasil-box--" + jenis;

  const teks = document.createElement("p");
  teks.textContent = pesan;
  kotak.appendChild(teks);
}

function tampilkanRingkasanBiaya(vila, jumlahMalam, jumlahTamu, total) {
  const kotak = document.getElementById("hasilPesanan");
  kotak.innerHTML = "";
  kotak.className = "hasil-box hasil-box--sukses";
  perbaruiEstimasi();

  const judul = document.createElement("h3");
  judul.textContent = "Ringkasan Biaya";
  kotak.appendChild(judul);

  const rincian = [
    "Vila: " + vila.nama,
    "Lama menginap: " + jumlahMalam + " malam",
    "Jumlah tamu: " + jumlahTamu + " orang",
    "Total biaya: " + formatRupiah(total)
  ];

  rincian.forEach(function (baris) {
    const p = document.createElement("p");
    p.textContent = baris;
    kotak.appendChild(p);
  });
}

function simpanNamaTerakhir(nama) {
  try {
    localStorage.setItem("villaPermai_namaTerakhir", nama);
  } catch (error) {
    console.log("Nama tamu tidak dapat disimpan secara lokal di perangkat ini.");
  }
}

function muatNamaTerakhir() {
  try {
    const namaTersimpan = localStorage.getItem("villaPermai_namaTerakhir");
    if (namaTersimpan) {
      document.getElementById("namaTamu").value = namaTersimpan;
    }
  } catch (error) {
    console.log("Gagal memuat nama tamu yang tersimpan.");
  }
}

function simpanPesanan(pesanan) {
  try {
    const dataSebelumnya = localStorage.getItem("villaPermai_pesanan");
    const daftarPesanan = dataSebelumnya ? JSON.parse(dataSebelumnya) : [];
    daftarPesanan.push(pesanan);
    localStorage.setItem("villaPermai_pesanan", JSON.stringify(daftarPesanan));
  } catch (error) {
    console.log("Pesanan berhasil dibuat tapi gagal disimpan ke perangkat ini.");
  }
}

function muatRiwayatPesanan() {
  const container = document.getElementById("daftarRiwayat");
  container.innerHTML = "";

  let daftarPesanan = [];
  try {
    const dataTersimpan = localStorage.getItem("villaPermai_pesanan");
    daftarPesanan = dataTersimpan ? JSON.parse(dataTersimpan) : [];
  } catch (error) {
    const pesanGagal = document.createElement("p");
    pesanGagal.textContent = "Riwayat pesanan tidak dapat dimuat saat ini.";
    container.appendChild(pesanGagal);
    return;
  }

  if (daftarPesanan.length === 0) {
    const kosong = document.createElement("p");
    kosong.textContent = "Belum ada pesanan yang tersimpan dari perangkat ini.";
    container.appendChild(kosong);
    return;
  }

  daftarPesanan.forEach(function (pesanan) {
    const kartu = document.createElement("article");
    kartu.className = "riwayat-item";
    kartu.textContent =
      pesanan.nama + " memesan " + pesanan.namaVila + " (" +
      pesanan.checkin + " s.d. " + pesanan.checkout + "), " +
      pesanan.jumlahTamu + " tamu — " + formatRupiah(pesanan.total);
    container.appendChild(kartu);
  });
}

function filterVila(kataKunci) {
  const kunci = kataKunci.toLowerCase().trim();

  if (kunci === "") {
    return daftarVila.slice();
  }

  return daftarVila.filter(function (vila) {
    const cocokNama = vila.nama.toLowerCase().includes(kunci);
    const cocokLokasi = vila.lokasi.toLowerCase().includes(kunci);
    const cocokFasilitas = vila.fasilitas.some(function (fasilitas) {
      return fasilitas.toLowerCase().includes(kunci);
    });
    return cocokNama || cocokLokasi || cocokFasilitas;
  });
}

function prosesCekKetersediaan() {
  const data = ambilDataForm();
  const errors = validasiForm(data);

  if (errors.length > 0) {
    tampilkanPesan(errors.join(" "), "gagal");
    return;
  }

  const vila = cariVilaById(data.vilaId);

  if (!vila.tersedia) {
    tampilkanPesan(vila.nama + " sedang penuh. Silakan pilih vila lain atau ubah tanggal.", "gagal");
    return;
  }

  const jumlahMalam = hitungJumlahMalam(data.checkin, data.checkout);
  const total = hitungTotalHarga(vila, jumlahMalam, data.jumlahTamu);
  tampilkanRingkasanBiaya(vila, jumlahMalam, data.jumlahTamu, total);
}

function prosesPesanSekarang(event) {
  event.preventDefault();

  const data = ambilDataForm();
  const errors = validasiForm(data);

  if (errors.length > 0) {
    tampilkanPesan(errors.join(" "), "gagal");
    return;
  }

  const vila = cariVilaById(data.vilaId);

  if (!vila.tersedia) {
    tampilkanPesan(vila.nama + " sedang penuh. Silakan pilih vila lain atau ubah tanggal.", "gagal");
    return;
  }

  const jumlahMalam = hitungJumlahMalam(data.checkin, data.checkout);
  const total = hitungTotalHarga(vila, jumlahMalam, data.jumlahTamu);

  const pesanan = {
    nama: data.nama,
    namaVila: vila.nama,
    checkin: data.checkin,
    checkout: data.checkout,
    jumlahTamu: data.jumlahTamu,
    total: total
  };

  simpanPesanan(pesanan);
  simpanNamaTerakhir(data.nama);
  muatRiwayatPesanan();

  tampilkanPesan(
    "Simulasi permintaan atas nama " + data.nama + " untuk " + vila.nama +
    " tersimpan di riwayat perangkat ini. Perkiraan biaya " + formatRupiah(total) +
    ". Untuk konfirmasi reservasi, silakan hubungi Pak Hendra melalui WhatsApp.",
    "sukses"
  );

  document.getElementById("formPesan").reset();
  muatNamaTerakhir();
  perbaruiEstimasi();
}

function init() {
  try {
    daftarFavorit = muatDaftarFavorit();
    isiDropdownVila();
    muatNamaTerakhir();
    muatRiwayatPesanan();

    const inputCheckin = document.getElementById("tanggalCheckin");
    inputCheckin.setAttribute("min", tanggalHariIni());
    document.getElementById("tanggalCheckout").setAttribute("min", tanggalHariIni());
    perbaruiDaftarVila();

    document.getElementById("cariVila").addEventListener("input", function (event) {
      perbaruiDaftarVila();
    });

    document.getElementById("filterStatus").addEventListener("change", perbaruiDaftarVila);
    document.getElementById("urutHarga").addEventListener("change", perbaruiDaftarVila);
    document.getElementById("btnFavorit").addEventListener("click", function () {
      hanyaFavorit = !hanyaFavorit;
      perbaruiDaftarVila();
    });

    ["pilihVila", "tanggalCheckin", "tanggalCheckout", "jumlahTamu"].forEach(function (id) {
      document.getElementById(id).addEventListener("input", perbaruiEstimasi);
      document.getElementById(id).addEventListener("change", perbaruiEstimasi);
    });
    inputCheckin.addEventListener("change", function () {
      document.getElementById("tanggalCheckout").setAttribute("min", inputCheckin.value || tanggalHariIni());
    });

    document.getElementById("btnCek").addEventListener("click", prosesCekKetersediaan);
    document.getElementById("formPesan").addEventListener("submit", prosesPesanSekarang);
  } catch (error) {
    console.log("Terjadi kesalahan saat memuat halaman Villa Permai: " + error.message);
  }
}

document.addEventListener("DOMContentLoaded", init);
