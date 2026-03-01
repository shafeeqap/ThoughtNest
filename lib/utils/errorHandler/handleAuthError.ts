// import { toast } from "react-hot-toast";
import { toast } from "react-toastify";
import { authErrorMessages } from "./authErrorMessages";

export const handleAuthError = (code?: string) => {
  const message =
    (code && authErrorMessages[code as keyof typeof authErrorMessages]) ||
    "Login failed. Please try again.";

  toast.error(message);
};
