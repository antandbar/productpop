import { loginService } from "./LoginService.js";
import { pubSub } from "../shared/pubSub.js";

export class LoginController {
  // El constructor recibe el nodo
  constructor(loginFormElement) {
    this.loginFormElement = loginFormElement;

    // Al cargar la clase se llaman a los eventos
    this.attachEvents();
  }

  attachEvents() {
    this.onAnyInputChange();
    this.onSubmitLoginForm();
  }

  onAnyInputChange() {
    // Se guardan los input en un nuevo objeto Array para aprovechar los metodos Array
    const inputElements = Array.from(
      this.loginFormElement.querySelectorAll("input")
    );

    // Se recorren los inputs para evaluar si tienen contenido
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const areInputsFilled = inputElements.every(
          (inputElement) => inputElement.value
        );

        if (areInputsFilled) {
          this.loginFormElement
            .querySelector("button")
            .removeAttribute("disabled");
        } else {
          this.loginFormElement
            .querySelector("button")
            .setAttribute("disabled", "");
        }
      });
    });
  }

  // Al enviar el formulario se captura la data
  onSubmitLoginForm() {
    this.loginFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.loginFormElement);

      const username = formData.get("user");
      const password = formData.get("password");

      this.loginUser(username, password);
    });
  }
  // Se llama al servicio para hacer login
  async loginUser(username, password) {
    try {
      await loginService.loginUser(username, password);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
