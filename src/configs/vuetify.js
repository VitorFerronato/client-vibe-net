import { createVuetify } from "vuetify";
import {
  VApp,
  VMain,
  VContainer,
  VBtn,
  VCard,
  VTextField,
  VForm,
} from "vuetify/components";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components: {
    VApp,
    VMain,
    VContainer,
    VBtn,
    VCard,
    VTextField,
    VForm,
  },
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        colors: {
          primary: "#A2CEFF",
          // secondary: "#253342",
          background: "#B2CFFE",
          // surface: "#1E1E2E",
          error: "#D9695F",
          white: "#f2f2f2",
        },
      },
    },
  },
});

export default vuetify;
