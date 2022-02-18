class LoginService {
    constructor() {
    }

    // Hace login del usuario
    async loginUser(username, password) {
      const body = {
        username,
        password,
      };
      let loginResponse;
      let loginData;
  
      try {
        loginResponse = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch(error) {
        throw new Error("no he podido hacer el login");
      } 
  
      try {
      loginData = await loginResponse.json();
      } catch(error) {
        throw new Error("no he podido transformar la respuesta a json");
      }
  
      // Se evalua si la respuesta fue exitosa
      if (!loginResponse.ok) {
        throw new Error(loginData.message);
      }
  
      const token = loginData.accessToken;
  
      // Se guarda el token en el localStorage
      localStorage.setItem("jwt", token);
    }
  
    // Se devuel el token
      getLoggedUser() {
        return localStorage.getItem("jwt") || null;
      }
  }
  
  
  export const loginService = new LoginService();
  