const toggle = document.getElementById("themeToggle");

if (toggle) {

    // Cek tema sebelumnya
    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        toggle.innerHTML = "☀️ Light Mode";

    }

    toggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            toggle.innerHTML = "☀️ Light Mode";

        } else {

            localStorage.setItem("theme", "light");

            toggle.innerHTML = "🌙 Dark Mode";

        }

    });

}