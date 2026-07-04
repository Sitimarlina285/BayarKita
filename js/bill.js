// ======================================
// BILL.JS
// ======================================

const btn = document.getElementById("checkBillBtn");

if (btn) {

    btn.addEventListener("click", checkBill);

}

// ======================================
// CEK TAGIHAN
// ======================================

function checkBill() {

    const jenis = document.getElementById("billType").value;

    const nomor = document.getElementById("customerNumber").value.trim();

    const hasil = document.getElementById("billResult");

    if (nomor === "") {

        hasil.innerHTML = `
            <div class="bg-red-100 text-red-600 p-5 rounded-xl">
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

// ======================================
// BAYAR TAGIHAN
// ======================================

function payBill(total){

    const modal = document.getElementById("paymentModal");

    const content = document.getElementById("paymentContent");

    content.innerHTML = `

        <h2 class="text-3xl font-bold mb-6">

            Pilih Metode Pembayaran

        </h2>

        <div class="space-y-3">

            <label>

                <input
                    type="radio"
                    name="billPayment"
                    value="Virtual Account">

                Virtual Account

            </label>

            <br>

            <label>

                <input
                    type="radio"
                    name="billPayment"
                    value="QRIS">

                QRIS

            </label>

            <br>

            <label>

                <input
                    type="radio"
                    name="billPayment"
                    value="Teller">

                Teller

            </label>

        </div>

        <button

            id="confirmBill"

            class="bg-primary text-white w-full py-3 rounded-xl mt-8">

            Lanjutkan

        </button>

    `;

    modal.classList.remove("hidden");

    modal.classList.add("modal-show");

    document
        .getElementById("confirmBill")
        .onclick = function(){

            const metode = document.querySelector(
                'input[name="billPayment"]:checked'
            );

            if(!metode){

                alert("Pilih metode pembayaran.");

                return;

            }

            const trx = {

                id:"TRX"+Date.now(),

                tanggal:new Date().toLocaleString("id-ID"),

                kategori:"Tagihan",

                metode:metode.value,

                nama:"Pembayaran Tagihan",

                nominal:total,

                status:"Berhasil"

            };

            switch(metode.value){

                case "Virtual Account":

                    showVA(trx);

                    break;

                case "QRIS":

                    showQRIS(trx);

                    break;

                case "Teller":

                    showTeller(trx);

                    break;

            }

        };

}