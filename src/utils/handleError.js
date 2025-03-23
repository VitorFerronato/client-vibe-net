import { snackbar } from "./snackbar";

export function handleError(errorMessage, error) {
  console.error(errorMessage, error);
  snackbar(error?.erro, "error");
}
