const ApiManager = {

    apiUrl: null,

    init() {

        this.apiUrl = CONFIG.API.BASE_URL;

        console.log(
            "[ApiManager] Initialisiert"
        );

    },

    async get(endpoint) {

        try {

            const response = await fetch(

                `${this.apiUrl}${endpoint}`,

                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

            );

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }

            return await response.json();

        } catch (error) {

            console.error(
                "[ApiManager] GET Fehler:",
                error
            );

            return null;

        }

    },

    async post(endpoint, data = {}) {

        try {

            const response = await fetch(

                `${this.apiUrl}${endpoint}`,

                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }

            );

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }

            return await response.json();

        } catch (error) {

            console.error(
                "[ApiManager] POST Fehler:",
                error
            );

            return null;

        }

    },

    async getGames() {

        return await this.get(
            "/games"
        );

    },

    async getGame(gameId) {

        return await this.get(
            `/games/${gameId}`
        );

    },

    async login(email, password) {

        return await this.post(
            "/login",
            {
                email,
                password
            }
        );

    },

    async register(userData) {

        return await this.post(
            "/register",
            userData
        );

    },

    async syncUserData(userData) {

        return await this.post(
            "/sync",
            userData
        );

    }

};