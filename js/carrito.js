const tBody = document.getElementById('tBody');
const carritoLocalSt = JSON.parse(localStorage.getItem('carrito')) || [];

tBody.innerHTML = carritoLocalSt.map((product) => 
`
<tr>
  <th scope="row">${product.id}</th>
    <td>${product.title}</td>
    <td product-id="${product.id}">${product.price}</td>
    <td>
     <input type="number" class="form-control w-25" value="1" id="${product.id}" name="count">
    </td>
    <td class="total" data-product-id="${product.id}">
      ${product.price}
    </td>
    <td>
      <button class="btn btn-danger" onclick="borrarProd(${product.id})">Eliminar</button>
    </td>
</tr>
`
);

const borrarProd = (id) => {
    const confirmDelete = confirm('Estas seguro de que quiere eliminar a este producto?')

    if(confirmDelete){
        const resDelete = carritoLocalSt.filter((prod) => prod.id !== id)
        localStorage.setItem('carrito', JSON.stringify(resDelete))
        location.reload()
    }
}

const inputsCarrito = document.querySelectorAll('input')

const changeValue = (ev) => {

    const {id, value} = ev.target
    const precio = parseFloat(document.querySelector(`[product-id="${id}"]`).textContent)
    const totalId = document.querySelector(`[data-product-id="${id}"]`)

    const total = value * precio
    totalId.innerHTML = total.toFixed(2)
}

inputsCarrito.forEach((input) => {
    input.addEventListener('input', changeValue)
})





