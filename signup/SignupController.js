import { pubSub } from "../shared/pubSub.js";
import { signupService } from "./SignupService.js";
import { loginService } from "../login/LoginService.js";

export class SignupController {
  constructor(formElement) {
    this.formElement = formElement;
    // Se llama a eventos al crear la clase
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.onAnyInputChanged();
    this.onSubmitForm();
  }

  onAnyInputChanged() {
    // Se guardan los input en un nuevo objeto Array para aprovechar los metodos Array
    const inputElements = Array.from(
      this.formElement.querySelectorAll("input")
    );

    // Se recorren los inputs para evaluar si tienen contenido
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkIfAllInputsAreFilled(inputElements);
      });
    });
  }

  // Se evalua si los imputs tienen contanido
  checkIfAllInputsAreFilled(inputElements) {
    const areAllInputsFilled = inputElements.every(
      (inputElement) => inputElement.value
    );

    if (areAllInputsFilled) {
      this.formElement.querySelector("button").removeAttribute("disabled");
    } else {
      this.formElement.querySelector("button").setAttribute("disabled", "");
    }
  }

  
  onSubmitForm() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      // Se captura data
      const formData = new FormData(this.formElement);
      const username = formData.get("textInput");
      const passwordInput = formData.get("passwordInput");
      const passwordMatchInput = formData.get("passwordMatchInput");

      const arePasswordsEqual = this.checkIfPasswordsAreEqual(
        passwordInput,
        passwordMatchInput
      );
      // En caso de que el password no coincida se lanza notificación
      if (!arePasswordsEqual) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "las contraseñas no son iguales"
        );
        return;
      }

      const isPasswordValid = this.checkIfPasswordMatchRegExp(passwordInput);
      // En caso de que el password no contanta letras y números se lanza notificación
      if (!isPasswordValid) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "La contraseña debe contener sólo números o letras"
        );
        return;
      }

      this.createUser(username, passwordInput);
    });
  }

  // Se evalua si los password son iguales
  checkIfPasswordsAreEqual(passwordInput, passwordMatchInput) {
    return passwordInput === passwordMatchInput;
  }

  // Se valua si el password contiene letras y números
  checkIfPasswordMatchRegExp(password) {
    const passwordRegExp = new RegExp(/^[a-zA-Z0-9]*$/);

    return passwordRegExp.test(password);
  }

  // Se crea usuario
  async createUser(username, passwordInput) {
    try {
      await signupService.createUser(username, passwordInput);
      this.loginUser(username, passwordInput);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

  // Después de crear el usuario se hace login
  async loginUser(username, passwordInput) {
    try {
      await loginService.loginUser(username, passwordInput);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}

