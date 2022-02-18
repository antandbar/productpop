export function decodeToken(token) {
  let decodedToken;

  try {
    // Se decodifica el token
    const stringifiedToken = atob(token.split(".")[1]);
    decodedToken = JSON.parse(stringifiedToken);
  } catch (error) {
    return null;
  }
  
  return decodedToken;
}
