import { signupService } from "../signup/SignupService.js";

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
          Authorization: "Bearer " + signupService.getLoggedUser(),
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw new Error("no he podido guardar el producto");
    }

    if (!response.ok) {
        throw new Error(loginData.message);
    }
  }

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