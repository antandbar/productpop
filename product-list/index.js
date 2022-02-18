import { NotificationController } from "../shared/notification/NotificationController.js";
import { ProductListController } from "./ProductListController.js";
import { ProductHeaderController } from "./ProductHeaderControler.js";

// Se captura evento cuando el HTML se ha cargado
document.addEventListener("DOMContentLoaded", async () => {
  const productHeaderElement = document.querySelector(".header");
  const productListElement = document.querySelector(".product-list");
  const notificationElement = document.querySelector(".notification");

  // Se llama a la clase que muestra las notificaciones (excepciones)
  const notificationController = new NotificationController(notificationElement);

  // Se llama a la clase que pinta el header
  const productHeaderController = new ProductHeaderController(productHeaderElement);
  productHeaderController.showtitle();

  // Se llama a la clase que pinta la grilla de productos
  const productListController = new ProductListController(productListElement);
  await productListController.showProducts();
});
