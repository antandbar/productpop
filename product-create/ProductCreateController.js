import { createProductService } from "./CreateProductService.js";
import { pubSub } from "../shared/pubSub.js";

export class ProductCreateController {
  constructor(createFormElement) {
    this.createFormElement = createFormElement;

    this.attachEvents();
  }

  attachEvents() {
    this.onAnyInputChange();
    this.onSubmitCreateForm();
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.createFormElement.querySelectorAll("input:required")
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const areInputsFilled = inputElements.every(
          (inputElement) => inputElement.value
        );

        if (areInputsFilled) {
          this.createFormElement
            .querySelector("button")
            .removeAttribute("disabled");
        } else {
          this.createFormElement
            .querySelector("button")
            .setAttribute("disabled", "");
        }
      });
    });
  }

  onSubmitCreateForm() {
    this.createFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.createFormElement);

      const image = formData.get("image");
      const name = formData.get("name");
      const description = formData.get("description");
      const price = formData.get("price");
      const buySell = formData.get("buySell");

      this.addProduct(image, name, description, price, buySell);
    });
  }

  async addProduct(image, name, description, price, buySell) {
    try {
      await createProductService.createProduct(image, name, description, price, buySell);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
