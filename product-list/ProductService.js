import { signupService } from "../signup/SignupService.js";

export default {
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
  },
  async getProduct(productId) {
    const url = `http://localhost:8000/api/tweets/${productId}`;

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

    const transformedProduct = this.transformProducts([product]);

    return transformedProduct[0];
  },
  async deleteProduct(productId) {
    const url = `http://localhost:8000/api/tweets/${productId}`;

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
  },
  transformProducts(products) {
    return products.map((product) => {
      const transformedProduct = {
        content: product.content || product.body, // actualizable
        userId: product.userId || product.handle,
        date: product.updatedAt || product.date,
        id: product.id || 0,
        retweets: product.retweets || 0,
        likes: product.likes || 0,
        image:
        product.avatar ||
          "https://www.logocrea.com/wp-content/uploads/2012/12/twitter.png",
      };

      return transformedProduct;
    });
  },
  oldGetTweets() {
    const url =
      "https://gist.githubusercontent.com/edu-aguilar/8c9a509ec582d04da0640be2b0ede8d5/raw/f75c68645821f3c33d82d9c2c048215584d1d332/tweets.json";
    const badUrl =
      "https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png";

    return new Promise(function (resolve, reject) {
      fetch(url)
        .catch((error) => {
          console.log(error);
          reject("No he podido ir a por los productos");
        })
        .then((responseHttp) => {
          console.log(responseHttp);
          return responseHttp.json();
        })
        .catch((error) => {
          console.log(error);
          reject("no he podido transformar la respuesta a json");
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
};

/*

responsabilidad del modelo:

- abstraer al controlador y a la vista de la procedencia de los datos.

*/
