document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("siteHeader");
    const nav = document.getElementById("siteNav");
    const menuButton = document.getElementById("menuToggle");

    const navLinks = Array.from(
        document.querySelectorAll(".site-nav a")
    );

    const sections = Array.from(
        document.querySelectorAll("main section")
    );


    /* =========================================
       SHOW NAVIGATION AFTER HOME
    ========================================= */

    function updateHeader() {

        if (!header) return;

        const about = document.getElementById("about");

        if (!about) return;

        const aboutTop = about.offsetTop;

        if (window.scrollY >= aboutTop - 100) {
            header.classList.add("visible");
        } else {
            header.classList.remove("visible");
        }
    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateHeader
    );

    updateHeader();


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuButton && nav) {

        menuButton.addEventListener("click", function () {

            const open =
                nav.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

        });

    }


    /* =========================================
       CLOSE MOBILE MENU
    ========================================= */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (nav) {
                nav.classList.remove("open");
            }

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =========================================
       SMOOTH NAVIGATION
    ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener("click", function (event) {

                const id =
                    link.getAttribute("href");

                if (!id || id === "#") {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();


                /* Home goes completely to the top */

                if (id === "#home") {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                    return;
                }


                /*
                   Get the exact position of the section.
                   The 76px is the fixed navigation height.
                */

                const headerHeight =
                    header ? header.offsetHeight : 76;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({
                    top: Math.max(0, position),
                    behavior: "smooth"
                });


                history.replaceState(
                    null,
                    "",
                    id
                );

            });

        });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    function setActive(id) {

        navLinks.forEach(function (link) {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
            );

        });

    }


    /* =========================================
       SECTION OBSERVER
    ========================================= */

    if (sections.length) {

        const observer =
            new IntersectionObserver(

                function (entries) {

                    let bestSection = null;
                    let bestRatio = 0;

                    entries.forEach(function (entry) {

                        if (
                            entry.isIntersecting &&
                            entry.intersectionRatio > bestRatio
                        ) {

                            bestRatio =
                                entry.intersectionRatio;

                            bestSection =
                                entry.target;

                        }

                    });

                    if (bestSection) {
                        setActive(bestSection.id);
                    }

                },

                {
                    rootMargin:
                        "-20% 0px -65% 0px",

                    threshold: [
                        0.05,
                        0.15,
                        0.30,
                        0.50
                    ]
                }

            );


        sections.forEach(function (section) {
            observer.observe(section);
        });

    }


    /* =========================================
       ESCAPE CLOSES MENU
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (nav) {
                    nav.classList.remove("open");
                }

                if (menuButton) {
                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            }

        }
    );

});
/* =========================================================
   REMOVE FOCUS FROM INVISIBLE COVER HOTSPOTS
   ========================================================= */

document.querySelectorAll(".cover-hotspots .hotspot").forEach(function (link) {

    link.addEventListener("focus", function () {
        this.blur();
    });

});