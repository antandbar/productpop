import { NotificationController } from "../shared/notification/NotificationController.js";
import { ProductListController } from "./ProductListController.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productListElement = document.querySelector(".product-list");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const productListController = new ProductListController(productListElement);
  await productListController.showProducts();
});
