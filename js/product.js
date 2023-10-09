const idProd = location.search.split('=')[1]
const cardProd = document.getElementById('cardProduct')
const products = JSON.parse(localStorage.getItem('products')) || []
const favorites = JSON.parse(localStorage.getItem('favorites')) || []

const filterProd = products.filter((prod) => prod.id === Number(idProd))

cardProd.innerHTML = filterProd.map((product) =>
    `
<div class="d-flex mt-5">
    <div class="w-50 mx-5">
      <img src="${product.image}" class="card-img-top" alt="...">
    </div>
    <div>
      <h5>${product.title}</h5>
      <p>${product.description}</p>
      <button class="btn btn-primary" onclick="validationUser(${product.id})">Añadir Carrito</button>
      <button class="btn btn-success" onclick="addFavorite(${product.id})">Añadir Favoritos</button>
    </div>
</div>
`
)

const validationUser = async (id) => {
    const userExist = JSON.parse(localStorage.getItem('user'))
    const carritoLs = JSON.parse(localStorage.getItem('carrito')) || []

    if (!userExist) {
        location.href = '../html/login.html'
    } else {
        if (carritoLs.length > 0) {
            
            const productFilter = carritoLs.filter((prod) => prod.id === id)
            
            if (productFilter.length > 0) {
                alert('El producto ya existe en el carrito')
            } else {

                const productFilter = products.filter((prod) => prod.id === id)
                carritoLs.push(productFilter[0])

                localStorage.setItem('carrito', JSON.stringify(carritoLs))
            }

        } else {
            const productFilter = products.filter((prod) => prod.id === id)
            carritoLs.push(productFilter[0])

            localStorage.setItem('carrito', JSON.stringify(carritoLs))
        }
    }
}

const addFavorite = (id) => {
    const productFilter = products.filter((prod) => prod.id === id)
  
    if (favorites.length > 0) {
      const favFilter = favorites.filter((fav) => fav.id === id)
      favFilter.length > 0
        ?
        alert('El producto ya existe en favoritos')
        :
        favorites.push(productFilter[0])
      localStorage.setItem('favorites', JSON.stringify(favorites))
    } else {
      favorites.push(productFilter[0])
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }



