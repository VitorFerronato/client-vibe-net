<template>
  <v-container fluid class="h-screen d-flex align-center justify-center">
    <v-card class="px-8 py-14 login-card" :disabled="isLoading">
      <h5 class="text-h4 text-center mb-6">SIGN IN</h5>
      <v-form @submit.prevent="validateForm" ref="formRef">
        <div>
          <VNTextField
            v-model="email"
            :rules="[rules.email, rules.required]"
            label="Email"
            placeholder="joedoe@gmail.com"
            leftIcon="mdi-email-outline"
          />
        </div>
        <div class="mt-6">
          <VNTextField
            v-model="password"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :rightIcon="
              showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            @click:append-inner="showPassword = !showPassword"
            leftIcon="mdi-lock-outline"
            label="Password"
            placeholder="Your password"
          />
        </div>
        <p
          v-if="hasError"
          class="text-center text-error text-caption mt-4 mb-0"
        >
          Invalid user or password!
        </p>
        <div class="d-flex justify-center ga-2 mt-10">
          <VNButton
            :disabled="isLoading"
            @click="router.push('/login/sign-up')"
            label="CREATE ACCOUNT"
            type="button"
            variant="outlined"
            class="w-50"
          />
          <VNButton
            :loading="isLoading"
            label="LOGIN"
            type="submit"
            class="flex-grow-1"
            style="color: white !important"
          />
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

import VNTextField from "@/components/VNTextField.vue";
import VNButton from "@/components/VNButton.vue";

import api from "@/configs/api.js";

import { useRouter } from "vue-router";
const router = useRouter();

const showPassword = ref(false);
const rules = ref({
  required: (value) => !!value || "Required!",
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid email";
  },
});

const hasError = ref(false);

const formRef = ref();
const isLoading = ref(false);
const email = ref("");
const password = ref("");
const validateForm = async () => {
  const isValid = await formRef.value.validate();
  if (isValid.valid) signIn(email.value, password.value);
};

const signIn = async (email, password) => {
  hasError.value = false;
  isLoading.value = true;

  try {
    const response = await api.post("/login", { email, password });
    const token = response?.data ?? "";
    localStorage.setItem("token", token);
    router.push("/main/home");
  } catch (error) {
    console.log(error);
    console.error("Login failed:", error.response?.data || error.message);
    if (error?.response?.data?.erro == "user not found") hasError.value = true;
  }

  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px !important;
}
</style>
