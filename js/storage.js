const STORAGE_KEY = "bayarkita_transactions";

function getTransactions() {

    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

}

function saveTransaction(transaction) {

    const transactions = getTransactions();

    transactions.unshift(transaction);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );

}

function clearTransactions() {

    localStorage.removeItem(STORAGE_KEY);

}