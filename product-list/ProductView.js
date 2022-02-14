export function buildProductView(product) {
  const productDetailView = buildproductDetailView(product);
  let productTemplate = `
    <a href="/productDetail.html?id=${product.id}">
      ${productDetailView}
    </a>
  `;
  
  return productTemplate;
}

export function buildproductDetailView(product) {

  let productTemplate = `
    <img src="${product.image}"></img>
    <p>Nombre del producto: ${product.name}</p>
    <p>Descripción del producto: ${product.description}</p>
    <p>Precio del producto: ${product.price}</p>
    <p>El producto está en compra o venta?: ${product.buySell}</p>
  `;
  return productTemplate;
}
export function buildNotFoundProductsView() {
  return `
      <h1>Ooops!!! no hay ningún producto!!! =(</h1>
  `;
  }
