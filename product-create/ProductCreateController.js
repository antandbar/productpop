import CreateProductService from "./CreateProductService.js";
import { pubSub } from "../shared/pubSub.js";

export class ProductCreateController {
  constructor(createFormElement) {
    this.createFormElement = createFormElement;

    this.attachEvents();
  }

  attachEvents() {
    this.onSubmitCreateForm();
  }

  onSubmitCreateForm() {
    this.createFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      this.addProduct(this.getProductObj());
    });
  }

  getProductObj() {
    const formData = new FormData(this.createFormElement);

    const image = formData.get("image");
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const buySell = formData.get("buySell");

    const productObj = {
      image,
      name,
      description,
      price,
      buySell,
    };
    return productObj;
  }

  async addProduct(productObj) {
    try {
      await CreateProductService.createProduct(productObj);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
