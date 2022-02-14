import { ProductDetailController } from "./ProductDetailController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const productDetailElement = document.querySelector(".product-detail");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const searchParams = new URLSearchParams(window.location.search);

  const productId = searchParams.get("id");

  const productDetailController = new ProductDetailController(productDetailElement);
  productDetailController.showProduct(productId);
});
