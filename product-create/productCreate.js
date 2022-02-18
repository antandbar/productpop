
import { NotificationController } from "../shared/notification/NotificationController.js";
import { ProductCreateController } from "./ProductCreateController.js";

// Se captura evento cuando el HTML se ha cargado
document.addEventListener("DOMContentLoaded", () => {
    const createFormElement = document.querySelector("form");
    const notificationElement = document.querySelector(".notification");

    const notificationController = new NotificationController(notificationElement);

    // Solo los usuarios logados pueden crear productos
    const productCreateController = new ProductCreateController(createFormElement);
    productCreateController.loginvalidate();
});