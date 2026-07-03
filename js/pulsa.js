const btnPulsa = document.getElementById("previewPulsa");

if (btnPulsa) {

    btnPulsa.addEventListener("click", previewPulsa);

}

function previewPulsa() {

    const provider = document.getElementById("provider").value;

    const phone = document.getElementById("phoneNumber").value.trim();

    const nominal = Number(document.getElementById("pulsaAmount").value);

    const result = document.getElementById("pulsaResult");

    if (!/^08[0-9]{8,11}$/.test(phone)) {

        result.innerHTML = `
            <div class="bg-red-100 text-red-600 p-5 rounded-xl">

                Nomor HP tidak valid.

            </div>
        `;

        return;

    }

    result.innerHTML = `

        <h2 class="text-2xl font-bold mb-6">

            Preview Pembelian

        </h2>

        <p><b>Provider :</b> ${provider}</p>

        <p><b>Nomor HP :</b> ${phone}</p>

        <p><b>Nominal :</b> Rp ${nominal.toLocaleString("id-ID")}</p>

        <button

            id="payPulsa"

            class="bg-primary text-white w-full py-3 rounded-xl mt-8">

            Bayar Sekarang

        </button>

    `;

    document
        .getElementById("payPulsa")
        .addEventListener("click", () => {

            payPulsa(provider, phone, nominal);

        });

}

function payPulsa(provider, phone, nominal){

    const modal=document.getElementById("paymentModal");

    const content=document.getElementById("paymentContent");

    content.innerHTML=`

        <h2 class="text-3xl font-bold mb-6">

            Pembayaran Pulsa

        </h2>

        <p>

            Provider : ${provider}

        </p>

        <p>

            Nomor : ${phone}

        </p>

        <h1 class="text-3xl font-bold mt-6">

            Rp ${nominal.toLocaleString("id-ID")}

        </h1>

        <div class="space-y-3 mt-8">

            <label>

                <input
                type="radio"
                name="pulsaPayment"
                value="Virtual Account">

                Virtual Account

            </label>

            <br>

            <label>

                <input
                type="radio"
                name="pulsaPayment"
                value="QRIS">

                QRIS

            </label>

            <br>

            <label>

                <input
                type="radio"
                name="pulsaPayment"
                value="Teller">

                Teller

            </label>

        </div>

        <button

        id="finishPulsa"

        class="bg-primary text-white w-full py-3 rounded-xl mt-8">

        Bayar

        </button>

    `;

    modal.classList.remove("hidden");

    modal.classList.add("modal-show");

    document
        .getElementById("finishPulsa")
        .addEventListener("click",()=>{

            finishPulsa(nominal);

        });

}

function finishPulsa(nominal) {

    const metode = document.querySelector(
        'input[name="pulsaPayment"]:checked'
    );

    if (!metode) {

        alert("Pilih metode pembayaran.");

        return;

    }

    // Cek saldo
    if (!updateDashboard(nominal)) {

        return;

    }

    // Data transaksi
    const trx = {

        id: "TRX" + Date.now(),

        tanggal: new Date().toLocaleString("id-ID"),

        kategori: "Pulsa",

        metode: metode.value,

        nama: "Isi Pulsa",

        nominal: nominal,

        status: "Berhasil"

    };

    // Simpan transaksi
    saveTransaction(trx);

    // Refresh tampilan
    renderDashboard();
    renderHistory();
    renderPaymentChart();

    // Tutup modal pembayaran
    const modal = document.getElementById("paymentModal");

    modal.classList.add("hidden");
    modal.classList.remove("modal-show");

    // Tampilkan struk
    showReceipt(trx);

}