/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify, ThemeDefinition } from "vuetify";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#ff0000",
    secondary: "#222222",
    accent: "#ffffff",
    error: "#ff5252",
    info: "#2196f3",
    success: "#4caf50",
    warning: "#ffc107",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: lightTheme,
    },
  },
});
