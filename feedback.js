
/* Menu Navigasi */
const tombol = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");

if (tombol && menu) {
    tombol.addEventListener("click", function() {
        menu.classList.toggle("open");
    });
}

/* Formulir Kritik dan Saran */
const form = document.querySelector("#feedbackForm");
const formSection = document.querySelector(".feedback-section");
const hasilBox = document.querySelector("#hasilBox");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked');

    const nama = document.querySelector("#nama").value;
    const kontak = document.querySelector("#kontak").value;
    const jenis = document.querySelector("#jenis").value;
    const favorit = document.querySelector("#favorit").value;
    const saran = document.querySelector("#saran").value;
    const member = document.querySelector("#member").checked;

    hasilBox.innerHTML = `
        <div class="success-icon">✓</div>

        <h2 class="success-title">
            Masukan Berhasil Dikirim!
        </h2>

        <p class="success-text">
            Terima kasih telah berbagi pengalaman bersama Bunila Resto.
            Masukan Anda sangat berarti bagi kami.
        </p>

        <h3>Ringkasan Masukan</h3>

        <div id="hasilFeedback">
            <p><strong>Nama:</strong> ${escapeHTML(nama)}</p>
            <p><strong>Nomor WhatsApp:</strong> ${escapeHTML(kontak)}</p>
            <p><strong>Jenis Pengunjung:</strong> ${escapeHTML(jenis)}</p>
            <p><strong>Penilaian:</strong> ${rating.value} bintang</p>
            <p><strong>Menu Favorit:</strong> ${escapeHTML(favorit)}</p>
            <p><strong>Kritik dan Saran:</strong> ${escapeHTML(saran)}</p>
            <p><strong>Member Bunila:</strong> ${member ? "Tertarik" : "Tidak"}</p>
        </div>

        <button type="button" class="btn btn-primary" id="kembali">
            Kembali ke Kritik & Saran
        </button>
    `;

    formSection.hidden = true;
    document.querySelector(".page-intro").hidden = true;
    hasilBox.hidden = false;

    window.scrollTo(0, 0);

    /* Tombol Kembali */
    document.querySelector("#kembali").addEventListener("click", function() {
        form.reset();

        hasilBox.hidden = true;
        hasilBox.innerHTML = "";

        formSection.hidden = false;
        document.querySelector(".page-intro").hidden = false;

        window.scrollTo(0, 0);
    });
});

/* Mengamankan Teks yang Ditampilkan */
function escapeHTML(teks) {
    return String(teks).replace(/[&<>"']/g, function(karakter) {
        const simbol = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return simbol[karakter];
    });
}
