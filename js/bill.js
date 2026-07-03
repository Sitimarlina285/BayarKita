// ============================================
// BILL.JS - PART 1
// ============================================

const btn = document.getElementById("checkBillBtn");

if (btn) {
    btn.addEventListener("click", checkBill);
}

// ============================================
// CEK TAGIHAN
// ============================================

function checkBill() {

    const jenis = document.getElementById("billType").value;
    const nomor = document.getElementById("customerNumber").value.trim();
    const hasil = document.getElementById("billResult");

    if (nomor === "") {

        hasil.innerHTML = `
            <div class="bg-red-100 text-red-600 p-4 rounded-xl">
                Nomor pelanggan wajib diisi.
            </div>
        `;

        return;
    }

    hasil.innerHTML = `
        <div class="text-center py-20">

            <i class="fa-solid fa-spinner fa-spin text-5xl text-primary"></i>

            <p class="mt-4">
                Mengecek tagihan...
            </p>

        </div>
    `;

    setTimeout(() => {

        const data = billData[jenis][nomor];

        if (!data) {

            hasil.innerHTML = `
                <div class="bg-red-100 text-red-600 p-5 rounded-xl">
                    Data pelanggan tidak ditemukan.
                </div>
            `;

            return;

        }

        const total = data.amount + (data.penalty || 0);

        hasil.innerHTML = `

            <div class="space-y-3">

                <h2 class="text-2xl font-bold">

                    Detail Tagihan

                </h2>

                <hr>

                <p><b>Nama :</b> ${data.name}</p>

                <p><b>Periode :</b> ${data.period ?? "-"}</p>

                <p><b>Total :</b> Rp ${total.toLocaleString("id-ID")}</p>

                <p><b>Jatuh Tempo :</b> ${data.dueDate}</p>

                <hr>

                <h3 class="font-bold text-xl">

                    Metode Pembayaran

                </h3>

                <label class="flex gap-3">

                    <input type="radio" name="payment" value="va">

                    Virtual Account

                </label>

                <label class="flex gap-3">

                    <input type="radio" name="payment" value="qris">

                    QRIS

                </label>

                <label class="flex gap-3">

                    <input type="radio" name="payment" value="teller">

                    Teller / Kasir

                </label>

                <button

                    id="payNow"

                    class="w-full bg-primary text-white py-3 rounded-xl mt-6">

                    Bayar Sekarang

                </button>

            </div>

        `;

        document
            .getElementById("payNow")
            .addEventListener("click", () => {

                payBill(total);

            });

    },1000);

}

// ============================================
// PILIH METODE
// ============================================

function payBill(total){

    const metode=document.querySelector('input[name="payment"]:checked');

    if(!metode){

        alert("Silakan pilih metode pembayaran.");

        return;

    }

    switch(metode.value){

        case "va":

            showVA(total);

            break;

        case "qris":

            showQRIS(total);

            break;

        case "teller":

            showTeller(total);

            break;

    }

}

// ============================================
// VIRTUAL ACCOUNT
// ============================================

function showVA(total){

    const modal=document.getElementById("paymentModal");

    const content=document.getElementById("paymentContent");

    const nomorVA="8808"+Math.floor(Math.random()*100000000);

    content.innerHTML=`

        <h2 class="text-3xl font-bold mb-6">

            Virtual Account

        </h2>

        <div class="bg-gray-100 rounded-xl p-5">

            <p class="text-gray-500">

                Nomor Virtual Account

            </p>

            <h1 class="text-3xl font-bold">

                ${nomorVA}

            </h1>

        </div>

        <p class="mt-6 text-gray-500">

            Total Pembayaran

        </p>

        <h2 class="text-2xl font-bold">

            Rp ${total.toLocaleString("id-ID")}

        </h2>

        <button

            id="copyVA"

            class="bg-primary text-white w-full py-3 rounded-xl mt-8">

            Copy Nomor VA

        </button>

    `;

    modal.classList.remove("hidden");

    modal.classList.add("modal-show");

   document
    .getElementById("copyVA")
    .addEventListener("click", () => {

        navigator.clipboard.writeText(nomorVA);

        const trx = {

            id: "TRX" + Date.now(),
            tanggal: new Date().toLocaleString("id-ID"),
            kategori: "Tagihan",
            metode: "Virtual Account",
            nama: "Pembayaran Tagihan",
            nominal: total,
            status: "Berhasil"

        };
if (!updateDashboard(total)) {
    return;
}
        saveTransaction(trx);
updateDashboard(total);
        renderHistory();
renderPaymentChart();
        modal.classList.add("hidden");
        modal.classList.remove("modal-show");

        showReceipt(trx);

    });

}   

