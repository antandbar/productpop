import { createProductService } from "./CreateProductService.js";
import { pubSub } from "../shared/pubSub.js";
import { loginService } from "../login/LoginService.js";

export class ProductCreateController {
  constructor(createFormElement) {
    this.createFormElement = createFormElement;
    // Se cargan los eventos a instaciar la clase
    this.attachEvents();
  }

  attachEvents() {
    this.onAnyInputChange();
    this.onSubmitCreateForm();
  }

  onAnyInputChange() {
    // Se guardan los input "required" en un nuevo objeto Array para aprovechar los metodos Array
    const inputElements = Array.from(
      this.createFormElement.querySelectorAll("input:required")
    );

    // Se recorren los inputs para evaluar si tienen contenido
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const areInputsFilled = inputElements.every(
          (inputElement) => inputElement.value
        );
        
        // Se habilita o deshabilita botón según campos rellenos
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

  // Se captura data del formulario
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
    // Se llama al servicio de crear producto
    try {
      await createProductService.createProduct(
        image,
        name,
        description,
        price,
        buySell
      );
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

      // Se evalua si existe el token (se ha realizado login)
  loginvalidate() {
    const loggedUserToken = loginService.getLoggedUser();

    if (!loggedUserToken) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Debe hacer login para crear usuarios"
      );
      this.disabledBtnForm();
      this.drawBackButton();
    } else {
      const inputElements = Array.from(
        this.createFormElement.querySelectorAll("input")
      );
      // En caso de hacer login se habilitan los inputs
      this.inputsEnabled(inputElements);
    }
  }

  inputsEnabled(inputElements) {
    inputElements.forEach((inputElement) => {
      inputElement.removeAttribute("disabled");
    });
  }

  // Se pinta el boton volver en caso de no ser usuario logado
  drawBackButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "volver";
    buttonElement.classList.add("btn");
    buttonElement.classList.add("btn-danger");

    this.createFormElement.appendChild(buttonElement);

    this.createFormElement
      .querySelector(".btn-danger")
      .addEventListener("click", () => {
        window.location.href = "/index.html";
      });
  }

  // Se deshabilita el boton volver en caso de no ser usuario logado 
  disabledBtnForm() {
    const formBtnElement = this.createFormElement.querySelector(".btnForm");
    formBtnElement.classList.add("not-active");
  }
}
