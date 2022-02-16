import { signupService } from "../signup/SignupService.js";

export class ProductService {
  constructor(){
    this.productsResponse;
  }

  async getProducts(pageCounts) {
    const url = `http://localhost:8000/api/products?_page=${pageCounts}`

    this.productsResponse;
    let products;

    try {
      this.productsResponse = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por los productos");
    }

    if (!this.productsResponse.ok) {
      throw new Error("Productos no encontrados");
    }
      
    try {
      products = await this.productsResponse.json();
    } catch (error) {
      throw new Error("no he podido transformar la respuesta a json");
    }

    return products;
  }

  getTotalCount() {

    if (!this.productsResponse.ok) {
      throw new Error("Productos no encontrados");
    }

    return this.productsResponse.headers.get('X-Total-Count');
  }

  async getProduct(productId) {
    const url = `http://localhost:8000/api/products/${productId}`;

    let response;
    let product;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por el product");
    }

    if (!response.ok) {
      throw new Error("Producto no encontrado");
    }

    try {
      product = await response.json();
    } catch (error) {
      throw new Error("no he podido transformar la respuesta a json");
    }

    return product;
  }

  async deleteProduct(productId) {
    const url = `http://localhost:8000/api/products/${productId}`;

    let response;

    try {
      response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + signupService.getLoggedUser(),
        },
      });
    } catch (error) {
      throw new Error("No he podido borrar el producto");
    }

    if (!response.ok) {
      throw new Error("Producto no encontrado");
    }
  }
}

export const productService = new ProductService();
