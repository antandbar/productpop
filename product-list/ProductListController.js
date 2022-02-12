import { pubSub } from "../shared/pubSub.js";
import ProductService from "./ProductService.js";
import {
  buildProductView,
  buildProductListSpinnerView,
  buildNotFoundProductsView,
} from "./ProductView.js";

export class ProductListController {
  productListElement = null;

  constructor(productListElement, notificationController) {
    this.productListElement = productListElement;
    this.notificationController = notificationController;
  }

  async showProducts() {
    let products;
    const spinnerTemplate = buildProductListSpinnerView();

    this.productListElement.innerHTML = spinnerTemplate;

    try {
      products = await ProductService.getProducts();

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

async function oldTweetListController(tweetListElement) {
  let tweets;
  const spinnerTemplate = buildProductListSpinnerView();

  tweetListElement.innerHTML = spinnerTemplate;

  try {
    tweets = await TweetService.getTweets();

    for (const tweet of tweets) {
      const tweetArticleElement = document.createElement("article");
      const tweetTemplate = buildTweetView(tweet);

      tweetArticleElement.innerHTML = tweetTemplate;

      tweetListElement.appendChild(tweetArticleElement);
    }
  } catch (error) {
    alert("error obteniendo tweets");
  } finally {
    const loader = tweetListElement.querySelector(".loader");
    loader.remove();
    // loader.classList.add("hidden");
  }
}

/* 

misiones de un controlador:

- orquestación o intermediario entre vista y modelo.
- definir y manejar eventos
- validar datos
- gestinar errores
- desacoplamiento entre capas(vista y modelo)
- un controlador debe ocuparse de gestionar un nodo DOM
  en cuanto a datos que debe pintar y eventos que suceden
*/
