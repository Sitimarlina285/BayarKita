const billData = {

    pln: {

        "123456789012": {
            name: "Budi Santoso",
            address: "Jl. Merdeka No.12",
            period: "Juli 2026",
            amount: 245000,
            penalty: 5000,
            dueDate: "20 Juli 2026"
        },

        "234567890123": {
            name: "Siti Aminah",
            address: "Jl. Mawar No.8",
            period: "Juli 2026",
            amount: 320000,
            penalty: 0,
            dueDate: "18 Juli 2026"
        },

        "345678901234": {
            name: "Andi Saputra",
            address: "Jl. Kenanga No.20",
            period: "Juli 2026",
            amount: 198000,
            penalty: 10000,
            dueDate: "25 Juli 2026"
        },

        "456789012345": {
            name: "Rina Wulandari",
            address: "Jl. Melati No.15",
            period: "Juli 2026",
            amount: 410000,
            penalty: 0,
            dueDate: "17 Juli 2026"
        },

        "567890123456": {
            name: "Dedi Kurniawan",
            address: "Jl. Anggrek No.30",
            period: "Juli 2026",
            amount: 275000,
            penalty: 3000,
            dueDate: "22 Juli 2026"
        }

    },

        pdam: {

        "111122223333": {

            name: "Ahmad Rizki",

            address: "Perum Griya Indah",

            period: "Juli 2026",

            amount: 85000,

            penalty: 0,

            dueDate: "15 Juli 2026"

        },

        "444455556666": {

            name: "Nina Lestari",

            address: "Jl. Teratai",

            period: "Juli 2026",

            amount: 125000,

            penalty: 10000,

            dueDate: "20 Juli 2026"

        },

        "777788889999": {

            name: "Rudi Hartono",

            address: "Jl. Flamboyan",

            period: "Juli 2026",

            amount: 97000,

            penalty: 0,

            dueDate: "25 Juli 2026"

        }

    },

        internet: {

        "INET001": {

            name: "Indihome",

            package: "50 Mbps",

            amount: 345000,

            dueDate: "15 Juli 2026"

        },

        "INET002": {

            name: "Biznet",

            package: "100 Mbps",

            amount: 450000,

            dueDate: "18 Juli 2026"

        },

        "INET003": {

            name: "First Media",

            package: "75 Mbps",

            amount: 395000,

            dueDate: "21 Juli 2026"

        }

    },

        seminar: {

        "SEM001": {

            title: "Seminar AI 2026",

            participant: "Siti Marlina",

            amount: 150000

        },

        "SEM002": {

            title: "Web Development",

            participant: "Budi",

            amount: 200000

        }

    }

    };

    const sppData = {

    "221011450017": {

        name: "Siti Marlina",

        semester: "2025/2026 Genap",

        bills: [

            {
                id: 1,
                code: "986248962486431",
                desc: "Cicilan SPP 1",
                amount: 2500000,
                status: "Belum Lunas"
            },

            {
                id: 2,
                code: "986248962486432",
                desc: "Cicilan SPP 2",
                amount: 2500000,
                status: "Belum Lunas"
            },

            {
                id: 3,
                code: "986248962486433",
                desc: "UTS",
                amount: 500000,
                status: "Lunas"
            },

            {
                id: 4,
                code: "986248962486434",
                desc: "UAS",
                amount: 500000,
                status: "Belum Lunas"
            },

            {
                id: 5,
                code: "986248962486435",
                desc: "Praktikum",
                amount: 300000,
                status: "Belum Lunas"
            },

            {
                id: 6,
                code: "986248962486436",
                desc: "Laboratorium",
                amount: 200000,
                status: "Belum Lunas"
            },

            {
                id: 7,
                code: "986248962486437",
                desc: "Perpustakaan",
                amount: 150000,
                status: "Belum Lunas"
            },

            {
                id: 8,
                code: "986248962486438",
                desc: "Administrasi",
                amount: 100000,
                status: "Belum Lunas"
            }

        ]

    },

    "202310002": {

        name: "Budi Santoso",

        semester: "2025/2026 Genap",

        bills: [

            {
                id: 1,
                code: "986248962486439",
                desc: "Cicilan SPP 1",
                amount: 2500000,
                status: "Belum Lunas"
            },

            {
                id: 2,
                code: "986248962486440",
                desc: "Cicilan SPP 2",
                amount: 2500000,
                status: "Belum Lunas"
            }

        ]

    },

    "202310003": {

        name: "Andi Saputra",

        semester: "2025/2026 Genap",

        bills: [

            {
                id: 1,
                code: "986248962486441",
                desc: "Cicilan SPP 1",
                amount: 2500000,
                status: "Belum Lunas"
            },

            {
                id: 2,
                code: "986248962486442",
                desc: "Cicilan SPP 2",
                amount: 2500000,
                status: "Lunas"
            }

        ]

    }

};

const providerData = {

    telkomsel: {
        prefix: ["0811","0812","0813","0821","0822","0852","0853"]
    },

    indosat: {
        prefix: ["0814","0815","0816","0855","0856","0857","0858"]
    },

    xl: {
        prefix: ["0817","0818","0819","0859","0877","0878"]
    },

    axis: {
        prefix: ["0831","0832","0833","0838"]
    },

    tri: {
        prefix: ["0895","0896","0897","0898","0899"]
    },

    smartfren: {
        prefix: ["0881","0882","0883","0884","0885","0886","0887","0888","0889"]
    }

};

const promoData = [

    {
        title: "Cashback 50%",
        desc: "Bayar PLN dapat cashback hingga Rp50.000"
    },

    {
        title: "Gratis Admin",
        desc: "Pembayaran PDAM bebas biaya admin"
    },

    {
        title: "Pulsa Hemat",
        desc: "Isi Pulsa Rp100.000 bonus Rp10.000"
    }

];