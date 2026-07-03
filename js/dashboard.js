const DASHBOARD_KEY = "bayarkita_dashboard";

// ===============================
// GET DASHBOARD
// ===============================

function getDashboard() {

    let dashboard = JSON.parse(localStorage.getItem(DASHBOARD_KEY));

    if (!dashboard) {

        dashboard = {

            saldo: 2500000,
            transaksi: 0,
            pengeluaran: 0

        };

        localStorage.setItem(
            DASHBOARD_KEY,
            JSON.stringify(dashboard)
        );

    }

    return dashboard;

}

// ===============================
// SAVE DASHBOARD
// ===============================

function saveDashboard(data) {

    localStorage.setItem(
        DASHBOARD_KEY,
        JSON.stringify(data)
    );

}

// ===============================
// UPDATE DASHBOARD
// ===============================

function updateDashboard(nominal) {

    const dashboard = getDashboard();

    if (dashboard.saldo < nominal) {

        alert("❌ Saldo simulasi Anda tidak mencukupi.");

        return false;

    }

    dashboard.saldo -= nominal;

    dashboard.transaksi++;

    dashboard.pengeluaran += nominal;

    saveDashboard(dashboard);

    renderDashboard();

    return true;

}

// ===============================
// RENDER DASHBOARD
// ===============================

function renderDashboard() {

    const dashboard = getDashboard();

    document.getElementById("saldoValue").innerHTML =
        "Rp " + dashboard.saldo.toLocaleString("id-ID");

    document.getElementById("transaksiValue").innerHTML =
        dashboard.transaksi;

    document.getElementById("pengeluaranValue").innerHTML =
        "Rp " + dashboard.pengeluaran.toLocaleString("id-ID");

    renderPaymentChart();

}

// ===============================
// PIE CHART
// ===============================

let paymentChart;

function renderPaymentChart() {

    const transaksi = getTransactions();

    let va = 0;
    let qris = 0;
    let teller = 0;

    transaksi.forEach(item => {

        if (item.metode === "Virtual Account") {

            va++;

        } else if (item.metode === "QRIS") {

            qris++;

        } else if (item.metode === "Teller") {

            teller++;

        }

    });

    const ctx = document.getElementById("paymentChart");

    if (!ctx) return;

    if (paymentChart) {

        paymentChart.destroy();

    }

    paymentChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [

                "Virtual Account",

                "QRIS",

                "Teller"

            ],

            datasets: [{

                data: [

                    va,
                    qris,
                    teller

                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

// ===============================
// RESET DASHBOARD
// ===============================

function resetDashboard() {

    const dashboard = {

        saldo: 2500000,
        transaksi: 0,
        pengeluaran: 0

    };

    saveDashboard(dashboard);

    renderDashboard();

}

// ===============================
// CLOSE MODAL
// ===============================

function closeModal() {

    const modal = document.getElementById("paymentModal");

    modal.classList.add("hidden");

    modal.classList.remove("modal-show");

}

// ===============================
// TOP UP BUTTON
// ===============================

const topupBtn = document.getElementById("topupBtn");

if (topupBtn) {

    topupBtn.addEventListener("click", showTopup);

}

// ===============================
// SHOW TOP UP
// ===============================

function showTopup() {

    const modal = document.getElementById("paymentModal");

    const content = document.getElementById("paymentContent");

    content.innerHTML = `

        <h2 class="text-3xl font-bold mb-6">

            Top Up Saldo

        </h2>

        <input

            id="topupAmount"

            type="number"

            placeholder="Masukkan nominal"

            class="w-full border rounded-xl p-3"

        >

        <button

            id="confirmTopup"

            class="bg-primary text-white w-full py-3 rounded-xl mt-6"

        >

            Top Up

        </button>

    `;

    modal.classList.remove("hidden");

    modal.classList.add("modal-show");

    document.getElementById("topupAmount").focus();

    document
        .getElementById("confirmTopup")
        .addEventListener("click", topupSaldo);

}

// ===============================
// TOP UP SALDO
// ===============================

function topupSaldo() {

    const nominal = Number(
        document.getElementById("topupAmount").value
    );

    if (nominal <= 0) {

        alert("Masukkan nominal yang benar.");

        return;

    }

    const dashboard = getDashboard();

    dashboard.saldo += nominal;

    saveDashboard(dashboard);

    renderDashboard();

    closeModal();

    document
        .querySelector('[data-page="dashboard"]')
        .click();

    alert("✅ Top Up berhasil.");

}