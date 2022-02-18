import { loginService } from "../login/LoginService.js";

class CreateProductService {
  constructor() {
  }

  async createProduct(image, name, description, price, buySell) {
    const url = `http://localhost:8000/api/products`;
    let response;
    const product = this.getProductObj(image, name, description, price, buySell);

    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          Authorization: "Bearer " + loginService.getLoggedUser(),
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw new Error("no he podido guardar el producto"); 
    }

     // Se evalua si la respuesta fue exitosa
    if (!response.ok) {
        throw new Error("error mientras se guardaba el producto"); 
    }
  }

  // Se devuelve un objeto producto
  getProductObj(image, name, description, price, buySell) {
    const productObj = {
      image,
      name,
      description,
      price,
      buySell,
    };
    return productObj;
  }

}

export const createProductService = new CreateProductService();