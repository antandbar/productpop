import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import { productService } from "../product-list/ProductService.js";
import { buildproductDetailView } from "../product-list/ProductView.js";
import { decodeToken } from "../utils/decodeToken.js";
import { buildProductListSpinnerView } from "../shared/views.js"

export class ProductDetailController {
  constructor(productDetailElement) {
    this.productDetailElement = productDetailElement;
    this.product = null;
  }

  async showProduct(productId) {
    if (!productId) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Id del producto no válido"
      );

      return;
    }

    const spinnerTemplate = buildProductListSpinnerView();

    this.productDetailElement.innerHTML = spinnerTemplate;

    try {
      this.product = await productService.getProduct(productId);
      const productTemplate = buildproductDetailView(this.product);
      this.productDetailElement.innerHTML = productTemplate;

      this.handleDeleteButton();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    } 
  }

  handleDeleteButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      // decodificamos token
      const userInfo = decodeToken(loggedUserToken);

      // comprobamos si el id de usuario logado es el mismo que el id del creador del producto
      const isOwner = this.isProductOwner(userInfo.userId);
     

      // pintamos botón
      if (isOwner) {
        this.drawDeleteButton();
      }
    }
  }

  isProductOwner(userId) {
    return userId === this.product.userId;
  }

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

  async deleteProduct() {
    const shouldDelete = window.confirm("Estás seguro de borrar el producto?");

    if (shouldDelete) {
      try {
        await productService.deleteProduct(this.product.id);
        window.location.href = "/";
      } catch (error) {
        pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
      }
    }
  }
}
