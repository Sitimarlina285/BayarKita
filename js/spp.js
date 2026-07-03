const btnSPP = document.getElementById("searchSPP");

if (btnSPP) {

    btnSPP.addEventListener("click", searchSPP);

}

function searchSPP() {

    const nim = document.getElementById("nimInput").value.trim();

    const result = document.getElementById("sppResult");

    if (nim === "") {

        result.innerHTML = `

            <div class="text-red-500">

                NIM wajib diisi.

            </div>

        `;

        return;

    }

    const mahasiswa = sppData[nim];

    if (!mahasiswa) {

        result.innerHTML = `

            <div class="bg-red-100 text-red-600 p-5 rounded-xl">

                Data mahasiswa tidak ditemukan.

            </div>

        `;

        return;

    }

    renderSPP(mahasiswa);

}

function renderSPP(mahasiswa){

    const result=document.getElementById("sppResult");

    let html=`

    <h2 class="text-2xl font-bold">

        ${mahasiswa.name}

    </h2>

    <p class="text-gray-500 mb-6">

        Semester : ${mahasiswa.semester}

    </p>

    <table class="w-full">

        <thead>

            <tr>

                <th></th>

                <th>Tagihan</th>

                <th>Jumlah</th>

                <th>Status</th>

            </tr>

        </thead>

        <tbody>

    `;

    mahasiswa.bills.forEach(item=>{

        html+=`

        <tr class="border-b">

            <td>

                <input
                    class="billCheck"

                    data-amount="${item.amount}"

                    type="checkbox">

            </td>

            <td>

                ${item.desc}

            </td>

            <td>

                Rp ${item.amount.toLocaleString("id-ID")}

            </td>

            <td>

                ${item.status}

            </td>

        </tr>

        `;

    });

    html+=`

        </tbody>

    </table>

    <h2 class="text-2xl font-bold mt-8">

        Total :

        <span id="totalSPP">

            Rp0

        </span>

    </h2>

    <button

    id="paySPP"

    class="bg-primary text-white w-full py-3 rounded-xl mt-6">

    Bayar SPP

    </button>

    `;

    result.innerHTML=html;

    calculateSPP();
    document
    .getElementById("paySPP")
    .addEventListener("click", paySPP);

}

function paySPP(){

    const checks=document.querySelectorAll(".billCheck:checked");

    if(checks.length===0){

        alert("Pilih minimal satu tagihan.");

        return;

    }

    let total=0;

    checks.forEach(item=>{

        total+=Number(item.dataset.amount);

    });

    showSPPPayment(total);

}

function showSPPPayment(total){

    const modal=document.getElementById("paymentModal");

    const content=document.getElementById("paymentContent");

    content.innerHTML=`

        <h2 class="text-3xl font-bold mb-6">

            Pembayaran SPP

        </h2>

        <p>

            Total Tagihan

        </p>

        <h1 class="text-4xl font-bold mt-3">

            Rp ${total.toLocaleString("id-ID")}

        </h1>

        <div class="space-y-3 mt-8">

            <label>

                <input
                type="radio"
                name="sppPayment"
                value="Virtual Account">

                Virtual Account

            </label>

            <br>

            <label>

                <input
                type="radio"
                name="sppPayment"
                value="QRIS">

                QRIS

            </label>

            <br>

            <label>

                <input
                type="radio"
                name="sppPayment"
                value="Teller">

                Teller

            </label>

        </div>

        <button

        id="confirmSPP"

        class="bg-primary text-white w-full py-3 rounded-xl mt-8">

        Bayar Sekarang

        </button>

    `;

    modal.classList.remove("hidden");

    modal.classList.add("modal-show");

    document
        .getElementById("confirmSPP")
        .addEventListener("click",()=>{

            finishSPP(total);

        });

}

function finishSPP(total) {

    const metode = document.querySelector('input[name="sppPayment"]:checked');

    if (!metode) {

        alert("Pilih metode pembayaran.");
        return;

    }

    // Data transaksi
    const trx = {

        id: "TRX" + Date.now(),

        tanggal: new Date().toLocaleString("id-ID"),

        kategori: "SPP",

        metode: metode.value,

        nama: "Pembayaran SPP",

        nominal: total,

        status: "Berhasil"

    };

    if (!updateDashboard(nominal)) {

    return;

}
if (!updateDashboard(total)) {
    return;
}
    saveTransaction(trx);
updateDashboard(total);
    // Update tabel riwayat
    renderHistory();
renderPaymentChart();
    // Reset checkbox
    document.querySelectorAll(".billCheck").forEach(item => {
        item.checked = false;
    });

    // Reset total
    document.getElementById("totalSPP").innerHTML = "Rp 0";

    // Tutup modal pembayaran
    const modal = document.getElementById("paymentModal");

    modal.classList.add("hidden");
    modal.classList.remove("modal-show");

    // Tampilkan struk pembayaran
    showReceipt(trx);

   
}

function calculateSPP(){

    const checks=document.querySelectorAll(".billCheck");

    checks.forEach(check=>{

        check.addEventListener("change",()=>{

            let total=0;

            checks.forEach(item=>{

                if(item.checked){

                    total+=Number(item.dataset.amount);

                }

            });

            document.getElementById("totalSPP").innerHTML=

            "Rp "+total.toLocaleString("id-ID");

        });

    });

}