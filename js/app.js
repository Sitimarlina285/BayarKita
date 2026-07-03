// ======================================
// APP.JS
// ======================================

// Navigation SPA
const links = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

links.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const page = this.dataset.page;

        // Sembunyikan semua halaman
        pages.forEach(p => p.classList.add("hidden"));

        // Tampilkan halaman yang dipilih
        document
            .getElementById(page + "-page")
            .classList.remove("hidden");

        // Aktifkan warna menu
        links.forEach(l => l.classList.remove("text-primary"));

        this.classList.add("text-primary");

        // Jika membuka Riwayat, refresh tabel
        if (page === "history") {
            renderHistory();
        }

    });

});

document.addEventListener("DOMContentLoaded", () => {

    renderHistory();

    renderDashboard();

    renderPaymentChart();

});

// ======================================
// QUICK MENU
// ======================================

const quickLinks = document.querySelectorAll(".quick-link");

quickLinks.forEach(card => {

    card.addEventListener("click", function () {

        const page = this.dataset.page;

        // Sembunyikan semua halaman
        pages.forEach(p => p.classList.add("hidden"));

        // Tampilkan halaman tujuan
        document
            .getElementById(page + "-page")
            .classList.remove("hidden");

        // Ubah menu navbar yang aktif
        links.forEach(l => l.classList.remove("text-primary"));

        document
            .querySelector(`.nav-link[data-page="${page}"]`)
            .classList.add("text-primary");

        // Jika menuju riwayat
        if(page === "history"){
            renderHistory();
        }

        // Scroll ke atas
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});