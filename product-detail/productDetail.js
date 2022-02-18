import { ProductDetailController } from "./ProductDetailController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

// Se captura evento cuando el HTML se ha cargado
document.addEventListener("DOMContentLoaded", () => {
  const productDetailElement = document.querySelector(".product-detail");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);

  // Se captura el "id" de la url
  const searchParams = new URLSearchParams(window.location.search);
  const productId = searchParams.get("id");

  const productDetailController = new ProductDetailController(productDetailElement);
  // se muestran los productos por "id"
  productDetailController.showProduct(productId);
});