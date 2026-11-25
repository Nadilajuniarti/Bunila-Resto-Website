const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
    });
}

const pilihanMenu = document.querySelectorAll(".pilihan-menu");

pilihanMenu.forEach(function (pilihan) {
    pilihan.addEventListener("change", function () {
        const jumlah = pilihan.parentElement.parentElement.querySelector(".jumlah");
        jumlah.disabled = !pilihan.checked;

        if (!pilihan.checked) jumlah.value = 1;
    });
});

const alamatBox = document.querySelector("#alamatBox");
const alamat = document.querySelector("#alamat");

document.querySelectorAll('input[name="jenis"]').forEach(function (jenis) {
    jenis.addEventListener("change", function () {
        alamatBox.hidden = jenis.value === "Makan di Tempat";
        alamat.required = !alamatBox.hidden;

        if (alamatBox.hidden) alamat.value = "";
    });
});

const buktiBox = document.querySelector("#buktiBox");
const bukti = document.querySelector("#bukti");

document.querySelectorAll('input[name="pembayaran"]').forEach(function (metode) {
    metode.addEventListener("change", function () {
        buktiBox.hidden = metode.value !== "Transfer";
        bukti.required = !buktiBox.hidden;

        if (buktiBox.hidden) bukti.value = "";
    });
});

const orderForm = document.querySelector("#orderForm");
const hasilBox = document.querySelector("#hasilBox");
const hasilPesanan = document.querySelector("#hasilPesanan");
const btnUlang = document.querySelector("#btnUlang");

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let daftarPesanan = "";
    let total = 0;

    pilihanMenu.forEach(function (pilihan) {
        if (pilihan.checked) {
            const jumlah = pilihan.parentElement.parentElement.querySelector(".jumlah").value;
            const subtotal = Number(pilihan.dataset.harga) * Number(jumlah);

            total += subtotal;
            daftarPesanan += pilihan.value + " x " + jumlah + " = Rp" +
                subtotal.toLocaleString("id-ID") + "\n";
        }
    });

    if (daftarPesanan === "") {
        alert("Silakan pilih minimal satu menu!");
        return;
    }

    if (bukti.files.length > 0 && bukti.files[0].size > 2 * 1024 * 1024) {
        alert("Ukuran bukti transfer maksimal 2 MB!");
        return;
    }

    const jenis = document.querySelector('input[name="jenis"]:checked').value;
    const pembayaran = document.querySelector('input[name="pembayaran"]:checked').value;

    let hasil = "Nama: " + document.querySelector("#nama").value;
    hasil += "\nWhatsApp: " + document.querySelector("#hp").value;
    hasil += "\n\nDaftar Pesanan:\n" + daftarPesanan;
    hasil += "\nTotal Pembayaran: Rp" + total.toLocaleString("id-ID");
    hasil += "\nJenis Pesanan: " + jenis;

    if (!alamatBox.hidden) hasil += "\nAlamat: " + alamat.value;

    hasil += "\nMetode Pembayaran: " + pembayaran;

    if (pembayaran === "Transfer") hasil += "\nBukti Transfer: " + bukti.files[0].name;

    const catatan = document.querySelector("#catatan").value;
    if (catatan !== "") hasil += "\nCatatan: " + catatan;

    hasilPesanan.textContent = hasil;
    orderForm.hidden = true;
    document.querySelector(".order-heading").hidden = true;
    hasilBox.hidden = false;

    hasilBox.scrollIntoView({ behavior: "smooth" });
});

btnUlang.addEventListener("click", function () {
    orderForm.reset();

    pilihanMenu.forEach(function (pilihan) {
        const jumlah = pilihan.parentElement.parentElement.querySelector(".jumlah");
        jumlah.disabled = true;
        jumlah.value = 1;
    });

    alamatBox.hidden = true;
    buktiBox.hidden = true;
    alamat.required = false;
    bukti.required = false;

    hasilBox.hidden = true;
    orderForm.hidden = false;
    document.querySelector(".order-heading").hidden = false;

    orderForm.scrollIntoView({ behavior: "smooth" });
});
