const SearchManager = {

    currentQuery: "",

    init() {

        console.log("[SearchManager] Initialized");

        const searchInput =
            document.getElementById(
                "gameSearch"
            );

        if(!searchInput) return;

        searchInput.addEventListener(
            "input",
            (event) => {

                this.currentQuery =
                    event.target.value
                        .trim()
                        .toLowerCase();

                this.filterGames();

            }
        );

    },

    filterGames() {

        const container =
            document.getElementById(
                "gamesGrid"
            );

        if(!container) return;

        container.innerHTML = "";

        const filteredGames =
            GameManager.games.filter(
                game => {

                    return game.title
                        .toLowerCase()
                        .includes(
                            this.currentQuery
                        );

                }
            );

        filteredGames.forEach(
            game => {

                container.appendChild(
                    GameManager.createGameCard(
                        game
                    )
                );

            }
        );

    }

};