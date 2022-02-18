export class ProductHeaderController {
    constructor(productHeaderElement){
        this.productHeaderElement = productHeaderElement;
    }

    showtitle() {
        this.drawTitle();
    }
    
    // Se pinta el Title
    drawTitle() {
        const productTitleElement = document.createElement("h1");
        productTitleElement.classList.add("title");
        productTitleElement.innerText="Productos";
        this.productHeaderElement.appendChild(productTitleElement);
    }

}