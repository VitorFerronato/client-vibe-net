<template>
  <div class="align-div-center">
    <v-progress-circular
      color="white"
      size="50"
      indeterminate
    ></v-progress-circular>
    <p class="mt-4">Saindo...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const signOut = () => {
  localStorage.clear("token");
  router.push("/login/sign-in");
};

onMounted(() => {
  signOut();
});
</script>
