document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       MOBILE MENU
    =============================== */

    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");

    if (menuToggle && siteNav) {

        menuToggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

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


        /* Close menu when a navigation link is clicked */

        const mobileLinks = siteNav.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

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


        /* Close menu when clicking outside */

        document.addEventListener("click", function (e) {

            if (
                siteNav.classList.contains("open") &&
                !siteNav.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {

                siteNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        });

    }


    /* ===============================
       SMOOTH NAVIGATION
    =============================== */

    const navLinks = document.querySelectorAll(
        ".site-nav a[href^='#']"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (e) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ===============================
       LOGO → HOME
    =============================== */

    const logo = document.querySelector(".site-header .logo");

    if (logo) {

        logo.addEventListener("click", function (e) {

            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});
