<template>
    <div class="container">
        <header-container pageName="404 Page Not Found">
            <div class="about-body">
                The page you are looking for does not exist. Please check the URL and try again. If you reached this page
                from a link on this site, please <a href="https://infinity-atom.org/socials">contact the site administrator</a>.
            </div>
        </header-container>
    </div>
</template>

<style scoped>
    .container {
        width: 100vw;
        min-height: 100vh;

        display: flex;
        flex-direction: column;

        align-items: center;
    }

    .about-body {
        width: 50vw;
        font-size: 12pt;
    }
</style>

<script setup lang="ts">
import HeaderContainer from '@/components/HeaderContainer.vue';
</script>
