import { signupService } from "../signup/SignupService.js";

export default {
    async createProduct(product) {
        const url = `http://localhost:8000/api/products`;
    
        let response;
    
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

}