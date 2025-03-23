import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
/**
 *
 * @param {string} text - Text message
 * @param {"success" | "warning" | "info" | "error" | "default"} type - Toast Type
 * @param {number} timeout - Time vizualization
 */
export function snackbar(text, type, timeout) {
  if (type === "default") {
    toast(text, {
      autoClose: timeout || 3000,
      position: "bottom-right",
      position: "bottom-center",
    });
  } else {
    toast[type](text, {
      autoClose: timeout || 3000,
      position: "bottom-right",
      position: "bottom-center",
    });
  }
}

export default {
  install: (app) => {
    app.config.globalProperties.$snackbar = snackbar;
  },
};
