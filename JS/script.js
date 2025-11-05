// Ambil elemen
const pilihanBuku = document.getElementById("pilihanBuku");
const tabelPesanan = document.getElementById("tabelPesanan");
const totalBayarEl = document.getElementById("totalBayar");

let keranjang = [];

// tampilkan buku dari data.js ke dropdown
dataKatalogBuku.forEach((buku) => {
  const option = document.createElement("option");
  option.value = buku.kodeBarang;
  option.textContent = `${buku.namaBarang} - ${buku.harga}`;
  pilihanBuku.appendChild(option);
});

// tambah pesanan ke tabel
function tambahPesanan() {
  const kode = pilihanBuku.value;
  const jumlah = parseInt(document.getElementById("jumlah").value);

  if (!kode) {
    alert("Pilih buku terlebih dahulu!");
    return;
  }

  const buku = dataKatalogBuku.find((item) => item.kodeBarang === kode);
  if (!buku) return;

  // hitung total harga
  const harga = parseInt(buku.harga.replace(/\D/g, ""));
  const total = harga * jumlah;

  // simpan ke keranjang
  keranjang.push({
    nama: buku.namaBarang,
    jumlah: jumlah,
    harga: buku.harga,
    total: `Rp ${total.toLocaleString("id-ID")}`
  });

  renderTabel();
}

// render tabel pesanan
function renderTabel() {
  tabelPesanan.innerHTML = "";
  let totalKeseluruhan = 0;

  keranjang.forEach((item) => {
    const baris = document.createElement("tr");
    baris.innerHTML = `
      <td>${item.nama}</td>
      <td>${item.jumlah}</td>
      <td>${item.harga}</td>
      <td>${item.total}</td>
    `;
    tabelPesanan.appendChild(baris);

    totalKeseluruhan += parseInt(item.total.replace(/\D/g, ""));
  });

  totalBayarEl.textContent = `Rp ${totalKeseluruhan.toLocaleString("id-ID")}`;
}

// fungsi checkout
function checkout() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  alert("✅ Pesanan berhasil dibuat! Silakan lanjut ke halaman tracking.");
  window.location.href = "tracking.html";
}

function cariTracking() {
  const inputDO = document.getElementById("nomorDO").value.trim();
  const hasilDiv = document.getElementById("hasilTracking");
  const perjalananList = document.getElementById("doPerjalanan");

  if (!inputDO) {
    alert("Masukkan nomor DO terlebih dahulu!");
    return;
  }

  const data = dataTracking[inputDO];

  if (!data) {
    alert("Nomor DO tidak ditemukan!");
    hasilDiv.style.display = "none";
    return;
  }

  // tampilkan hasil
  document.getElementById("doNomor").textContent = data.nomorDO;
  document.getElementById("doNama").textContent = data.nama;
  document.getElementById("doStatus").textContent = data.status;
  document.getElementById("doEkspedisi").textContent = data.ekspedisi;
  document.getElementById("doTanggal").textContent = data.tanggalKirim;
  document.getElementById("doPaket").textContent = data.paket;
  document.getElementById("doTotal").textContent = data.total;

  // tampilkan perjalanan
  perjalananList.innerHTML = "";
  data.perjalanan.forEach((step) => {
    const li = document.createElement("li");
    li.style = "background-color: #f3f3f3; border-radius: 6px; padding: 8px; margin-bottom: 8px; border-left: 4px solid #0077ff;";
    li.innerHTML = `<b>${step.waktu}</b><br>${step.keterangan}`;
    perjalananList.appendChild(li);
  });

  hasilDiv.style.display = "block";
}
