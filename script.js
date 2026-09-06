document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");
    const siteHeader = document.getElementById("siteHeader");

    /* =========================
       MOBILE MENU
    ========================= */

    if (menuToggle && siteNav) {

        menuToggle.addEventListener("click", function () {

            siteNav.classList.toggle("open");

            const isOpen = siteNav.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });


        /* Close menu after clicking a navigation link */

        siteNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                siteNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            });

        });

    }


    /* =========================
       SMOOTH NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll(".site-nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                siteHeader ? siteHeader.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("main section");

    function updateActiveNavigation() {

        let currentSection = "home";

        const scrollPosition =
            window.scrollY +
            (siteHeader ? siteHeader.offsetHeight : 0) +
            100;

        sections.forEach(function (section) {

            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition <
                    section.offsetTop + section.offsetHeight
            ) {

                currentSection = section.id;

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =========================
       LOGO → HOME
    ========================= */

    const logo = document.querySelector(".site-header .logo");

    if (logo) {

        logo.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});
