class SignupService {
  constructor() {
  }

  async createUser(username, password) {
    const body = {
      username,
      password,
    };
    let registerResponse;
    let registerData

    try {
      registerResponse = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
  }catch(error) {
    throw new Error("no he podido hacer el registro");
  }

  try{
    registerData = await registerResponse.json();
  } catch(error) {
    throw new Error("no he podido transformar la respuesta a json");
  }

    if (!registerResponse.ok) {
      throw new Error(registerData.message);
    }
  }

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

    if (!loginResponse.ok) {
      throw new Error(loginData.message);
    }

    const token = loginData.accessToken;

    localStorage.setItem("jwt", token);
  }

  getLoggedUser() {
    return localStorage.getItem("jwt") || null;
  }
}


export const signupService = new SignupService();
