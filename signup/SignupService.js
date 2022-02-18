class SignupService {
  constructor() {
  }

  // Crea un nuevo usuario
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

     // Se evalua si la respuesta fue exitosa
    if (!registerResponse.ok) {
      throw new Error(registerData.message);
    }
  }
}


export const signupService = new SignupService();
