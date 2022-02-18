import { LoginController } from "./LoginController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

// Se captura evento cuando el HTML se ha cargado
document.addEventListener("DOMContentLoaded", () => {
  // se capturan nodos
  const loginFormElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");
  const notificationController = new NotificationController(notificationElement);

  const loginController = new LoginController(loginFormElement);
});