// ============================================
// QRIS
// ============================================

let timer;

function showQRIS(total) {

    const modal = document.getElementById("paymentModal");
    const content = document.getElementById("paymentContent");

    content.innerHTML = `

        <h2 class="text-3xl font-bold text-center mb-6">

            Pembayaran QRIS

        </h2>

        <div id="qrcode" class="flex justify-center mb-6"></div>

        <p class="text-center text-gray-500">

            Scan QR Code menggunakan aplikasi pembayaran.

        </p>

        <h2 class="text-center text-3xl font-bold mt-5">

            Rp ${total.toLocaleString("id-ID")}

        </h2>

        <p class="text-center mt-5">

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

        text: "BAYARKITA-" + Date.now(),

        width: 220,

        height: 220

    });

    startCountdown();

    document
    .getElementById("finishQRIS")
    .addEventListener("click", () => {

        clearInterval(timer);

        const trx = {

            id: "TRX" + Date.now(),

            tanggal: new Date().toLocaleString("id-ID"),

            kategori: "Tagihan",

            metode: "QRIS",

            nama: "Pembayaran Tagihan",

            nominal: total,

            status: "Berhasil"

        };
if (!updateDashboard(total)) {
    return;
}
        saveTransaction(trx);
updateDashboard(total);
        renderHistory();
renderPaymentChart();
        modal.classList.add("hidden");
        modal.classList.remove("modal-show");

        showReceipt(trx);

    });

}


// ============================================
// COUNTDOWN
// ============================================

function startCountdown() {

    clearInterval(timer);

    let waktu = 300;

    timer = setInterval(() => {

        const menit = Math.floor(waktu / 60);
        const detik = waktu % 60;

        const label = document.getElementById("countdown");

        if (label) {

            label.innerHTML =
                String(menit).padStart(2, "0") +
                ":" +
                String(detik).padStart(2, "0");

        }

        waktu--;

        if (waktu < 0) {

            clearInterval(timer);

            alert("QRIS telah kedaluwarsa.");

            document
                .getElementById("paymentModal")
                .classList.add("hidden");

        }

    }, 1000);

}


// ============================================
// TELLER
// ============================================

function showTeller(total) {

    const modal = document.getElementById("paymentModal");
    const content = document.getElementById("paymentContent");

    const kode = Math.floor(
        100000 + Math.random() * 900000
    );

    content.innerHTML = `

        <h2 class="text-3xl font-bold mb-6">

            Pembayaran Teller

        </h2>

        <div class="bg-yellow-100 rounded-xl p-5">

            <p>

                Kode Pembayaran

            </p>

            <h1 class="text-4xl font-bold">

                ${kode}

            </h1>

        </div>

        <div class="mt-6">

            <p class="font-semibold">

                Total Pembayaran

            </p>

            <h2 class="text-2xl font-bold">

                Rp ${total.toLocaleString("id-ID")}

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
    .addEventListener("click", () => {

       const trx = {

    id: "TRX" + Date.now(),

    tanggal: new Date().toLocaleString("id-ID"),

    kategori: "Tagihan",

    metode: "Teller",

    nama: "Pembayaran Tagihan",

    nominal: total,

    status: "Berhasil"

};

saveTransaction(trx);
updateDashboard(total);
renderHistory();
renderPaymentChart();
modal.classList.add("hidden");
modal.classList.remove("modal-show");

showReceipt(trx);

    });

}


// ============================================
// CLOSE MODAL
// ============================================

const close = document.getElementById("closeModal");

if (close) {

    close.addEventListener("click", () => {

        clearInterval(timer);

        const modal = document.getElementById("paymentModal");

        modal.classList.add("hidden");
        modal.classList.remove("modal-show");

    });

}