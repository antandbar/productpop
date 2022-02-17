import { pubSub } from "../shared/pubSub.js";
import { productService } from "./ProductService.js";
import { buildProductView, buildNotFoundProductsView, buildBodyTableView, buildBodyNavView } from "./ProductView.js";
import { buildProductListSpinnerView } from "../shared/views.js"
import { signupService } from "../signup/SignupService.js";
import { decodeToken } from "../utils/decodeToken.js";

export class ProductListController {
  productListElement = null;

  constructor(productListElement) {
    this.productListElement = productListElement;
    this.pageCounts = 1;
  }

  async showProducts() {
    let products;
    const spinnerTemplate = buildProductListSpinnerView();

    this.productListElement.innerHTML = spinnerTemplate;

    try {
      
      products = await productService.getProducts(this.pageCounts);
      // Se administra la creación del boton "Crear Producto" si el usuario está logado
      this.handleCreateButton();
      this.drawNav(); 
      this.drawTable();
      this.drawTr(products);


      if (products.length === 0) {
        this.productListElement.innerHTML = "";
        this.handleCreateButton();
        const divNotFoundProudct = document.createElement("div");
        divNotFoundProudct.innerHTML = buildNotFoundProductsView();
        this.productListElement.appendChild(divNotFoundProudct);
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

  drawTable() {
    const productTableElement = document.createElement("table");
    productTableElement.classList.add("table");
    productTableElement.innerHTML = buildBodyTableView();
    this.productListElement.appendChild(productTableElement);
  }
  drawTr(products) {
    const tbodyElement = this.productListElement.querySelector("tbody");
    // Se añaden trs a la tabla
    for (const product of products) {
      const productTrElement = document.createElement("tr");  
      const productTemplate = buildProductView(product);
      productTrElement.innerHTML = productTemplate;

      tbodyElement.appendChild(productTrElement);
    } 
  }

  drawNav() {
    const productNavElement = document.createElement("nav");
    productNavElement.classList.add("Page-nav");
    productNavElement.innerHTML = buildBodyNavView();
    this.productListElement.appendChild(productNavElement);
    this.setEventsPagination();
    this.paginationButtons(productNavElement);
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
    buttonElement.classList.add("btn");
    buttonElement.classList.add("btn-outline-success"); 
    buttonElement.classList.add("btn-create");

    const div = document.createElement("div");
    div.classList.add("div-btn");

    div.appendChild(buttonElement);

    this.productListElement.appendChild(div);

    this.productListElement.querySelector("button").addEventListener("click", () => {
      window.location.href = "/productCreate.html";
    });
  }

  // Se setean los evento de la paginación
  setEventsPagination(){
    this.productListElement.querySelector(".page-previus").addEventListener("click", () => {
      this.pageCounts --;
      this.showProducts();
    });

    this.productListElement.querySelector(".page-one").addEventListener("click", () => {
      this.pageCounts = 1;
      this.showProducts();
    });

    this.productListElement.querySelector(".page-two").addEventListener("click", () => {
      this.pageCounts = 2;
      this.showProducts();
    });

    this.productListElement.querySelector(".page-three").addEventListener("click", () => {
      this.pageCounts = 3;
      this.showProducts();
    });

    this.productListElement.querySelector(".page-Next").addEventListener("click", () => {
      this.pageCounts ++;
      this.showProducts();
    });
  }
  // Se gestionan los botones de la paginación
  paginationButtons(productNavElement){
    const productsTotalCount = productService.getTotalCount();
    switch (true) {
      case (productsTotalCount <= 10):
        productNavElement.querySelector(".link-two").classList.add("not-active");
        productNavElement.querySelector(".link-three").classList.add("not-active");
        break;
      case (productsTotalCount <= 20):          
        productNavElement.querySelector(".link-three").classList.add("not-active");
        break;
    }

    // Se evita que al pulsar "Atras" en varias ocasiones no funcione correctamente "Siguiente" 
    if(this.pageCounts < 1) this.pageCounts = 1;
    // Se evita que al pulsar "siguiente" en varias ocasiones no funcione correctamente "Atras" 
    if(this.pageCounts >= Math.ceil(productsTotalCount/10)) this.pageCounts --;
  }
}
