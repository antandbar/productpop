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

export function buildBodyTableView() { 
  let bodyTableTemplate = 
  `
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Foto</th>
        <th scope="col">Nombre del producto</th>
        <th scope="col">Descripción del producto</th>
        <th scope="col">Precio</th>
        <th scope="col">Compra/Venta</th>
        <th scope="col">Detalle</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `
  return bodyTableTemplate;
}

export function buildBodyNavView() { 
  let bodyNavTemplate = 
  `
    <ul class="pagination">
      <li class="page-item page-previus" ><a class="page-link link-previus" href="#">Atrás</a></li>
      <li class="page-item page-one"><a class="page-link link-one" href="#">1</a></li>
      <li class="page-item page-two"><a class="page-link link-two" href="#">2</a></li>
      <li class="page-item page-three"><a class="page-link link-three" href="#">3</a></li>
      <li class="page-item page-Next"><a class="page-link link-next" href="#">Siguiente</a></li>
    </ul>
  `
  return bodyNavTemplate;
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
