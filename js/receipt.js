function showReceipt(data){

    const modal=document.getElementById("receiptModal");

    const content=document.getElementById("receiptContent");

    content.innerHTML=`

        <div id="printArea">

            <h2 class="text-3xl font-bold text-center">

                Bukti Pembayaran

            </h2>

            <hr class="my-6">

            <p>

                <b>No Transaksi</b>

                <br>

                ${data.id}

            </p>

            <br>

            <p>

                <b>Tanggal</b>

                <br>

                ${data.tanggal}

            </p>

            <br>

            <p>

                <b>Kategori</b>

                <br>

                ${data.kategori}

            </p>

            <br>

            <p>

                <b>Metode</b>

                <br>

                ${data.metode}

            </p>

            <br>

            <p>

                <b>Total</b>

                <br>

                Rp ${data.nominal.toLocaleString("id-ID")}

            </p>

            <br>

            <p>

                <b>Status</b>

                <br>

                <span class="text-green-600">

                    Berhasil

                </span>

            </p>

        </div>

        <div class="grid grid-cols-3 gap-4 mt-8">

            <button
                id="printReceipt"
                class="bg-primary text-white py-3 rounded-xl">

                Print

            </button>

            <button
                id="pdfReceipt"
                class="bg-blue-500 text-white py-3 rounded-xl">

                PDF

            </button>

            <button
                id="closeReceipt"
                class="bg-gray-300 py-3 rounded-xl">

                Tutup

            </button>

        </div>

    `;

    modal.classList.remove("hidden");

   document
    .getElementById("closeReceipt")
    .onclick = function () {

        modal.classList.add("hidden");

        content.innerHTML = "";

        document
            .querySelector('[data-page="dashboard"]')
            .click();

    };

    document
        .getElementById("printReceipt")
        .onclick=function(){

            const isi = document.getElementById("printArea").innerHTML;

const win = window.open("", "_blank");

win.document.write(isi);

win.print();

win.close();

        };

    document
        .getElementById("pdfReceipt")
        .onclick=function(){

            const { jsPDF } = window.jspdf;

            const pdf=new jsPDF();

            pdf.setFontSize(18);

            pdf.text("Bukti Pembayaran",20,20);

            pdf.setFontSize(12);

            pdf.text("No : "+data.id,20,40);

            pdf.text("Tanggal : "+data.tanggal,20,50);

            pdf.text("Kategori : "+data.kategori,20,60);

            pdf.text("Metode : "+data.metode,20,70);

            pdf.text("Nominal : Rp "+data.nominal.toLocaleString("id-ID"),20,80);

            pdf.save("BuktiPembayaran.pdf");

        };

}