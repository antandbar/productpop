import { SignupController } from "./SignupController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

// Se captura evento cuando el HTML se ha cargado
document.addEventListener("DOMContentLoaded", () => {
  // Se capturan nodos
  const formElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);
  const signupController = new SignupController(formElement);
});
