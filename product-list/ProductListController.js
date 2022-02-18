import { pubSub } from "../shared/pubSub.js";
import { productService } from "./ProductService.js";
import { buildProductView, buildNotFoundProductsView, buildBodyTableView, buildBodyNavView } from "./ProductView.js";
import { buildProductListSpinnerView } from "../shared/spinner/spinnerView.js"
import { loginService } from "../login/LoginService.js"
import { decodeToken } from "../utils/decodeToken.js";

export class ProductListController {
  productListElement = null;

  constructor(productListElement) {
    this.productListElement = productListElement;
    this.pageCounts = 1;
  }

  async showProducts() {
    let products;
    
    // Se pinta spinner mientras se carga la web
    const spinnerTemplate = buildProductListSpinnerView();
    this.productListElement.innerHTML = spinnerTemplate;

    try {
      // Se llama a servicio para traer todos los productos paginándolos
      products = await productService.getProducts(this.pageCounts);

      this.handleCreateButton();
      this.drawNav(); 
      this.drawTable();
      this.drawTr(products);

      // En caso de tener productos 
      if (products.length === 0) {
        this.productListElement.innerHTML = "";
        this.handleCreateButton();
        const divNotFoundProudct = document.createElement("div");
        divNotFoundProudct.innerHTML = buildNotFoundProductsView();
        this.productListElement.appendChild(divNotFoundProudct);
      }
    } catch (error) {
      // Se informa el error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    
    } finally {
      // Se elimina spinner al cargar la web
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
