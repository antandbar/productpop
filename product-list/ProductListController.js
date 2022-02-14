import { pubSub } from "../shared/pubSub.js";
import {productService} from "./ProductService.js";
import {
  buildProductView,
  buildProductListSpinnerView,
  buildNotFoundProductsView,
} from "./ProductView.js";

export class ProductListController {
  productListElement = null;

  constructor(productListElement) {
    this.productListElement = productListElement;
  }

  async showProducts() {
    let products;
    const spinnerTemplate = buildProductListSpinnerView();

    this.productListElement.innerHTML = spinnerTemplate;

    try {
      products = await productService.getProducts();

      if (products.length === 0) {
        this.productListElement.innerHTML = buildNotFoundProductsView();
      }

      for (const product of products) {
        const productArticleElement = document.createElement("article");
        const productTemplate = buildProductView(product);

        productArticleElement.innerHTML = productTemplate;

        this.productListElement.appendChild(productArticleElement);
      }
    } catch (error) {
      // informar de error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "error obteniendo productos"
      );
    
    } finally {
      const loader = this.productListElement.querySelector(".loader");
      loader.remove();
    }
  }
}
