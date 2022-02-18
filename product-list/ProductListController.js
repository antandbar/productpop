import { pubSub } from "../shared/pubSub.js";
import { productService } from "./ProductService.js";
import { buildProductView, buildNotFoundProductsView, buildBodyTableView, buildBodyNavView } from "./ProductView.js";
import { buildProductListSpinnerView } from "../shared/spinner/spinnerView.js"
import { loginService } from "../login/LoginService.js"
import { decodeToken } from "../utils/decodeToken.js";

export class ProductListController {

  constructor(productListElement) {
    this.productListElement = productListElement;
    this.pageCounts = 1;
    this.products;
    this.productsTotalCount;
  }

  async showProducts() {
    
    // Se pinta spinner mientras se carga la web
    const spinnerTemplate = buildProductListSpinnerView();
    this.productListElement.innerHTML = spinnerTemplate;

    try {
      // Se llama a servicio para traer todos los productos paginándolos
      this.products = await productService.getProducts(this.pageCounts);

      this.handleCreateButton();
      this.drawNav(); 
      this.drawTable();
      this.drawTr();

      // En caso de tener productos 
      if (this.products.length === 0) {
        this.productListElement.innerHTML = "";
        this.handleCreateButton();
        const divNotFoundProudct = document.createElement("div");
        divNotFoundProudct.innerHTML = buildNotFoundProductsView();
        this.productListElement.appendChild(divNotFoundProudct);
      }
    } catch (error) {
      // Se elimina Spinner
      this.removeSpinner();
      // Se informa el error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    
    } finally {
      // Se elimina spinner al cargar la web
      if (this.products.length !== 0) {
        // Se elimina Spinner
        this.removeSpinner();
      }
    }
  }

  // Se elimina Spinner al cargar la página
  removeSpinner() {
    const loader = this.productListElement.querySelector(".loader");
    loader.remove();
  }
  drawTable() {
    const productTableElement = document.createElement("table");
    productTableElement.classList.add("table");
    productTableElement.innerHTML = buildBodyTableView();
    this.productListElement.appendChild(productTableElement);
  }
  drawTr() {
    const tbodyElement = this.productListElement.querySelector("tbody");
    // Se añaden trs a la tabla
    for (const product of this.products) {
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
    this.paginationButtons();
  }

  handleCreateButton() {
    const loggedUserToken = loginService.getLoggedUser();

    if (loggedUserToken) {
      // decodificamos token
      const userInfo = decodeToken(loggedUserToken);
     
      // comprobamos que el ID existe para pintar el boton
      if(userInfo.userId) this.drawCreateButton();

    }
  }

  // Se pinta el boton que crea productos
  drawCreateButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Crear Producto"; 
    buttonElement.classList.add("btn");
    buttonElement.classList.add("btn-outline-success"); 
    buttonElement.classList.add("btn-create");

    // Se crea div para posicionar el bottón en la web
    const div = document.createElement("div");
    div.classList.add("div-btn");
    div.appendChild(buttonElement);
    this.productListElement.appendChild(div);

    // Al pusar el botón se redirige a la página de crear botón
    this.productListElement.querySelector("button").addEventListener("click", () => {
      window.location.href = "/productCreate.html";
    });
  }

  // Se setean los evento de la paginación
  // Cuando hay más de tres páginas se avanza y retrocede con "atras"/"siguiente" 
  setEventsPagination(){
    this.productListElement.querySelector(".page-previus").addEventListener("click", () => {
      this.pageCounts --;
      // Se evita que al pulsar "Atras" en varias ocasiones no funcione correctamente "Siguiente" 
      if(this.pageCounts < 1) this.pageCounts = 1;
      this.getProductsNav();
    });

    this.productListElement.querySelector(".page-one").addEventListener("click", () => {
      this.pageCounts = 1;
      this.getProductsNav();
    });

    this.productListElement.querySelector(".page-two").addEventListener("click", () => {
      this.pageCounts = 2;
      this.getProductsNav();
    });

    this.productListElement.querySelector(".page-three").addEventListener("click", () => {
      this.pageCounts = 3;
      this.getProductsNav();
    });

    this.productListElement.querySelector(".page-Next").addEventListener("click", () => {
      this.pageCounts ++;
      // Se evita que al pulsar "siguiente" en varias ocasiones no funcione correctamente "Atras" 
      if(this.pageCounts > Math.ceil(this.productsTotalCount/10)) this.pageCounts --;
      this.getProductsNav();
    });
  }
  // Se gestionan los botones de la paginación
  paginationButtons(){
    this.productsTotalCount = productService.getTotalCount();
    switch (true) {
      case (this.productsTotalCount <= 10):
        this.productListElement.querySelector(".link-two").classList.add("not-active");
        this.productListElement.querySelector(".link-three").classList.add("not-active");
        break;
      case (this.productsTotalCount <= 20):          
        this.productListElement.querySelector(".link-three").classList.add("not-active");
        break;
    }
  }

  // Devuelve productos que son utilizados por la paginación
  async getProductsNav() { 
    try {
      this.products = await productService.getProducts(this.pageCounts);
      // Se llama a servicio para traer todos los productos paginándolos
      const tbodyElement = this.productListElement.querySelector("tbody");
      tbodyElement.innerHTML="";
      
      this.drawTr();
      this.paginationButtons();
    } catch (error) {
      // Se informa el error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
