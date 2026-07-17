/*
=========================================================
LUDOSPHERE NAVIGATION MANAGER
=========================================================
*/

const NavigationManager = {

    currentPage: "library",



    /*
    =========================================================
    INIT
    =========================================================
    */

    init() {

        this.setupNavigation();

        this.showPage(
            "library"
        );

        console.log(
            "[NavigationManager] Initialized"
        );

    },



    /*
    =========================================================
    BUTTON EVENTS
    =========================================================
    */

    setupNavigation() {

        const libraryBtn =
            document.getElementById(
                "libraryTab"
            );

        const myGamesBtn =
            document.getElementById(
                "myGamesTab"
            );



        if (libraryBtn) {

            libraryBtn.addEventListener(
                "click",
                () => {

                    this.showPage(
                        "library"
                    );

                }
            );

        }



        if (myGamesBtn) {

            myGamesBtn.addEventListener(
                "click",
                () => {

                    this.showPage(
                        "myGames"
                    );

                }
            );

        }

    },



    /*
    =========================================================
    SHOW PAGE
    =========================================================
    */

    showPage(pageName) {

        const libraryPage =
            document.getElementById(
                "libraryPage"
            );

        const myGamesPage =
            document.getElementById(
                "myGamesPage"
            );



        const libraryBtn =
            document.getElementById(
                "libraryTab"
            );

        const myGamesBtn =
            document.getElementById(
                "myGamesTab"
            );



        if (
            pageName === "library"
        ) {

            libraryPage?.classList.add(
                "active-page"
            );

            myGamesPage?.classList.remove(
                "active-page"
            );

            libraryBtn?.classList.add(
                "active"
            );

            myGamesBtn?.classList.remove(
                "active"
            );

        }



        if (
            pageName === "myGames"
        ) {

            myGamesPage?.classList.add(
                "active-page"
            );

            libraryPage?.classList.remove(
                "active-page"
            );

            myGamesBtn?.classList.add(
                "active"
            );

            libraryBtn?.classList.remove(
                "active"
            );

        }



        this.currentPage =
            pageName;

    },



    /*
    =========================================================
    GET PAGE
    =========================================================
    */

    getCurrentPage() {

        return this.currentPage;

    }

};