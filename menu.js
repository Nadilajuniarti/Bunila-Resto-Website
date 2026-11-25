const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");
        navToggle.setAttribute("aria-expanded", isOpen);
    });
}

const searchMenu = document.querySelector("#searchMenu");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");
const noMenu = document.querySelector("#noMenu");

function tampilkanMenu() {
    const kataKunci = searchMenu.value.toLowerCase();
    const kategoriAktif = document.querySelector(".filter-btn.active").dataset.category;

    let jumlahMenu = 0;

    menuCards.forEach(function (menu) {
        const namaMenu = menu.dataset.name.toLowerCase();
        const kategoriMenu = menu.dataset.category;

        const cocokNama = namaMenu.includes(kataKunci);
        const cocokKategori = kategoriAktif === "semua" || kategoriMenu === kategoriAktif;

        if (cocokNama && cocokKategori) {
            menu.style.display = "block";
            jumlahMenu++;
        } else {
            menu.style.display = "none";
        }
    });

    noMenu.style.display = jumlahMenu === 0 ? "block" : "none";
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (filter) {
            filter.classList.remove("active");
        });

        button.classList.add("active");
        tampilkanMenu();
    });
});

searchMenu.addEventListener("input", function () {
    tampilkanMenu();
});
