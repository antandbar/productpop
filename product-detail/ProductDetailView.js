
export function buildproductDetailView(product) {
  let productTemplate = 
  `
    <h1>Detalle del producto</h1>
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${product.image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">El producto tiene un precio de ${product.price}€ y está en opción: ${product.buySell}</p>
      <p class="card-text"><span class="description">Descripción del producto:</span> ${product.description}</p>
    </div>
  </div>
  `;

  return productTemplate;
}