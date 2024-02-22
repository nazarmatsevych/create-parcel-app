<template>
  <header class="flex justify-evenly">
    <img
      @click="$router.push(`/${userId}`)"
      alt="Vue logo"
      class="logo cursor-pointer"
      src="@/assets/logo-parcel.svg"
      width="50"
      height="50"
    />

    <div class="wrapper">
      <nav>
        <RouterLink :to="`/${userId}/create`">Create Request</RouterLink>
        <RouterLink :to="`/${userId}/requests`">User Requests</RouterLink>
        <RouterLink to="/requests">All Requests</RouterLink>
      </nav>
    </div>
  </header>

  <main class="flex flex-col justify-center items-center p-16">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();

const userId = ref("1");

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      userId.value = newId.toString();
    }
  },
);
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  background-color: #fff;
  border-radius: 25%;
  padding: 5px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    font-size: 1rem;
  }
}
</style>
