import { signupService } from "../signup/SignupService.js";

export class ProductService {
  constructor(){
  }

  async getProducts() {
    const url = "http://localhost:8000/api/products";

    let response;
    let products;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por los productos");
    }

    if (!response.ok) {
      throw new Error("Productos no encontrados");
    }

    try {
      products = await response.json();
    } catch (error) {
      throw new Error("no he podido transformar la respuesta a json");
    }

    return products;
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
