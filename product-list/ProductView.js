export function buildProductView(product) {
  let theadTemplate = ""; 
    

  let productTemplate =
    `
            <th scope="row">${product.id}</th>
            <td><img src="${product.image}"></img></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.buySell}</td>
            <td><a href="/productDetail.html?id=${product.id}">Ver</a></td>      
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
