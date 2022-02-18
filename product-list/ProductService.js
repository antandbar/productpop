export class ProductService {
  constructor(){
    this.productsResponse;
  }

  // Se devulven los producto paginados de 10 en 10
  async getProducts(pageCounts) {
    const url = `http://localhost:8000/api/products?_page=${pageCounts}`

    this.productsResponse;
    let products;

    try {
      this.productsResponse = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por los productos");
    }

     // Se evalua si la respuesta fue exitosa
    if (!this.productsResponse.ok) {
      throw new Error("Productos no encontrados");
    }
      
    try {
      products = await this.productsResponse.json();
    } catch (error) {
      throw new Error("no he podido transformar la respuesta a json");
    }

    return products;
  }

  getTotalCount() {

    if (!this.productsResponse.ok) {
      throw new Error("Productos no encontrados");
    }

    // Se devuelve el total de productos
    return this.productsResponse.headers.get('X-Total-Count');
  }
}

export const productService = new ProductService();
