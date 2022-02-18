import { pubSub } from "../shared/pubSub.js";
import { loginService } from "../login/LoginService.js";
import { productDetailService } from "./ProductDetailService.js";
import { buildproductDetailView } from "./ProductDetailView.js";
import { decodeToken } from "../utils/decodeToken.js";
import { buildProductListSpinnerView } from "../shared/spinner/spinnerView.js"

export class ProductDetailController {
  constructor(productDetailElement) {
    this.productDetailElement = productDetailElement;
    this.product = null;
  }

  // En caso no exista ID se lanza excepción
  async showProduct(productId) {
    if (!productId) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Id del producto no válido"
      );

      return;
    }

    // Se lanza spinner mientras se carga la web
    const spinnerTemplate = buildProductListSpinnerView();
    this.productDetailElement.innerHTML = spinnerTemplate;

    try {
      // Se llama al servicio de productos según "id"
      this.product = await productDetailService.getProduct(productId);
      const productTemplate = buildproductDetailView(this.product);
      this.productDetailElement.innerHTML = productTemplate;

      this.handleDeleteButton();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    } 
  }

  handleDeleteButton() {
    const loggedUserToken = loginService.getLoggedUser();

    if (loggedUserToken) {
      // Se decodifica el token
      const userInfo = decodeToken(loggedUserToken);

      // Se comprueba si el id de usuario logado es el mismo que el id del creador del producto
      const isOwner = this.isProductOwner(userInfo.userId);
     
      // Se pinta el botón
      if (isOwner) {
        this.drawDeleteButton();
      }
    }
  }

  isProductOwner(userId) {
    return userId === this.product.userId;
  }

  // Se pinta el botón delete
  drawDeleteButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Borrar Producto";
    buttonElement.classList.add("delete-button");
    buttonElement.classList.add("btn");
    buttonElement.classList.add("btn-outline-success"); 
    buttonElement.classList.add("btn-create");

    this.productDetailElement.appendChild(buttonElement);

    this.productDetailElement.querySelector("button").addEventListener("click", () => {
      this.deleteProduct();
    });
  }

  // Se elemina el producto
  async deleteProduct() {
    const shouldDelete = window.confirm("Estás seguro de borrar el producto?");

    if (shouldDelete) {
      try {
        await productDetailService.deleteProduct(this.product.id);
        window.location.href = "/";
      } catch (error) {
        pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
      }
    }
  }
}
