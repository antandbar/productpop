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
    this.tableElement = this.productListElement.querySelector("table");
    // Se captura la nav de paginación dado que el Spinner hacer un innerHTML
    this.paginationElment = this.productListElement.querySelector("nav");
    this.pageCounts = 1;
    this.setEventsPagination();
  }

  async showProducts() {
    let products;
    const spinnerTemplate = buildProductListSpinnerView();

    this.productListElement.innerHTML = spinnerTemplate;

    try {
      
      products = await productService.getProducts(this.pageCounts);
      // Se administra la creación del boton "Crear Producto" si el usuario está logado
      this.handleCreateButton();

      this.productListElement.appendChild(this.paginationElment);
      this.paginationButtons();

      const tbodyElement = this.tableElement.querySelector("tbody");
      // Se añaden trs a la tabla
      for (const product of products) {
        let productTrElement = document.createElement("tr");  
        const productTemplate = buildProductView(product);
        productTrElement.innerHTML = productTemplate;

        tbodyElement.appendChild(productTrElement);
      } 

      this.productListElement.appendChild(this.tableElement);

      if (products.length === 0) {
        this.productListElement.innerHTML = buildNotFoundProductsView();
      }
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

  // Se setean los evento de la paginación
  setEventsPagination(){
    this.paginationElment.querySelector(".page-previus").addEventListener("click", () => {
      this.pageCounts --;
      this.reloadPage();
    });

    this.paginationElment.querySelector(".page-one").addEventListener("click", () => {
      this.pageCounts = 1;
      this.reloadPage();
    });

    this.paginationElment.querySelector(".page-two").addEventListener("click", () => {
      this.pageCounts = 2;
      this.reloadPage();
    });

    this.paginationElment.querySelector(".page-three").addEventListener("click", () => {
      this.pageCounts = 3;
      this.reloadPage();
    });

    this.paginationElment.querySelector(".page-Next").addEventListener("click", () => {
      this.pageCounts ++;
      this.reloadPage();
    });
  }

  reloadPage() {
    this.tableElement.querySelector("tbody").innerHTML = "";
    this.showProducts();
  }
  // Se dehabilitan los botones fuera de rango del número de productos
  paginationButtons(){
    const productsTotalCount = productService.getTotalCount();
    switch (true) {
      case (productsTotalCount <= 10):
        this.paginationElmentn.querySelector(".link-two").classList.add("not-active");
        this.paginationElment.querySelector(".link-three").classList.add("not-active");
        break;
      case (productsTotalCount <= 20):          
        this.paginationElment.querySelector(".link-three").classList.add("not-active");
        break;
    }

    // Se evita que al pulsar "Atras" en varias ocasiones no funcione correctamente "Siguiente" 
    if(this.pageCounts < 1) this.pageCounts = 1;
    // Se evita que al pulsar "siguiente" en varias ocasiones no funcione correctamente "Atras" 
    if(this.pageCounts >= Math.ceil(productsTotalCount/10)) this.pageCounts --;
  }
}
