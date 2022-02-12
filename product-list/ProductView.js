export function buildProductView(product) {
  const currentTime = new Date(product.date).toLocaleString();
  const productDetailView = buildproductDetailView(product);
  let productTemplate = `
    <a href="/tweetDetail.html?id=${product.id}">
      ${productDetailView}
    </a>
  `;
  
  return productTemplate;
}

export function buildproductDetailView(product) {
  const currentTime = new Date(product.date).toLocaleString();

  let productTemplate = `
    <img src="${product.image}"></img>
    <p>Nombre del producto: ${product.name}</p>
    <p>Descripción del producto: ${product.description}</p>
    <p>Precio del producto: ${product.price}</p>
    <p>El producto está en compra o venta?: ${product.buySell}</p>
  `;
  return productTemplate;
}

export function buildProductListSpinnerView() {
  return `<div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`;
}

export function buildNotFoundProductsView() {
  return `
    <h1>Ooops!!! no hay ningún producto!!! =(</h1>
  `;
}
