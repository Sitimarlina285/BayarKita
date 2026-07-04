const SPP_KEY = "bayarkita_spp";

function getSPPData() {

    let data = JSON.parse(localStorage.getItem(SPP_KEY));

    if (!data) {

        data = structuredClone(sppData);

        localStorage.setItem(
            SPP_KEY,
            JSON.stringify(data)
        );

    }

    return data;

}

function saveSPPData(data) {

    localStorage.setItem(
        SPP_KEY,
        JSON.stringify(data)
    );

}

function resetSPPData() {

    localStorage.removeItem(SPP_KEY);

}