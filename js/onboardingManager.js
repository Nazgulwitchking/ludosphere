/*
=========================================================
LUDOSPHERE ONBOARDING MANAGER
=========================================================
*/

const OnboardingManager = {

    currentStep: 0,

    steps: [

        "welcome-step",
        "group-step",
        "gender-step",
        "language-step"

    ],

    selectedGroup: null,

    selectedGender: null,

    selectedLanguage: null,



    /*
    =========================================================
    INIT
    =========================================================
    */

    init() {

        if (
            StorageManager.isOnboardingDone()
        ) {

            this.showApp();

            return;

        }

        this.setupSelections();

        this.setupButtons();

        this.showOnboarding();

        console.log(
            "[OnboardingManager] Initialized"
        );

    },



    /*
    =========================================================
    SHOW ONBOARDING
    =========================================================
    */

    showOnboarding() {

        const landing =
            document.getElementById(
                "landing-page"
            );

        const onboarding =
            document.getElementById(
                "onboarding"
            );

        if (landing)
            landing.style.display =
                "none";

        if (onboarding)
            onboarding.style.display =
                "block";

        this.showStep(0);

    },



    /*
    =========================================================
    SHOW STEP
    =========================================================
    */

    showStep(index) {

        this.steps.forEach(stepId => {

            const element =
                document.getElementById(
                    stepId
                );

            if (element) {

                element.style.display =
                    "none";

            }

        });

        const current =
            document.getElementById(
                this.steps[index]
            );

        if (current) {

            current.style.display =
                "block";

        }

        this.currentStep =
            index;

    },



    /*
    =========================================================
    NEXT STEP
    =========================================================
    */

    nextStep() {

        const next =
            this.currentStep + 1;

        if (
            next >= this.steps.length
        ) {

            return;

        }

        this.showStep(next);

    },



    /*
    =========================================================
    BUTTONS
    =========================================================
    */

    setupButtons() {

        document
            .querySelectorAll(
                ".next-step"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.nextStep();

                    }
                );

            });

        const finishButton =
            document.getElementById(
                "finishOnboarding"
            );

        if (finishButton) {

            finishButton.addEventListener(
                "click",
                () => {

                    this.finish();

                }
            );

        }

    },



    /*
    =========================================================
    SELECTIONS
    =========================================================
    */

    setupSelections() {

        document
            .querySelectorAll(
                "#group-step .select-option"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.selectedGroup =
                            button.dataset.value;

                        StorageManager.setPlayGroup(
                            this.selectedGroup
                        );

                    }
                );

            });



        document
            .querySelectorAll(
                "#gender-step .select-option"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.selectedGender =
                            button.dataset.value;

                        StorageManager.setGender(
                            this.selectedGender
                        );

                    }
                );

            });



        document
            .querySelectorAll(
                "[data-lang]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    async () => {

                        this.selectedLanguage =
                            button.dataset.lang;

                        await LanguageManager.changeLanguage(
                            this.selectedLanguage
                        );

                    }
                );

            });

    },



    /*
    =========================================================
    FINISH
    =========================================================
    */

    finish() {

        StorageManager.setOnboardingDone(
            true
        );

        this.showApp();

    },



    /*
    =========================================================
    SHOW APP
    =========================================================
    */

    showApp() {

        const landing =
            document.getElementById(
                "landing-page"
            );

        const onboarding =
            document.getElementById(
                "onboarding"
            );

        const app =
            document.getElementById(
                "app"
            );

        if (landing)
            landing.style.display =
                "none";

        if (onboarding)
            onboarding.style.display =
                "none";

        if (app)
            app.style.display =
                "block";

    }

};