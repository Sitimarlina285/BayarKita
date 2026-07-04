// ======================================
// PAYMENT.JS
// ======================================

let timer;

// ==============================
// TUTUP MODAL
// ==============================

function closePaymentModal() {

    const modal = document.getElementById("paymentModal");

    modal.classList.add("hidden");

    modal.classList.remove("modal-show");

    clearInterval(timer);

}

// ==============================
// VIRTUAL ACCOUNT
// ==============================

function showVA(trx) {

    const modal = document.getElementById("paymentModal");

    const content = document.getElementById("paymentContent");

    const nomorVA =
        "8808" + Math.floor(100000000 + Math.random() * 900000000);

    content.innerHTML = `

        <h2 class="text-3xl font-bold mb-6">

            Virtual Account

        </h2>

        <div class="bg-gray-100 rounded-xl p-5">

            <p class="text-gray-500">

                Nomor Virtual Account

            </p>

            <h1 class="text-3xl font-bold mt-2">

                ${nomorVA}

            </h1>

        </div>

        <p class="mt-6 text-gray-500">

            Total Pembayaran

        </p>

        <h2 class="text-2xl font-bold">

            Rp ${trx.nominal.toLocaleString("id-ID")}

        </h2>

        <div class="grid grid-cols-2 gap-4 mt-8">

            <button
                id="copyVA"
                class="bg-gray-200 py-3 rounded-xl">

                Copy VA

            </button>

            <button
                id="finishVA"
                class="bg-primary text-white py-3 rounded-xl">

                Saya Sudah Bayar

            </button>

        </div>

    `;

    modal.classList.remove("hidden");

    modal.classList.add("modal-show");

    document
        .getElementById("copyVA")
        .onclick = function () {

            navigator.clipboard.writeText(nomorVA);

            alert("Nomor VA berhasil disalin.");

        };

    document
        .getElementById("finishVA")
        .onclick = function () {

            finishPayment(trx);

        };

}

// ==============================
// SELESAI PEMBAYARAN
// ==============================

function finishPayment(trx) {

    if (!updateDashboard(trx.nominal)) {

        return;

    }

    saveTransaction(trx);
// ======================
// UPDATE STATUS SPP
// ======================

if (trx.kategori === "SPP") {

    const nim = document.getElementById("nimInput").value.trim();

    const dataSPP = getSPPData();

    document.querySelectorAll(".billCheck").forEach((check, index) => {

        if (check.checked) {

            dataSPP[nim].bills[index].status = "Lunas";

        }

    });

    saveSPPData(dataSPP);

    renderSPP(dataSPP[nim]);

}


    if (typeof renderHistory === "function") {

        renderHistory();

    }

    if (typeof renderDashboard === "function") {

        renderDashboard();

    }

    if (typeof renderPaymentChart === "function") {

        renderPaymentChart();

    }

    closePaymentModal();

    showReceipt(trx);

}

// ==============================
// TOMBOL X
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    const close = document.getElementById("closeModal");

    if (close) {

        close.onclick = closePaymentModal;

    }

});

// ==============================
// QRIS
// ==============================

function showQRIS(trx) {

    const modal = document.getElementById("paymentModal");

    const content = document.getElementById("paymentContent");

    content.innerHTML = `

        <h2 class="text-3xl font-bold mb-6 text-center">

            Pembayaran QRIS

        </h2>

        <div id="qrcode" class="flex justify-center mb-6"></div>

        <p class="text-center text-gray-500">

            Scan QR Code menggunakan aplikasi pembayaran Anda

        </p>

        <h2 class="text-2xl font-bold text-center mt-4">

            Rp ${trx.nominal.toLocaleString("id-ID")}

        </h2>

        <p class="text-center mt-4">

            Berlaku selama

            <span
                id="countdown"
                class="font-bold text-red-600">

                05:00

            </span>

        </p>

        <button
            id="finishQRIS"
            class="bg-primary text-white w-full py-3 rounded-xl mt-8">

            Saya Sudah Bayar

        </button>

    `;

    modal.classList.remove("hidden");

    modal.classList.add("modal-show");

    new QRCode(document.getElementById("qrcode"), {

        text: trx.id,

        width: 220,

        height: 220

    });

    startCountdown();

    document
        .getElementById("finishQRIS")
        .onclick = function () {

            finishPayment(trx);

        };

}

// ==============================
// COUNTDOWN QRIS
// ==============================

function startCountdown() {

    clearInterval(timer);

    let duration = 300;

    timer = setInterval(() => {

        const minutes = Math.floor(duration / 60);

        const seconds = duration % 60;

        const countdown = document.getElementById("countdown");

        if (countdown) {

            countdown.innerHTML =
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        }

        duration--;

        if (duration < 0) {

            clearInterval(timer);

            alert("QRIS telah kedaluwarsa.");

            closePaymentModal();

        }

    }, 1000);

}

// ==============================
// TELLER
// ==============================

function showTeller(trx) {

    const modal = document.getElementById("paymentModal");

    const content = document.getElementById("paymentContent");

    const kode = Math.floor(100000 + Math.random() * 900000);

    content.innerHTML = `

        <h2 class="text-3xl font-bold mb-6">

            Pembayaran Teller

        </h2>

        <div class="bg-yellow-100 rounded-xl p-5">

            <p>

                Kode Pembayaran

            </p>

            <h1 class="text-4xl font-bold mt-2">

                ${kode}

            </h1>

        </div>

        <div class="mt-6">

            <p class="font-semibold">

                Total Pembayaran

            </p>

            <h2 class="text-2xl font-bold">

                Rp ${trx.nominal.toLocaleString("id-ID")}

            </h2>

        </div>

        <div class="mt-6">

            <p class="font-semibold">

                Lokasi Pembayaran

            </p>

            <ul class="list-disc ml-6 mt-2">

                <li>Indomaret</li>

                <li>Alfamart</li>

                <li>Kantor Pos</li>

            </ul>

        </div>

        <button
            id="finishTeller"
            class="bg-primary text-white w-full py-3 rounded-xl mt-8">

            Selesai

        </button>

    `;

    modal.classList.remove("hidden");

    modal.classList.add("modal-show");

    document
        .getElementById("finishTeller")
        .onclick = function () {

            finishPayment(trx);

        };

}