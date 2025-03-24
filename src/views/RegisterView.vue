<template>
  <v-container fluid class="h-screen d-flex align-center justify-center">
    <v-card class="px-8 py-10 login-card">
      <h5 class="text-h4 text-center mb-6">NEW ACCOUNT?</h5>
      <v-form @submit.prevent="validateForm" ref="formRef">
        <div class="mt-4">
          <VNTextField
            v-model="name"
            :rules="[rules.required]"
            label="Name"
            placeholder="Ex: Joe"
            leftIcon="mdi-account-outline"
          />
        </div>
        <div class="mt-4">
          <VNTextField
            v-model="nick"
            :rules="[rules.required]"
            label="Nickname"
            placeholder="Ex: JoeTheKing"
            leftIcon="mdi-comment-account-outline"
          />
        </div>
        <div class="mt-4">
          <VNTextField
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
            placeholder="Ex: joe@gmail.com"
            leftIcon="mdi-email-outline"
          />
        </div>
        <div class="mt-4">
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
          Invalid credentials, please, try again!
        </p>

        <div class="d-flex justify-center ga-2 mt-10">
          <VNButton
            @click="router.push('/login/sign-in')"
            label="I HAVE A ACCOUNT"
            type="button"
            variant="outlined"
            class="w-50"
          />
          <VNButton
            :loading="isLoading"
            label="SIGN UP"
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

const hasError = ref(false);

const showPassword = ref(false);
const rules = ref({
  required: (value) => !!value || "Required!",
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid email";
  },
});

const formRef = ref();
const isLoading = ref(false);
const name = ref("");
const nick = ref("");
const email = ref("");
const password = ref("");
const validateForm = async () => {
  const isValid = await formRef.value.validate();
  if (isValid.valid)
    signUp(name.value, nick.value, email.value, password.value);
};

const signUp = async (name, nick, email, password) => {
  isLoading.value = true;
  hasError.value = false;

  try {
    const response = await api.post("/users", {
      name,
      nick,
      email,
      password,
      name,
    });

    if (response?.data) router.push("/login/sign-in");
  } catch (error) {
    console.error("Sign up failed:", error.response?.data || error.message);
    if (error?.response?.data?.erro?.includes("Error 1062")) {
      hasError.value = true;
    }
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px !important;
}
</style>
