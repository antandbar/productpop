export function buildProductView(product) {    
  let productTemplate =
    `
            <th scope="row">${product.id}</th>
            <td><img src="${product.image}"></img></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}€</td>
            <td>${product.buySell}</td>
            <td><a href="/productDetail.html?id=${product.id}">Ver</a></td>      
  `;
  
  return productTemplate;
}

export function buildproductDetailView(product) {

  let productTemplate = `
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
export function buildNotFoundProductsView() {
  return `
      <h1>Ooops!!! no hay ningún producto!!! =(</h1>
  `;
  }
