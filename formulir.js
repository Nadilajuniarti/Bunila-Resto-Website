const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        navToggle.setAttribute(
            "aria-expanded",
            navLinks.classList.contains("open")
        );
    });
}

const form = document.querySelector("#reservationForm");
const hasil = document.querySelector("#hasilBox");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector("#hasilNama").textContent = document.querySelector("#nama").value;
    document.querySelector("#hasilHp").textContent = document.querySelector("#hp").value;
    document.querySelector("#hasilTanggal").textContent =
        new Date(document.querySelector("#tanggal").value + "T00:00:00")
        .toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    document.querySelector("#hasilJam").textContent = document.querySelector("#jam").value;
    document.querySelector("#hasilJumlah").textContent = document.querySelector("#jumlah").value + " orang";
    document.querySelector("#hasilArea").textContent = document.querySelector("#area").value;
    document.querySelector("#hasilCatatan").textContent = document.querySelector("#catatan").value || "-";

    form.hidden = true;
    hasil.hidden = false;
    hasil.scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#btnUlang").addEventListener("click", function () {
    form.reset();
    hasil.hidden = true;
    form.hidden = false;
    form.scrollIntoView({ behavior: "smooth" });
});
