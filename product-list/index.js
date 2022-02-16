import { NotificationController } from "../shared/notification/NotificationController.js";
import { ProductListController } from "./ProductListController.js";
import { ProductHeaderController } from "./ProductHeaderControler.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productHeaderElement = document.querySelector(".header");
  const productListElement = document.querySelector(".product-list");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);

  const productHeaderController = new ProductHeaderController(productHeaderElement);
  productHeaderController.showtitle();

  const productListController = new ProductListController(productListElement);
  await productListController.showProducts();
});
