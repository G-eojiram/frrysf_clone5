<template>
    <RouterView />
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

#app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --tw-text-opacity: 1;
    color: #3d3d3d;
}

.bgorange {
    --tw-bg-opacity: 1;
    background-color: #f7b34c;
}

.bgdarkorange {
    --tw-bg-opacity: 1;
    background-color: #e0a142;
}

.hover\:bg-darkorange:hover {
    --tw-bg-opacity: 1;
    background-color: #da9c3fce;
}

.hover\:bg-lightorange:hover {
    --tw-text-opacity: 1;
    background-color: #ffbc58;
}

.hover\:text-lightorange:hover {
    --tw-text-opacity: 1;
    color: #e8a643;
}


.hover\:border-teal:hover {
    --tw-border-opacity: 1;
    border-color: #43abab;
}

.border-teal {
    --tw-border-opacity: 1;
    border-color: #43abab;
}

.bgteal {
    --tw-bg-opacity: 1;
    background-color: #5AC3C3;
}

.hover\:bg-lightteal:hover {
    --tw-bg-opacity: 1;
    background-color: #62dbdb;
}

/* media */
@media (max-width: 1585px) {
    #imgsize {
        width: 18rem;
        height: 15rem;
    }
}


/* myshelter screen */
@media (min-width: 1024px) and (max-width: 1213px) {
    #myshelter {
        flex-direction: column;
    }

    #detailcard {
        width: 100%;
    }

    #newsfeed {
        width: 100%;
    }
}

@media (min-width: 954px) and (max-width: 1024px) {
    #myshelter {
        flex-direction: row;
    }

    #detailcard {
        width: 40%;
    }

    #newsfeed {
        width: 60%;
    }
}

@media (min-width: 768px) and (max-width: 954px) {
    #myshelter {
        flex-direction: column;
    }

    #detailcard {
        width: 100%;
    }

    #newsfeed {
        width: 100%;
    }
}
/* end of myshelter screen styles*/

/* animal profile styles */
@media (min-width: 2300px) and (max-width: 9468px) {
    #profile-columns {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
}

@media (min-width: 1933px) and (max-width: 2300px) {
    #profile-columns {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
}

@media (min-width: 1597px) and (max-width: 1933px) {
    #profile-columns {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
}

@media (min-width: 1367px) and (max-width: 1597px) {
    #profile-columns {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

@media (max-width: 1367px) {
    #profile-columns {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 1211px) {
    #profile-columns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 1023px) {
    #profile-columns {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 845px) {
    #profile-columns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 616px) {
    #profile-columns {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

/* end of animal profile styles */

/* landing page FurrySafe text */
@media (min-width: 632px) and (max-width: 768px) {
    #logotext {
        display: flex;
    }
}

@media (max-width: 764px) {
    #logotext {
        display: none;
    }
}

@media (max-width: 639px) {
    #logotext {
        display: flex;
    }
}

/* end of landing page FurrySafe text style */

/* forms styles */

@media (max-width: 1436px) {

    #shelterform {
        margin-left: 5rem;
        margin-right: 5rem;
    }

    #rehomed {
        grid-column: span 2 / span 2;
    }

    #gender {
        grid-column: span 2 / span 2;
    }

    #lvl {
        grid-column: span 3 / span 3;
    }
}


@media (max-width: 1024px) {
    #shelterform {
        margin-left: 2rem;
        margin-right: 2rem;
    }
}

@media (max-width: 1023px) {
    #rehomed {
        grid-column: span 2 / span 2;
    }

    #gender {
        grid-column: span 2 / span 2;
    }

    #lvl {
        grid-column: span 3 / span 3;
    }

    #breed {
        grid-column: span 2 / span 2;
    }

    #anitype {
        grid-column: span 2 / span 2;
    }
}

@media (max-width: 767px) {
    #rehomed {
        grid-column: span 3 / span 3;
    }

    #gender {
        grid-column: span 2 / span 2;
    }

    #lvl {
        grid-column: span 3 / span 3;
    }

    #breed {
        grid-column: 1 / -1;
    }

    #anitype {
        grid-column: span 3 / span 3;
    }

    #fur {
        grid-column: span 4 / span 4;
    }

    #age {
        grid-column: span 3 / span 3;
    }

    #size {
        grid-column: span 3 / span 3;
    }
}

@media (max-width: 663px) {
    #rehomed {
        grid-column: 1 / -1;
    }

    #gender {
        grid-column: 1 / -1;
    }

    #lvl {
        grid-column: 1 / -1;
    }

    #breed {
        grid-column: 1 / -1;
    }

    #anitype {
        grid-column: 1 / -1;
    }

    #fur {
        grid-column: 1 / -1;
    }

    #age {
        grid-column: 1 / -1;
    }

    #size {
        grid-column: 1 / -1;
    }
}
/* end of forms styles */
</style>