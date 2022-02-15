import { pubSub } from "../shared/pubSub.js";
import { productService } from "./ProductService.js";
import { buildProductView, buildNotFoundProductsView } from "./ProductView.js";
import { buildProductListSpinnerView } from "../shared/views.js"
import { signupService } from "../signup/SignupService.js";
import { decodeToken } from "../utils/decodeToken.js";

export class ProductListController {
  productListElement = null;

  constructor(productListElement) {
    this.productListElement = productListElement;
    // Se captura la tabla dado que el Spinner hacer un innerHTML
    this.table = this.productListElement.querySelector("table");
  }

  async showProducts() {
    let products;
    const spinnerTemplate = buildProductListSpinnerView();

    this.productListElement.innerHTML = spinnerTemplate;

    
    try {
      products = await productService.getProducts();
      // Se administra la creación del boton "Crear Producto" si el usuario está logado
      this.handleCreateButton();

      if (products.length === 0) {
        this.productListElement.innerHTML = buildNotFoundProductsView();
      }
      // Se añaden trs a la tabla
      for (const product of products) {
        let productTrElement = document.createElement("tr");  
        const productTemplate = buildProductView(product);
        productTrElement.innerHTML = productTemplate;

        this.table.appendChild(productTrElement);
      } 

      this.productListElement.appendChild(this.table);
    } catch (error) {
      // informar de error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    
    } finally {
      if (products.length !== 0) {
        const loader = this.productListElement.querySelector(".loader");
        loader.remove();
      }
    }
  }

  handleCreateButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      // decodificamos token
      const userInfo = decodeToken(loggedUserToken);
     
      // comprobamos que el ID existe para pintar el boton
      if(userInfo.userId) this.drawCreateButton();

    }
  }

  drawCreateButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Crear Producto";

    this.productListElement.appendChild(buttonElement);

    this.productListElement.querySelector("button").addEventListener("click", () => {
      window.location.href = "/productCreate.html";
    });
  }
}
