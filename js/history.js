// ======================================
// HISTORY.JS
// ======================================

function renderHistory() {

    const table = document.getElementById("historyTable");

    if (!table) return;

    const transactions = getTransactions();

    if (transactions.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    class="text-center py-8 text-gray-500">

                    Belum ada transaksi.

                </td>

            </tr>

        `;

        return;

    }

    table.innerHTML = "";

    transactions.forEach(item => {

        table.innerHTML += `

            <tr class="border-b hover:bg-gray-50">

                <td class="py-3">

                    ${item.tanggal}

                </td>

                <td>

                    ${item.kategori}

                </td>

                <td>

                    ${item.metode}

                </td>

                <td>

                    ${item.nama}

                </td>

                <td>

                    Rp ${item.nominal.toLocaleString("id-ID")}

                </td>

                <td>

                    <span class="text-green-600 font-semibold">

                        ${item.status}

                    </span>

                </td>

            </tr>

        `;

    });

}

const clearBtn = document.getElementById("clearHistory");

if (clearBtn) {

    clearBtn.addEventListener("click", clearHistory);

}

function clearHistory() {

    if (!confirm("Yakin ingin menghapus semua riwayat transaksi?")) {

        return;

    }

    clearTransactions();

    resetDashboard();

    renderHistory();

    renderPaymentChart();

    alert("Riwayat transaksi berhasil dihapus.");

}