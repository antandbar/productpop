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
  `;
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
  `;
  return bodyNavTemplate;
}

export function buildNotFoundProductsView() {
  return `
      <h1 class ="noProduct" >No hay productos guardados !!!</h1>
  `;
  }