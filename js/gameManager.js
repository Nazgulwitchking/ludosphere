const GameManager = {

    games: [],

    myGames: [],

    async init() {

        console.log("[GameManager] Initialized");

        this.loadMyGames();

        await this.loadGames();

        this.renderLibrary();

        this.renderMyGames();

    },

    async loadGames() {

        try {

            /*
             * Später:
             * fetch(API_URL + "/games")
             */

            this.games = [

                {
                    id: "impostor",
                    title: "Findet den Impostor",
                    category: "party",
                    image: "assets/images/impostor.webp"
                },

                {
                    id: "truth_or_dare",
                    title: "Wahrheit oder Pflicht",
                    category: "party",
                    image: "assets/images/wahrheit.webp"
                },

                {
                    id: "charade",
                    title: "Wer bin ich",
                    category: "party",
                    image: "assets/images/charade.webp"
                }

            ];

        }

        catch(error) {

            console.error(error);

        }

    },

    renderLibrary() {

        const container =
            document.getElementById("gamesGrid");

        if(!container) return;

        container.innerHTML = "";

        this.games.forEach(game => {

            container.appendChild(
                this.createGameCard(game)
            );

        });

    },

    renderMyGames() {

        const container =
            document.getElementById("myGamesGrid");

        if(!container) return;

        container.innerHTML = "";

        this.myGames.forEach(id => {

            const game =
                this.games.find(
                    g => g.id === id
                );

            if(game) {

                container.appendChild(
                    this.createGameCard(game)
                );

            }

        });

    },

    createGameCard(game) {

        const card =
            document.createElement("div");

        card.className = "game-card";

        card.innerHTML = `

            <div class="game-image">

                <img
                    src="${game.image}"
                    alt="${game.title}"
                >

            </div>

            <div class="game-title">

                ${game.title}

            </div>

            <button
                class="favorite-btn"
                data-game="${game.id}"
            >

                ★

            </button>

        `;

        const favBtn =
            card.querySelector(".favorite-btn");

        favBtn.addEventListener(
            "click",
            () => {

                this.toggleFavorite(
                    game.id
                );

            }
        );

        return card;

    },

    toggleFavorite(gameId) {

        const index =
            this.myGames.indexOf(gameId);

        if(index > -1) {

            this.myGames.splice(
                index,
                1
            );

        }

        else {

            this.myGames.push(
                gameId
            );

        }

        this.saveMyGames();

        this.renderMyGames();

    },

    saveMyGames() {

        StorageManager.set(
            "myGames",
            this.myGames
        );

    },

    loadMyGames() {

        this.myGames =
            StorageManager.get(
                "myGames",
                []
            );

    },

    getGameById(id) {

        return this.games.find(
            game => game.id === id
        );

    }

};