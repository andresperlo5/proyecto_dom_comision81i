const tBody = document.getElementById('tBody');
const products = JSON.parse(localStorage.getItem('products')) || []

const inputNomProd = document.getElementById('idNameProd')
const inputDescProd = document.getElementById('idDescProd')
const inputCatProd = document.getElementById('idCatProd')
const inputPreProd = document.getElementById('idPreProd')
const inputImgProd = document.getElementById('idImgProd')

const buttonCreate = document.getElementById('idButtonCreate')

if (products.length === 0) {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => localStorage.setItem('products', JSON.stringify(products)))
}


tBody.innerHTML = products.map((product) =>
  `
    <tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td product-id="${product.id}">${product.price}</td>

        <td>
        <button class="btn btn-danger" onclick="borrarProd(${product.id})">Eliminar</button>

        <!-- Button trigger modal -->
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal-${product.id}">
              Editar
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal-${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel-${product.id}" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel-${product.id}">Modificar Producto: ${product.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre</label>
                      <input type="text" class="form-control" id="inputNameProd" aria-describedby="emailHelp" value="${product.title}" name="nameProd">
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Precio</label>
                      <input type="number" class="form-control" id="inputPriceProd" value="${product.price}" name="priceProd">
                    </div>
                    
                    <button type="button" class="btn btn-primary" onclick="editarProducto(${product.id})">Guardar Cambios</button>
                </form>
                </div>
                
                </div>
            </div>
            </div>
        </td>
    </tr>
    `
).join('')


const inputNameProd = document.getElementById('inputNameProd')
const inputPriceProd = document.getElementById('inputPriceProd')

const dataForm = {
  nameProd: '',
  priceProd: ''
}


const formCreate = {
  nombreProd: '',
  descProd: '',
  catProd: '',
  preProd: '',
  imgProd: ''
}



const editarProducto = (idProd) => {
  const { nameProd, priceProd } = dataForm
  const filterProd = products.filter((prod) => prod.id === Number(idProd))
  const positionProd = products.findIndex((prod) => prod.id === Number(idProd))


  if (filterProd.length > 0) {
    filterProd[0].title = nameProd ? nameProd : filterProd[0].title
    filterProd[0].price = priceProd ? priceProd : filterProd[0].price
    products[positionProd] = filterProd[0]
    localStorage.setItem('products', JSON.stringify(products))
  }
}


const borrarProd = (idProd) => {
  const confirmDelete = confirm('Estas seguro de que quieres eliminar este producto?')

  if (confirmDelete) {
    const filterProd = products.filter((prod) => prod.id !== Number(idProd))
    localStorage.setItem('products', JSON.stringify(filterProd))
    location.reload()
  }
}

const changeValues = (ev) => {
  const { name, value } = ev.target
  dataForm[name] = value
}

const createProductForm = (ev) => {
  const { name, value } = ev.target
  formCreate[name] = value
}

const sendFormCreate = (ev) => {
  ev.preventDefault()
  const { nombreProd, descProd, preProd, catProd, imgProd } = formCreate

  if (!nombreProd && !descProd && !preProd && !catProd && !imgProd) {
    alert('el formulario esta vacio')
  } else {

    const newId = products[products.length -1].id + 1

    const newProduct = {
      id: newId,
      title: nombreProd,
      description: descProd,
      category: catProd,
      price: preProd,
      image: imgProd,

    }

    products.push(newProduct)
    localStorage.setItem('products', JSON.stringify(products))
    location.reload()
  }


}


inputNameProd.addEventListener('input', changeValues)
inputPriceProd.addEventListener('input', changeValues)

inputNomProd.addEventListener('input', createProductForm)
inputDescProd.addEventListener('input', createProductForm)
inputCatProd.addEventListener('input', createProductForm)
inputPreProd.addEventListener('input', createProductForm)
inputImgProd.addEventListener('input', createProductForm)

buttonCreate.addEventListener('click', sendFormCreate)