
import { NotificationController } from "../shared/notification/NotificationController.js";
import { ProductCreateController } from "./ProductCreateController.js";

document.addEventListener("DOMContentLoaded", () => {
    const createFormElement = document.querySelector("form");
    const notificationElement = document.querySelector(".notification");

    const notificationController = new NotificationController(
        notificationElement
      );

      const productCreateController = new ProductCreateController(createFormElement);
      productCreateController.loginvalidate();
});