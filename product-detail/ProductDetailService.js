import { loginService } from "../login/LoginService.js";

export class ProductDetailService {
  constructor(){
  }

  // Se devulve el producto por "id"
  async getProduct(productId) {
    const url = `http://localhost:8000/api/products/${productId}`;

    let response;
    let product;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por el product");
    }

     // Se evalua si la respuesta fue exitosa
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

  // Se borra producto por "id"
  async deleteProduct(productId) {
    const url = `http://localhost:8000/api/products/${productId}`;

    let response;

    try {
      response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + loginService.getLoggedUser(),
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

export const productDetailService = new ProductDetailService();